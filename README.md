# Ebay Notifier

## Requirements

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Running the project

To run this project, clone and run the docker-compose command:
```
git clone https://github.com/icarcal/ebay-notifier
cd ebay-notifier
docker-compose
```

After that, the API will be available at [http://localhost:3001](http://localhost:3001) and the web interface will be available at [http://localhost:3000](http://localhost:3000)

## Postman

If you want to test the backend via postman, get the collection [here](https://raw.githubusercontent.com/icarcal/ebay-notifier/master/ebay-notifier.postman_collection)

## What I used

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) for container managment
- [Node.js](https://nodejs.org/en/) for backend
  - [Express](http://expressjs.com/pt-br/) as router
  - [Node Mailer](https://nodemailer.com/about/) for sending emails
  - [Node Cron](https://github.com/merencia/node-cron) for the cron scheduling
- [React](https://reactjs.org/) for the frontend
  - [Create React App](https://github.com/facebook/create-react-app) as boilerplate
  - [Redux](https://redux.js.org/) as state container
- [MongoDB](https://docs.mongodb.com/) as database
- [MailCatcher](https://mailcatcher.me/) as SMTP server
- [Redis](https://redis.io/) as cache

Unfortunatelly I was unable to create any test, due to the deadline ☹️

I was intending to use [Mocha](https://mochajs.org/), [Chai](http://www.chaijs.com/), and [Istambul](https://istanbul.js.org/) for backend testing and [Jest](https://jestjs.io/) for frontend testing.

I was planning to use [RabbitMQ](https://www.rabbitmq.com/) to process the e-mails, but was unable to do that either.

# How to check the e-mails

Once the containers are up, go to your browser and type:
```
0.0.0.0:1080
or
127.0.0.1:1080
or
localhost:1080
```

You can check the running process as well by tailing the log via:
```
docker logs ebay-notifier-node-back -f
```

