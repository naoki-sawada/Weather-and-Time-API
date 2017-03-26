const request = require('request');
const moment = require('moment-timezone');
const conf = require('config');

class Geo2Time {
  constructor() {}

  get(lat, lng, opt) {
    const options = opt || {};
    const timestamp = options.timestamp || 1331161200; //適当な値を入れ込む //Date.now();
    const language = options.language || 'en';
    const requestURI = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&language=${language}&key=${conf.googleMapKey}`;

    return new Promise((resolve, reject) => {
      request(requestURI, (error, response, body) => {
        if (error) {
          reject(error);
        }

        const bodyObj = JSON.parse(body);
        if (bodyObj.status === "OK") {
          const retObj = {
            status: "OK",
            timeLocal: moment().tz(bodyObj.timeZoneId).format(),
            timeZoneId: bodyObj.timeZoneId,
            timeZoneName: bodyObj.timeZoneName
          };
          resolve(JSON.stringify(retObj));
        } else {
          reject(body);
        }
      });
    });

  }
}

module.exports = Geo2Time;
