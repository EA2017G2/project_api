FROM node:alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json .
RUN npm install --quiet

COPY . .

EXPOSE 3000
EXPOSE 8080