const http = require("http");
const winston = require("winston");
const requestIp = require("request-ip");
const faker = require("faker");
const uuid = require("uuid");
const url = require("url");
const fs = require("fs");

// Define host and port
const hostname = process.env.HOST || "0.0.0.0";
const port = 8001;

let currentTimeInMs = Date.now();

// Create basic Logging object and define format

let buildIpArray = () => {
  const arrayLength = 50;
  let randomLengthIpArray = new Array(arrayLength);

  for (i = 0; i < arrayLength; i++) {
    randomLengthIpArray[i] = faker.internet.ip();
  }

  return randomLengthIpArray;
};

let buildIpArray20 = () => {
  const arrayLength = 27;
  let randomLengthIpArray = new Array(arrayLength);

  for (i = 0; i < arrayLength; i++) {
    randomLengthIpArray[i] = faker.internet.ip();
  }

  return randomLengthIpArray;
};

const buildRandomLoggingObject0 = (_messageNumber, _uuid) => {
  return {
    logNumber: _messageNumber,
  };
};

const buildRandomLoggingObject2 = (_messageNumber, _uuid) => {
  return {
    requestUuid: _uuid,
    logNumber: _messageNumber,
    firstName: "Greg",
    lastName: "Heller",
    path: "/Users/mission_critical_pizza_global.uoml.cxx",
    productDescription:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    address: "Suite 225",
    databaseColumn: "avatar",
    array: [
      24342,
      47553,
      "DHSH@dY#T5",
      22672,
      52468,
      22153,
      '!/4"\'"V_bk',
      84285,
      "6wWcCY2Pk1",
      "KG=B22jTyA",
    ],
    commitMessage:
      "commit 583cc896759268c18a73df3e6ee475bd3fc55eb0\r\nAuthor: Jackeline Homenick <Wilburn_Bartoletti@hotmail.com>\r\nDate: Sun Jul 11 2021 12:42:35 GMT+0200 (GMT+02:00)\r\n\r\n    copy wireless bus\r\n",
    commitEntry:
      "commit bc7fd39425e1e06ec46ab0df69ad31ba5230d99d\r\nMerge: 3cd86cf 68fb07a\r\nAuthor: Lauren Reichert <Delfina_Turner45@yahoo.com>\r\nDate: Sat Jul 10 2021 19:05:24 GMT+0200 (GMT+02:00)\r\n\r\n    parse neural monitor\r\n",
    btcAddress: "3zKP1aBNhUfPNmBdZgWj6WUV9Tie9wsW",
    ltcAddress: "MHoJCkG68aPAjANnkAXNEXJ1uPGvires",
    ipAdresses: [
      "41.183.200.23",
      "137.22.112.161",
      "122.100.154.18",
      "55.28.24.1",
      "178.226.181.105",
      "209.225.89.206",
      "252.138.38.195",
      "172.245.236.70",
      "241.217.104.220",
      "38.35.111.28",
      "164.74.93.97",
      "173.169.27.127",
      "233.79.97.85",
      "155.9.45.78",
      "84.185.171.128",
      "94.224.185.119",
      "196.89.112.55",
      "187.154.226.32",
      "105.73.181.73",
      "241.153.32.249",
      "163.245.48.125",
      "29.136.223.25",
      "124.27.24.207",
      "57.249.223.104",
      "117.185.237.83",
      "196.80.243.76",
      "31.67.224.13",
      "242.74.8.27",
      "204.103.191.175",
      "190.8.190.215",
      "96.162.176.29",
      "52.96.147.190",
      "13.79.176.125",
      "108.204.115.51",
      "140.253.168.54",
      "93.13.88.46",
      "116.113.106.243",
      "70.95.35.34",
      "137.242.58.211",
      "158.113.226.21",
      "128.217.22.29",
      "222.239.67.136",
      "68.189.150.159",
      "71.148.239.228",
      "229.156.77.121",
      "120.191.27.76",
      "42.121.30.104",
    ],
    uuid: "94b3adbc-3813-4664-936a-853907d52b30",
  };
};

