const fs = require('fs');
const fastify = require("fastify")();
const { coinCount } = require('./p3-module.js')

fastify.get("/", (request, reply) => {
      fs.readFile(`${__dirname}/index.html`, (err, data) => { 
        if (err) { 
            reply
            .code(500)
            .header("Content-Type", "text/html; charset=utf-8")
            .send("<h1>Error processing request</h1>")
        } else { 
          console.log("QueryObject:", request.query); 
            reply
            .code(200)
            .header("Content-Type", "text/html; charset=utf-8")
            .send(data)
        }
    });   
});

fastify.get("/coin", (request, reply) => {
    // Receive a request
    const { denom = 0 , count = 0 } = request.query; 
    // Do something with that request 
    let response = request.query;
    let coinValue = coinCount(response);
    console.log("coinValue:", coinValue);
    // Give a response
    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send(`<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`);
  });
  
fastify.get("/coins", (request, reply) => {
    // Receive a request
    const { option } = request.query;
    // Do somethting with that request
    let coinValue;
    const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
    switch(option) {
        case "1":    
            coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
            break;
        case "2":
            coinValue = coinCount(...coins);
            break;
        default:
            coinValue = 0;
      }
      //console.log(coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 }));
      console.log("coinValue of option:", coinValue);
    // Give a response
        reply
          .code(200)
          .header("Content-Type", "text/html; charset=utf-8")
          .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`);
});

const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server listing on ${address}`);
});
