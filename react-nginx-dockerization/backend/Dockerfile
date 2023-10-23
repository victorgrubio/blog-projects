FROM node:16.3.0-alpine

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 8000

ENV MONGODB_USERNAME=admin
ENV MONGODB_PASSWORD=secret

CMD ["node", "app.js"]

