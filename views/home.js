export default () => { 
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="stylesheet" type="text/css" href="./stylesheets/style.css" />
        <link
          rel="icon"
          type="image/x-icon"
          href="images/favicon/idleUO-favicon.png"
        />
        <title>Idle UO</title>
      </head>
    
      <body>
        <header class="stone">
          <p>
            <strong>Idle UO</strong>™ ©
            <a href="https://www.linkedin.com/in/holdenlindblom/" target="_blank"
              >Holden</a
            >, 2022
          </p>
        </header>
        <main>
          <section class="column" id="column-left">
            <div id="modal">
              <input id="name-input" class="bw-text" type="text" minlength="1" maxlength="12" size="12" value="Balthasar">
              <div id="okay-cancel">
                <img id="cancel" src="images/buttons/cancel.png" alt="">
                <img id="okay" src="images/buttons/okay.png" alt="">
              </div>
            </div>
           
            <div id="character-panel">
              <img id="player-window" src="images/character/character-panel.png" alt="">
              <img class="player" id="player-hair"src="images/character/male/hair/Long/hair-long-male-brown.png" alt="">
              <img class="player" id="player-clothes" src="images/character/male/clothes/starting-clothes-male.png" alt="">
              <img class="player" id="player-weapon" src="images/character/weapons/blunt/weapon-club.png" alt="">
              <img class="player" id="player-doll" src="images/character/male/male-light.png" alt="">
              <p class="bw-text" id="player-name">Balthasar</p>
            </div>
            <img src="images/weapons/clubs/1club.png" id="weapon_icon" />
            
    
            <div class="bw-text" id="player-info">
              <div id="health-mana">
                <div class="status-bar">
                  <p>H:</p>
                  <div id="health-bar">
                    <img src="images/character/info/bars/health-bar.png" alt="">
                  </div>
                  <img id="health-base" src="images/character/info/bars/health-bar-base.png" alt="">
                </div>
                <div class="status-bar">
                  <p>M:</p>
                  <div id="mana-bar">
                    <img  src="images/character/info/bars/mana-bar.png" alt="">
                  </div>
                  <img id="mana-base" src="images/character/info/bars/mana-bar-base.png" alt="">
                </div>
              </div>
              <div id="level-xp">
                <div><p>L: <span id="curr-level">1</span></p></div>
                <div id="xp-xps">
                  <p>X: <span id="xp_counter">0</span></p>
                  <p><span id="xp_ps-container">0</span> xp/sec</p>
                </div>
              </div>
              <img id="info-plate" src="images/character/info/player-info.png" alt="">
            </div>
    
          </section>
          <div class="column-divider"  id="left-divider"></div>
          <section class="column" id="column-middle">
            <div id="middleTop">
              <div class="panel-menu" id="panel-left">
                <img class="menu-img" id= "menu-img-left" src="images/textures/menu-left.png" alt="">
                <img class="menu-button" src="images/buttons/options.png" id="options" alt="">
              </div>
              <div class="wb-text" id="panel-middle">
                Notifications
              </div>
              <div class="panel-menu" id="panel-right">
                <img class="menu-img" src="images/textures/menu-right.png" alt="">
                <img class="menu-button" src="images/buttons/journal.png" id="journal" alt="">
              </div>
            </div>
            <div class="row-divider" id ="menu-divider"></div>
            <div id="battle-section">
              <div class="producer-progress" id="chemex"></div>
    
            </div>
          </section>
          <div class="column-divider" id="right-divider"></div>
          <section class="column" id="column-right">
            <div class="upgrades"></div>
            <select id="fight-retreat">
              <option value="Fight">Fight</option>
              <option value="Retreat">Retreat</option>
            </select>
    
            <div id="producer_container">
    
            </div>
          </section>
        </main>
        <footer class="stone">
          <p>
            images, all rights reserved:<a href="https://www.freepik.com/">
              freepik</a
            >
          </p>
        </footer>
        <script type="text/javascript" src="data.js"></script>
        <script type="text/javascript" src="script.js"></script>
      </body>
    </html>
    `}
