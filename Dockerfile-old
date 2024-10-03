FROM node:16-alpine as build

WORKDIR /app
COPY package.json /app

RUN npm install

COPY . /app

CMD ["node","app.js"]
#EXPOSE 80