const buildRandomLoggingObject90 = (_messageNumber, _uuid) => {
  return {
    requestUuid: _uuid,
    logNumber: _messageNumber,
    firstName: "Greg",
    lastName: "Heller",
    path: "/Users/mission_critical_pizza_global.uoml.cxx",
    productDescription:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    address: "Suite 225",
    databaseColumn: "avatar",
    array: faker.datatype.array(),
    commitMessage:
      "commit 583cc896759268c18a73df3e6ee475bd3fc55eb0\r\nAuthor: Jackeline Homenick <Wilburn_Bartoletti@hotmail.com>\r\nDate: Sun Jul 11 2021 12:42:35 GMT+0200 (GMT+02:00)\r\n\r\n    copy wireless bus\r\n",
    commitEntry:
      "commit bc7fd39425e1e06ec46ab0df69ad31ba5230d99d\r\nMerge: 3cd86cf 68fb07a\r\nAuthor: Lauren Reichert <Delfina_Turner45@yahoo.com>\r\nDate: Sat Jul 10 2021 19:05:24 GMT+0200 (GMT+02:00)\r\n\r\n    parse neural monitor\r\n",
    btcAddress: "3zKP1aBNhUfPNmBdZgWj6WUV9Tie9wsW",
    ltcAddress: "MHoJCkG68aPAjANnkAXNEXJ1uPGvires",
    ipAdresses: [
      "41.183.200.23",
      "137.22.112.161",
      "122.100.154.18",
      "55.28.24.1",
      "178.226.181.105",
      "209.225.89.206",
      "252.138.38.195",
      "172.245.236.70",
      "241.217.104.220",
      "38.35.111.28",
      "164.74.93.97",
      "173.169.27.127",
      "233.79.97.85",
      "155.9.45.78",
      "84.185.171.128",
      "94.224.185.119",
      "196.89.112.55",
      "187.154.226.32",
      "105.73.181.73",
      "241.153.32.249",
      "163.245.48.125",
      "29.136.223.25",
      "124.27.24.207",
      "57.249.223.104",
      "117.185.237.83",
      "196.80.243.76",
      "31.67.224.13",
      "242.74.8.27",
      "204.103.191.175",
      "190.8.190.215",
      "96.162.176.29",
      "52.96.147.190",
      "13.79.176.125",
      "108.204.115.51",
      "140.253.168.54",
      "93.13.88.46",
      "116.113.106.243",
      "70.95.35.34",
      "137.242.58.211",
      "158.113.226.21",
      "128.217.22.29",
      "222.239.67.136",
      "68.189.150.159",
      "71.148.239.228",
      "229.156.77.121",
      "120.191.27.76",
      "42.121.30.104",
    ],
    uuid: "94b3adbc-3813-4664-936a-853907d52b30",
  };
};

const buildRandomLoggingObject350 = (_messageNumber, _uuid) => {
  return {
    requestUuid: _uuid,
    logNumber: _messageNumber,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    path: faker.system.filePath(),
    productDescription: faker.commerce.productDescription(),
    address: faker.address.secondaryAddress(),
    databaseColumn: faker.database.column(),
    array: faker.datatype.array(),
    commitMessage: faker.git.commitEntry(),
    commitEntry:
      "commit bc7fd39425e1e06ec46ab0df69ad31ba5230d99d\r\nMerge: 3cd86cf 68fb07a\r\nAuthor: Lauren Reichert <Delfina_Turner45@yahoo.com>\r\nDate: Sat Jul 10 2021 19:05:24 GMT+0200 (GMT+02:00)\r\n\r\n    parse neural monitor\r\n",
    btcAddress: "3aviWPe4NV15K3q7iCzHQowbUMXXtQ",
    ltcAddress: "3NbRXwvxbx8v3XKh1jjE79WTk6",
    ipAdresses: [
      "191.134.224.82",
      "239.167.181.239",
      "90.176.234.45",
      "245.47.35.102",
      "173.207.179.142",
      "10.88.108.228",
      "144.200.10.46",
      "120.30.49.29",
      "184.251.122.226",
      "92.111.189.11",
      "55.187.229.164",
      "31.77.174.29",
      "188.179.102.63",
      "74.178.5.232",
      "120.36.131.243",
      "138.227.144.235",
      "58.156.62.235",
      "74.83.29.203",
      "59.184.241.224",
      "222.104.208.83",
      "204.177.10.8",
      "110.212.225.60",
      "88.64.188.51",
      "152.95.249.24",
      "210.250.38.121",
      "167.133.53.213",
      "101.219.234.43",
      "86.169.222.203",
      "159.14.158.227",
      "103.55.51.115",
      "198.106.100.9",
      "244.116.253.193",
      "132.0.164.8",
      "236.46.22.24",
      "6.13.155.166",
      "217.20.41.114",
      "134.82.37.153",
      "124.251.198.53",
      "232.94.211.87",
      "190.29.125.91",
      "221.151.51.205",
      "95.166.244.109",
      "96.111.41.155",
      "209.61.97.44",
      "178.136.116.107",
      "49.156.1.189",
      "12.155.245.112",
      "100.104.117.196",
    ],
    uuid: uuid.v4(),
  };
};

