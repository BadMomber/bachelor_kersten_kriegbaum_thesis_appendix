docker build -t nodejs-json-logger .
docker tag nodejs-json-logger badmomber/nodejs-json-logger:latest
docker push badmomber/nodejs-json-logger:latest
docker tag nodejs-json-logger badmomber/nodejs-json-logger:latest
