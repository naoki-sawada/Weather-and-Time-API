'use strict';
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const Geo2Time = require('./lib/Geo2Time');
const Address2Geo = require('./lib/Address2Geo');
const Geo2Weather = require('./lib/Geo2Weather');

const geo2time = new Geo2Time();
const address2geo = new Address2Geo();
const geo2weather = new Geo2Weather();

const app = express();

app.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  next();
});
app.use(bodyParser.json());

app.set('port', process.env.PORT || 7000);
app.get('/', (req, res) => {
  res.send('running');
});

app.post('/api/weather', (req, res) => {
  var contype = req.headers['content-type'];
  if (!!contype && contype.indexOf('application/json') == 0) {
    if (!req.body.place) res.json({ status: "ERROR", error: 'Not Defined place!' });

    const options = {
      language: req.body.lang || 'en',
      region: req.body.region || 'en'
    };
    address2geo.get(req.body.place, options)
    .then((result) => {
      // console.log('Address2Geo OK: ', result);
      let resultObj = JSON.parse(result);
      geo2weather.get(resultObj.location.lat, resultObj.location.lng, options)
      .then((result) => {
        // console.log('Geo2Weather OK: ', result);
        res.json({ status: "OK", geo: resultObj, weather: JSON.parse(result) });
      })
      .catch((err) => {
        res.json({ status: "GET_WEATER_ERROR", error: err });
      });
    })
    .catch((err) => {
      res.json({ status: "GET_GEOCODE_ERROR", error: err });
    });
  } else {
    res.status(400).end('error!');
  }
});

app.post('/api/time', (req, res) => {
  var contype = req.headers['content-type'];
  if (!!contype && contype.indexOf('application/json') == 0) {
    if (!req.body.place) res.json({ status: "ERROR", error: 'Not Defined place!' });

    const options = {
      language: req.body.lang || 'en',
      region: req.body.region || 'en'
    };
    address2geo.get(req.body.place, options)
    .then((result) => {
      // console.log('Address2Geo OK: ', result);
      let resultObj = JSON.parse(result);
      geo2time.get(resultObj.location.lat, resultObj.location.lng, options)
      .then((result) => {
        // console.log('OK: ', result);
        res.json({ status: "OK", geo: resultObj, time: JSON.parse(result) });
      })
      .catch((err) => {
        console.log('error: ', err);
        res.json({ status: "GET_TIME_ERROR", error: err });
      });
    })
    .catch((err) => {
      res.json({ status: "GET_GEOCODE_ERROR", error: err });
    });
  } else {
    res.status(400).end('error!');
  }
});

const server = http.createServer(app).listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
