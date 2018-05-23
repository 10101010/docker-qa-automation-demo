#!/bin/bash

set -ex

make clean
make run-app
make run-selenium-grid

sleep 10

make run-tests
make report
make serve
