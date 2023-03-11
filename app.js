import http from "http";
import chalk from "chalk";
import path from 'path';

import {logger, logReport} from "./logger/index.js";

import {home, about} from './views/index.js'


const hostname = "localhost";
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
}


const STATIC_PATH = path.join(process.cwd(), './public')


const server = http.createServer(async (req, res) => {
  const { method, url, headers } = req;
  const userAgent = headers["user-agent"];
  req.on('error', logReport)
  res.on('error', logReport)

  res.writeHead(200, { "Content-Type": "text/html" });
  switch (url) {
    case "/":
      if (method === "POST") req.pipe(res);
      else res.end(home());
      break;
    default:
        res.statusCode = 404;
        logger.info(`404 error`)
        res.end(`404 Page not Found`);
  }
});

server.listen(PORT, hostname, (error) => {
    if (error) console.log(
        chalk.bgRed.bold('ERROR:') +
        chalk.yellow.bold(`We hit a snag 😱: ${error}`)
    )
    else {
        console.log(
            chalk.cyan("*\n**\n***\n****\n") +
              chalk.bgGreen.bold("\n📣 Server Notice:") +
              chalk.cyan(` ${hostname}:${PORT} `) +
              chalk.green(`is online! 🥳`)
          );
    }

});
