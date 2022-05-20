var data = "upi://pay?pa=9331259224@ybl&pn=******9224&mc=0000&mode=02&purpose=00";
// "upi://pay?pa=9331259224@ybl&pn=******9224&mc=0000&mode=02&purpose=00";
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

if (!pn.includes('*') && !pn.includes("PaytmUser")){
    console.log(pn);
}
else{
    console.log(pa);
}


// if pn contains PaytmUser show pa
// if pn contains '*' show pa

