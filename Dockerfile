FROM node:latest

LABEL mantainer="Icarcal @icarcal"
LABEL version="1.0"

WORKDIR /var/www

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]