const request = require("request");

geocode = (address, callback) => {
  const mapUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiamVycnlmYXlzYWwiLCJhIjoiY2sxNGoyMzZlMGl4aDNjcHlla2JpcWlkYSJ9.lacKVkSdd_D3AHwa6-4u8g&limit=1";

  request(mapUrl, (error, { body }) => {
    if (error) {
      callback("something went wrong", undefined);
    } else {
      let data = JSON.parse(body).features[0].center;
      data.push(JSON.parse(body).features[0].place_name);
      callback(undefined, data);
    }
  });
};

forecast = (lng, lat, callback) => {
  const apiUrl = `https://api.darksky.net/forecast/d2c74c0e36e053ce132780cf02bc4b1b/${lat},${lng}?units=si`;
  request(apiUrl, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else {
      let data = JSON.parse(body);
      callback(undefined, data);
    }
  });
};

module.exports = { geocode, forecast };
