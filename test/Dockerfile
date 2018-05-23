FROM node:9

ADD package.json /app/package.json

RUN npm install --prefix /app
RUN npm install protractor -g

ADD . /app

WORKDIR /app

ENTRYPOINT protractor
