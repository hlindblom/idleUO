/* eslint-disable no-alert */

/**************
 *   Clicking & Updating
 **************/

function updateXPView(xp) {
    const xpCounter = document.querySelector('#xp_counter');
    xpCounter.innerText = xp;
}

function clickWeapon(data) {
    updateXPView(++data.totalXP);
    // renderProducers(data);
}

/**************
 *   SLICE 2
 **************/

function unlockProducers(producers, coffeeCount) {
    producers.forEach((prod) => {
        if (coffeeCount >= prod.price / 2) prod.unlocked = true;
    });
}

function getUnlockedProducers(data) {
    return data.producers.filter((prod) => prod.unlocked);
}
function getActiveProducers(data) {
    return data.producers.filter((prod) => prod.qty > 0);
}

function makeDisplayNameFromId(id) {
    return id
        .toLowerCase()
        .split('_')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(' ');
}

function makeProducerDiv(producer, data) {
    const containerDiv = document.createElement('div');
    containerDiv.className = 'producer';
    const displayName = makeDisplayNameFromId(producer.id);
    let currentCost = producer.price;
    if (data.buySell === 'Sell') currentCost = Math.floor(currentCost * 0.2);

    const html = `
  <div class="producer-column">
    <div class="producer-title">${displayName}</div>
    <button type="button" id="buy_${producer.id}">${data.buySell}</button>
  </div>
  <div class="producer-column">
    <div>Quantity: ${producer.qty}</div>
    <div>Coffee/second: ${producer.cps}</div>
    <div class="greenText">Cost: ${currentCost} coffee</div>
  </div>
  `;
    containerDiv.innerHTML = html;
    return containerDiv;
}

function makeProducerProgress(producer) {
    const containerImg = document.createElement('img');
    containerImg.className = 'producerImg';
    containerImg.src = `images/producers/${producer}.png`;
    return containerImg;
}

function deleteAllChildNodes(parent) {
    while (parent.hasChildNodes()) parent.removeChild(parent.firstChild);
}

function renderProducers(data) {
    const prodContainer = document.querySelector('#producer_container');
    unlockProducers(data.producers, data.coffee);
    const unlockedProducers = getUnlockedProducers(data);
    deleteAllChildNodes(prodContainer);
    unlockedProducers.forEach((prod) => {
        prodContainer.append(makeProducerDiv(prod, data));
    });
}

function producerNumberCount(qty) {
    const counterDiv = document.createElement('div');
    counterDiv.className = 'prod-counter';
    counterDiv.innerHTML = `<h3>${qty}</h3>`;
    return counterDiv;
}

function renderProducersProgress(data) {
    const prodProgressContainer =
        document.querySelectorAll('.producer-progress');
    const activeProducers = getActiveProducers(data);
    activeProducers.forEach((prod) => {
        const prodIdContainer = document.querySelector(`#${prod.id}`);

        try {
            deleteAllChildNodes(prodIdContainer);
            if (prod.qty < 13) {
                for (let i = prod.qty; i > 0; i--) {
                    prodIdContainer.append(makeProducerProgress(prod.id));
                }
            } else {
                prodIdContainer.append(makeProducerProgress(prod.id));
                prodIdContainer.append(producerNumberCount(prod.qty));
            }
        } catch (err) {
            // console.log('in progress')
        }
    });
}

/**************
 *   SLICE 3
 **************/

function getProducerById(data, producerId) {
    return data.producers.filter((prod) => prod.id === producerId)[0];
}

function canAffordProducer(data, producerId) {
    return data.coffee >= getProducerById(data, producerId).price;
}
function canSellProducer(data, producerId) {
    return getProducerById(data, producerId).qty > 0;
}

function updateCPSView(cps) {
    const cpsSpan = document.querySelector('#cps');
    cpsSpan.innerText = cps;
}

function updatePrice(producer) {
    return Math.floor(producer.basePrice * Math.pow(1.25, producer.qty));
}

