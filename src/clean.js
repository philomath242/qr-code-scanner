var data = "upi://pay?cu=INR&pa=onsfoundation@icici&pn=ONS%20Foundation";

//"upi://pay?pa=9868025442@upi&pn=RAJU%20SINGH&cu=INR&mode=02&purpose=00&orgid=189999&sign=MEUCIQD21uPz4klZ+cNqJAiRhWRN9muLEICUaHGlSoFi6XhlVwIgXJq5/EEiYb9lhPGyp40R++880wLWGR/V32LnBAO7q4s=";

var dataObject = data.split('&');
dataObject = dataObject.map( (s) => { return s.split('?').pop() } );

var pa = '';
var pn = '';

for (let i = 0; i < dataObject.length; i++){
    if (dataObject[i].includes('pa')) {
        pa = dataObject[i].split('=').pop();
    }
    if (dataObject[i].includes('pn')) {
        pn = dataObject[i].split('=').pop();
        pn = decodeURI(pn);
    }
}

console.log(pa, pn);



