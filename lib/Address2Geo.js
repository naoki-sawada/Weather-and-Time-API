const request = require('request');
const conf = require('config');

class Address2Geo {
  constructor() {}

  get(address, opt) {
    const options = opt || {};
    const language = options.language || 'en';
    const region = options.region || 'en';
    const requestURI = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&region=${region}&language=${language}&key=${conf.googleMapKey}`;

    return new Promise((resolve, reject) => {
      // console.log(requestURI);
      request(requestURI, (error, response, body) => {
        if (error) {
          reject(error);
        }

        const bodyObj = JSON.parse(body);
        if (bodyObj.status === "OK") {
          // console.log(bodyObj);
          const retObj = {
            status: "OK",
            formatted_address: bodyObj.results[0].formatted_address,
            location: bodyObj.results[0].geometry.location
          };
          resolve(JSON.stringify(retObj));
        } else {
          reject(body);
        }
      });
    });

  }
}

module.exports = Address2Geo;
