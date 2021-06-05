var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  region: "us-east-1"
});

console.log("Writing entries to Accessibilities table.");

var dynamodb = new AWS.DynamoDB.DocumentClient();
var accessibilitiesData = 
  JSON.parse(fs.readFileSync('../components/data/accessibilities.json', 'utf8'));

accessibilitiesData.forEach(function(accessibililtyItem) {
  var params = {
    TableName: "Accessibilities",
    Item: {
      "name": accessibililtyItem.name
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err)
      console.error("Unable to load data into table for accessibility",
      accessibililtyItem.name, ". Error: ", JSON.stringify(err, null, 2))
    else
      console.log("Added", accessibililtyItem.name, "to table.")
  })
});