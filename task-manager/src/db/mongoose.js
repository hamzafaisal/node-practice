const mongoose = require("mongoose");

// Users/Hamza/MongoDB/Server/4.2/bin/mongod.exe --dbpath=Users/Hamza/MongoDB-data
// Connect MongoDB at default port 27017.
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