const buildRandomLoggingObject690 = (_messageNumber, _uuid) => {
  return {
    requestUuid: _uuid,
    logNumber: _messageNumber,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    path: "/usr/libexec/music_malawi_buckinghamshire.chrt.plf",
    productDescription: faker.commerce.productDescription(),
    address: faker.address.secondaryAddress(),
    databaseColumn: faker.database.column(),
    array: faker.datatype.array(),
    commitMessage: faker.git.commitEntry(),
    commitEntry: faker.git.commitEntry(),
    btcAddress: "3zKP1aBNhUfPNmBdZgWj6WUV9Tie9wsW",
    ltcAddress: "MHoJCkG68aPAjANnkAXNEXJ1uPGvires",
    ipAdresses: buildIpArray20(),
    ipAdressesTwo: [
      "134.95.128.165",
      "149.2.190.186",
      "134.167.68.26",
      "59.102.232.142",
      "233.236.227.35",
      "2.238.171.255",
      "213.0.164.164",
      "206.8.162.158",
      "225.48.182.211",
      "74.164.247.163",
      "137.202.18.86",
      "89.255.20.255",
      "60.114.124.1",
      "166.54.218.96",
      "109.199.196.76",
      "158.162.90.89",
      "99.167.79.182",
      "118.154.223.91",
      "175.230.175.228",
      "133.108.114.64",
      "219.4.141.187",
    ],
    uuid: uuid.v4(),
  };
};

const buildRandomLoggingObject980 = (_messageNumber, _uuid) => {
  return {
    requestUuid: _uuid,
    logNumber: _messageNumber,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    path: faker.system.filePath(),
    productDescription: faker.commerce.productDescription(),
    address: faker.address.secondaryAddress(),
    databaseColumn: faker.database.column(),
    array: faker.datatype.array(),
    commitMessage: faker.git.commitEntry(),
    commitEntry: faker.git.commitEntry(),
    btcAddress: faker.finance.bitcoinAddress(),
    ltcAddress: faker.finance.litecoinAddress(),
    ipAdresses: buildIpArray(),
    uuid: uuid.v4(),
  };
};

// Fire as much logs as specified in the request parameter (k)
let fireLogs = (_number, _lvd, _uuid) => {
  currentTimeInMs = Date.now();

  const logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp({ format: "isoDateTime" }),
      winston.format.json()
      //winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
    ),
    transports: [
      //new winston.transports.Console()
      new winston.transports.File({
        filename:
          "/Volumes/Samsung_2/Bachelor/LVD980/neu_200000/generated_" +
          currentTimeInMs +
          ".log",
        level: "info",
      }),
    ],
  });

  if (_lvd === "980") {
    console.log("Starting generating logs - " + Date.now());
    for (k = 0; k < _number; k++) {
      logger.info(buildRandomLoggingObject980(k, _uuid));
      if (k % 10000 === 0) {
        console.log("Generated " + k + " log messages...");
      }
    }
    console.log(" ");
    console.log("logs generated - " + Date.now());
  } else if (_lvd === "690") {
    console.log("Starting generating logs - " + Date.now());
    for (k = 0; k < _number; k++) {
      logger.info(buildRandomLoggingObject690(k, _uuid));
      if (k % 10000 === 0) {
        console.log("Generated " + k + " log messages...");
      }
    }
    console.log(" ");
    console.log("logs generated - " + Date.now());
  } else if (_lvd === "350") {
    console.log("Starting generating logs - " + Date.now());
    for (k = 0; k < _number; k++) {
      logger.info(buildRandomLoggingObject350(k, _uuid));
      if (k % 10000 === 0) {
        console.log("Generated " + k + " log messages...");
      }
    }
    console.log(" ");
    console.log("logs generated - " + Date.now());
  } else if (_lvd === "90") {
    console.log("Starting generating logs - " + Date.now());
    for (k = 0; k < _number; k++) {
      logger.info(buildRandomLoggingObject90(k, _uuid));
      if (k % 10000 === 0) {
        console.log("Generated " + k + " log messages...");
      }
    }
    console.log(" ");
    console.log("logs generated - " + Date.now());
  } else if (_lvd === "2") {
    console.log("Starting generating logs - " + Date.now());
    for (k = 0; k < _number; k++) {
      logger.info(buildRandomLoggingObject2(k, _uuid));
      if (k % 10000 === 0) {
        console.log("Generated " + k + " log messages...");
      }
    }
    console.log(" ");
    console.log("logs generated - " + Date.now());
  } else if (_lvd === "0") {
    console.log("Starting generating logs - " + Date.now());
    for (k = 0; k < _number; k++) {
      logger.info(buildRandomLoggingObject0(k, _uuid));
      if (k % 10000 === 0) {
        console.log("Generated " + k + " log messages...");
      }
    }
    console.log(" ");
    console.log("logs generated - " + Date.now());
  } else {
    console.log("Error! Can't ready lvd query content.");
  }
};

// Basic create and run server
const server = http.createServer((req, res) => {
  //const clientIp = requestIp.getClientIp(req);
  const requestUuid = uuid.v4();

  let parsedURL = url.parse(req.url, true);

  const numberOfLogs = parseInt(parsedURL.query.number, 10);
  const lvd = parsedURL.query.lvd;

  console.log("Server generating file with " + numberOfLogs + " log messages");
  console.log(" ");

  fireLogs(numberOfLogs, lvd, requestUuid);

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World - v0.2");
});

// Make server listen
server.listen(port, hostname, () => {
  console.log("Server listening on port 8001!");
});
