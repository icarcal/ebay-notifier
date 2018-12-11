FROM node:latest

LABEL mantainer="Icarcal @icarcal"
LABEL version="1.0"

COPY ./ /var/www/app

WORKDIR /var/www/app

EXPOSE 3001

CMD [ "./build-node.sh" ]