function attemptToBuyProducer(data, producerId) {
    if (canAffordProducer(data, producerId)) {
        const producer = getProducerById(data, producerId);
        producer.qty++;
        data.coffee -= producer.price;
        producer.price = updatePrice(producer);
        updateCPSView((data.totalCPS += producer.cps));
        return true;
    } else return false;
}

function attemptToSellProducer(data, producerId) {
    if (canSellProducer(data, producerId)) {
        const producer = getProducerById(data, producerId);
        producer.qty--;
        data.coffee += Math.floor(producer.price * 0.2);
        producer.price = updatePrice(producer);
        updateCPSView((data.totalCPS -= producer.cps));
        return true;
    } else return false;
}

function buyButtonHelper(event, data) {
    if (attemptToBuyProducer(data, event.target.id.slice(4))) {
        renderProducers(data);
        updateXPView(data.xp);
    } else window.alert('Not enough coffee!');
}

function sellButtonHelper(event, data) {
    if (attemptToSellProducer(data, event.target.id.slice(4))) {
        renderProducers(data);
        updateXPView(data.xp);
    } else window.alert('Not enough coffee!');
}

function buyButtonClick(event, data) {
    if (event.target.tagName === 'BUTTON') {
        if (data.fightRetreat === 'Fight') buyButtonHelper(event, data);
        else sellButtonHelper(event, data);
    }
}

function tick(data) {
    // data.coffee += data.totalCPS;
    updateXPView(data.totalXP);
    // renderProducers(data);
    // renderProducersProgress(data);
    // if (typeof process === "undefined") {
    //   updateLocalStorage(data);
    //   const titleTag = document.querySelector("title");
    //   titleTag.innerText = `${data.coffee} - UO`;
    // }
}

function updateLocalStorage(data) {
    localStorage.setItem('savedGame', JSON.stringify(data));
}

/*************************
 *  Start your engines!
 *************************/

if (typeof process === 'undefined') {
    // Get starting data from the window object

    let data = window.data;
    const fightRetreat = document.querySelector('#fight-retreat');
    const panelButtons = document.querySelector('#middleTop');

    const weaponIcon = document.getElementById('weapon_icon');
    weaponIcon.addEventListener('click', () => {
        clickWeapon(data);
    });

    // Add an event listener to the container that holds all of the producers
    // Pass in the browser event and our data object to the event listener
    const producerContainer = document.getElementById('producer_container');
    producerContainer.addEventListener('click', (event) => {
        buyButtonClick(event, data);
    });

    panelButtons.addEventListener('click', (eventType) => {
        console.log(eventType.target);
    });

    // Call the tick function passing in the data object once per second
    setInterval(() => tick(data), 1000);

    const nameChange = document.querySelector('#player-name');
    const okayOrCancel = document.querySelector('#okay-cancel');
    const modal = document.querySelector('#modal');
    nameChange.addEventListener('click', () => {
        modal.style.display = 'block';
        modal.style.transition = 'display 5s';
    });

    okayOrCancel.addEventListener('click', (eventType) => {
        if (eventType.target.id === 'okay') {
            const newName = document.querySelector('#name-input');
            if (newName.value.length >= 1) {
                data.playerName = newName.value;
                nameChange.textContent = newName.value;
            }
        }
        modal.style.display = 'none';
    });

    fightRetreat.addEventListener('change', (event) => {
        data.fightRetreat = event.target.value;
        tick(data);
    });

    // if (localStorage.savedGame === undefined) updateLocalStorage(data);
    // else {
    //   tick((data = JSON.parse(localStorage.savedGame)));
    //   if (data.buySell === "Sell") buySell.value = "Sell";
    // }
}

// Meanwhile, if not in a browser and are instead in node
else if (process) {
    module.exports = {
        updateXPView,
        clickWeapon,
        unlockProducers,
        getUnlockedProducers,
        makeDisplayNameFromId,
        makeProducerDiv,
        deleteAllChildNodes,
        renderProducers,
        updateCPSView,
        getProducerById,
        canAffordProducer,
        updatePrice,
        attemptToBuyProducer,
        buyButtonClick,
        tick,
    };
}
