# Docker QA Automation Demo

This repo is intended to demonstrate power of using portable docker-based automation setup. 

Execute 'sh run.sh' to run the example. When the scipt is triggered the following will happen:
- express.js app will start along with mongo db in separate containers (https://github.com/10101010/node-express-mongoose-demo - my fork original repo, just added Dockerfile there and some parametrizations in configs)
- selenium server with chrome node will start in background in separate containers
- protractor based tests will run against the app (hosted in ./test folder)
- after test run is complete, allure html report will be generated using dockerized allure (https://github.com/masterandrey/docker-allure)

*Requirements:*
- Docker
- Docker-compose
- Make
