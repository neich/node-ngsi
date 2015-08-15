# A COAP-NGSI IoT agent

## Prerequisites:

- [node.js](https://nodejs.org/)

## Install

```
git clone https://github.com/neich/node-coap.git
git clone git@bitbucket.org:neich/coap-ngsi-agent.git
cd coap-ngsi-agent
npm install
```

## Run it:

You need the ipv6 address of an edge router. Then:

```
node src/server.js aaaa::212:7401:1:101 // This is a ipv6 from a cooja simulation
```

Now you can send NGSI queries to localhost:8080



