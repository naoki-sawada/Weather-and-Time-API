const request = require('request');
const conf = require('config');

class Geo2Weather {
  constructor() {}

  get(lat, lng, opt) {
    const options = opt || {};
    const queryOptions = {
      uri: 'http://api.openweathermap.org/data/2.5/forecast/daily',
      qs: {
        APPID: conf.openWeatherKey,
        lat: lat,
        lon: lng,
        cnt: options.cnt || 16
      }
    };

    return new Promise((resolve, reject) => {
      request(queryOptions, (error, response, body) => {
        if (error) {
          reject(error);
        }

        const bodyObj = JSON.parse(body);
        if (bodyObj.cod == 200) {
          // console.log(bodyObj);
          const retObj = {
            status: "OK",
            city: bodyObj.city,
            list: bodyObj.list
          };
          resolve(JSON.stringify(retObj));
        } else {
          reject(body);
        }
      });
    });

  }
}

module.exports = Geo2Weather;
