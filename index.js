require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { parse } = require('dotenv');
const express = require('express')
const app = express()
const port = process.env.PORT || 80

const cache = {};

function try_cache(key, value) {
  if (value === null || isNaN(value)) {
    if (!(key in cache)) {
      cache[key] = null;
    }
  } else {
    cache[key] = value
  }

  return cache[key];
}

app.get('/getPrice', async (req, res) => {
    console.log(req.query);
    let btc = await fetch(`https://api.twelvedata.com/price?symbol=btc/usd&apikey=${process.env.API_KEY}`)
    let btcResponse = await btc.json();

    let eth = await fetch(`https://api.twelvedata.com/price?symbol=eth/usd&apikey=${process.env.API_KEY}`)
    let ethResponse = await eth.json();

    let ada = await fetch(`https://api.twelvedata.com/price?symbol=ada/usd&apikey=${process.env.API_KEY}`)
    let adaResponse = await ada.json();

    let bnb = await fetch(`https://api.twelvedata.com/price?symbol=bnb/usd&apikey=${process.env.API_KEY}`)
    let bnbResponse = await bnb.json();
    
    let algo = await fetch(`https://api.twelvedata.com/price?symbol=algo/usd&apikey=${process.env.API_KEY}`)
    let algoResponse = await algo.json();

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    res.send([
      {name: 'btc/usd',  price: try_cache('btc/usd',  parseFloat(btcResponse.price))},
      {name: 'eth/usd',  price: try_cache('eth/usd',  parseFloat(ethResponse.price))},
      {name: 'ada/usd',  price: try_cache('ada/usd',  parseFloat(adaResponse.price))},
      {name: 'bnb/usd',  price: try_cache('bnb/usd',  parseFloat(bnbResponse.price))},
      {name: 'algo/usd', price: try_cache('algo/usd', parseFloat(algoResponse.price))},
    ]);
  });

  app.get('/getWeather', async (req, res) => {
    console.log(req.query);

    let toronto = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=toronto&units=metric&appid=${process.env.WEATHER_API_KEY}`);
    let torontoResponse = await toronto.json();
    
    let london = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=${process.env.WEATHER_API_KEY}`);
    let londonResponse = await london.json();
   
    let helsinki = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=helsinki&units=metric&appid=${process.env.WEATHER_API_KEY}`);
    let helsinkiResponse = await helsinki.json();
   
    let cairo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=cairo&units=metric&appid=${process.env.WEATHER_API_KEY}`);
    let cairoResponse = await cairo.json();

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  
    res.send([
      { name: 'toronto',  temp: try_cache('toronto',  parseFloat(torontoResponse.main.temp))},
      { name: 'london',   temp: try_cache('london',   parseFloat(londonResponse.main.temp))},
      { name: 'helsinki', temp: try_cache('helsinki', parseFloat(helsinkiResponse.main.temp))},
      { name: 'cairo',    temp: try_cache('cairo',    parseFloat(cairoResponse.main.temp))},
    ]);
   

    // res.send([
    //   {name: 'btc/usd', price: parseFloat(btcResponse.price)},
    //   {name: 'eth/usd', price: parseFloat(ethResponse.price)},
    //   {name: 'ada/usd', price: parseFloat(adaResponse.price)},
    //   {name: 'bnb/usd', price: parseFloat(bnbResponse.price)},
    //   {name: 'algo/usd', price: parseFloat(algoResponse.price)},
    // ]);
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});