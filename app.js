import http from 'http';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';

const hostname = 'localhost';
const PORT = 1337;

const MIME_TYPES = {
    default: 'application/octet-stream',
    html: 'text/html; charset=UTF-8',
    js: 'application/javascript',
    css: 'text/css',
    png: 'image/png',
    jpg: 'image/jpg',
    gif: 'image/gif',
    ico: 'image/x-icon',
    svg: 'image/svg+xml',
};

const STATIC_PATH = path.join(process.cwd(), './public');

const toBool = [() => true, () => false];

const prepareFile = async (url) => {
    try {
        const paths = [STATIC_PATH, url];
        if (url.endsWith('/')) paths.push('home.html');

        let filePath = path.join(...paths);
        const pathTraversal = !filePath.startsWith(STATIC_PATH);

        if (filePath.endsWith('about')) filePath += '.html';
        if (filePath.endsWith('html'))
            filePath = filePath.replace('public', 'views');

        const exists = await fs.promises.access(filePath).then(...toBool);
        const found = !pathTraversal && exists;
        const streamPath = found ? filePath : STATIC_PATH + '/404.html';
        const ext = path.extname(streamPath).substring(1).toLocaleLowerCase();
        const stream = fs.createReadStream(streamPath);
        return { found, ext, stream };
    } catch (error) {
        console.log(error);
    }
};

const server = http.createServer(async (req, res) => {
    try {
        const { method, url, headers } = req;
        const userAgent = headers['user-agent'];

        const file = await prepareFile(url);
        const statusCode = file.found ? 200 : 404;
        const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
        res.writeHead(statusCode, { 'Content-Type': mimeType });

        file.stream.pipe(res).catch;
    } catch (error) {
        console.log(error.stack);
    }
});

server.listen(PORT, hostname, (error) => {
    if (error)
        console.log(
            chalk.bgRed.bold('ERROR:') +
                chalk.yellow.bold(`We hit a snag 😱: ${error}`)
        );
    else {
        console.log(
            chalk.cyan('*\n**\n***\n****\n') +
                chalk.bgGreen.bold('\n📣 Server Notice:') +
                chalk.cyan(` ${hostname}:${PORT} `) +
                chalk.green(`is online! 🥳`)
        );
    }
});
