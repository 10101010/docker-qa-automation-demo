#!/bin/bash

set -ex

docker-compose -f docker-compose.app.yml down
docker-compose -f docker-compose.qa.yml down
