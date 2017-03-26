# Weather and Time API

## About

This API returns weather or time from location of the name.

## Install  

```  
$ npm install  
```  

## Usage

### Settings

At first, please replace your API keys of the `config/default.js` file.  

Please see below for how to get API keys.  

* [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/get-api-key)
* [OpenWeatherMap](https://openweathermap.org/appid)

### Run

```  
$ npm start  
```  

After this commnad, API server start at `7000` port.

### API Example

Getting the weather.

```  
$ curl -H 'Content-Type:application/json' -d "{\"place\":\"Tokyo\"}" http://localhost:7000/api/weather  
```  

Getting the time.

```  
$ curl -H 'Content-Type:application/json' -d "{\"place\":\"Italy\"}" http://localhost:7000/api/time  
```  

## TODO

* Add logging function.

## License

MIT &copy; Naoki Sawada
