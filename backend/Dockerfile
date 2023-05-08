FROM node:17-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . . /app/

CMD ["npm", "start"]

EXPOSE 8010 8020

