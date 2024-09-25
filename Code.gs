var sheet = SpreadsheetApp.getActive().getSheetByName("Sheet1");
var values = sheet.getDataRange().getValues();

function doPost(e) {
  //write the tweet to the sheet
  var date = Date.now();
  var payload = JSON.parse(e.postData.contents);
  var tweet = payload.tweet;
  var name = payload.name;
  sheet.insertRowAfter(1);
  sheet.getRange(2, 1, 1, 3).setValues([[name, date, tweet]]);
  return ContentService.createTextOutput(JSON.stringify({success: true}));
}

function doGet(){
  //return json of array of obj of name, date, text
  var output = [];
  for(var x = 1; x < values.length; x++){
    output.push({
      name: values[x][0],
      date: values[x][1],
      tweet: values[x][2]
    });
  }
  return ContentService.createTextOutput(JSON.stringify(output));
}
