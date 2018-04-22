FROM node:9

ADD . /app

RUN npm install --prefix /app
RUN npm install protractor -g

WORKDIR /app

ENTRYPOINT protractor
