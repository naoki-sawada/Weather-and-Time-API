const Geo2Time = require('./lib/Geo2Time');
const Address2Geo = require('./lib/Address2Geo');
const Geo2Weather = require('./lib/Geo2Weather');

const geo2time = new Geo2Time();
const address2geo = new Address2Geo();
const geo2weather = new Geo2Weather();


address2geo.get('千歳空港')
.then((result) => {
  console.log('OK: ', result);
  let resultObj = JSON.parse(result);

  geo2weather.get(resultObj.location.lat, resultObj.location.lng)
  .then((result) => {
    console.log('OK: ', result);
  })
  .catch((err) => {
    console.log('error: ', err);
  });

  // geo2time.get(resultObj.location.lat, resultObj.location.lng)
  // .then((result) => {
  //   console.log('OK: ', result);
  // });
  // .catch((err) => {
  //   console.log('error: ', err);
  // });
})
.catch((err) => {
  console.log('error: ', err);
});
