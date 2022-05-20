var data = "upi://pay?pa=9868025442@upi&pn=RAJU%20SINGH&cu=INR&mode=02&purpose=00&orgid=189999&sign=MEUCIQD21uPz4klZ+cNqJAiRhWRN9muLEICUaHGlSoFi6XhlVwIgXJq5/EEiYb9lhPGyp40R++880wLWGR/V32LnBAO7q4s=";

var dataObject = data.split('&');

var pa = dataObject[0].split('=').pop();
var pn = dataObject[1].split('=').pop();
pn = decodeURI(pn);


console.log(pa);
console.log(pn);

