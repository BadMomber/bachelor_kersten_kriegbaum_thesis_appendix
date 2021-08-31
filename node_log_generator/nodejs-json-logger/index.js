const http = require("http");
const winston = require("winston");
const requestIp = require("request-ip");
const faker = require("faker");
const uuid = require("uuid");
const url = require("url");

// Define host and port
const hostname = process.env.HOST || "0.0.0.0";
const port = 8001;

// Create basic Logging object and define format
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "isoDateTime" }),
    winston.format.json()
    //winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "generated" + Date.now() + ".log",
      level: "info",
    }),
  ],
});

// Generate random number between 1 and 10 for later use as array length
let generateRandomNumber = () => {
  return Math.floor(Math.random() * 10) + 1;
};

// Build array of random length with fake IP adresses
let buildRandomLengthIpArray = () => {
  const arrayLength = generateRandomNumber();
  let randomLengthIpArray = new Array(arrayLength);

  for (i = 0; i < arrayLength; i++) {
    randomLengthIpArray[i] = faker.internet.ip();
  }

  return randomLengthIpArray;
};

// Build a random Logging Object
const buildRandomLoggingObject = (_messageNumber, _uuid) => {
  return {
    requestUuid: _uuid,
    logNumber: _messageNumber,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    path: faker.system.filePath(),
    ipAdresses: buildRandomLengthIpArray(),
    uuid: uuid.v4(),
  };
};

// Fire as much logs as specified in the request parameter (k)
let fireLogs = (number, _uuid) => {
  for (k = 0; k < number; k++) {
    logger.info(buildRandomLoggingObject(k, _uuid));
  }
};

// Basic create and run server
const server = http.createServer((req, res) => {
  //const clientIp = requestIp.getClientIp(req);
  const requestUuid = uuid.v4();

  let parsedURL = url.parse(req.url, true);
  console.log(parsedURL.query);

  fireLogs(parseInt(parsedURL.query.number, 10), requestUuid);

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World - v0.2");
});

// Make server listen
server.listen(port, hostname, () => {
  logger.info("Server listening on port 8001!");
});
