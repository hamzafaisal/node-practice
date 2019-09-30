const functions = require("./utils/functions");

if (process.argv[2]) {
  functions.geocode(process.argv[2], (error, data) => {
    functions.forecast(data[0], data[1], (error, data2) => {
      console.log(
        `It is currently ${data2.currently.temperature} degrees in ${
          data[2]
        } with ${data2.currently.precipProbability}% chances of rain`
      );
    });
  });
} else {
  console.log("Enter Valid Address!");
}
