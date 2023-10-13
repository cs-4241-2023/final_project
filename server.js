const express = require("express");

const app = express();

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded( {extended: false} ));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/start.html");
});

app.get("/tapmoney", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
