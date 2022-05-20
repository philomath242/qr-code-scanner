//const qrcode = window.qrcode;

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");

var pa = '';
var pn = '';

let scanning = false;

qrcode.callback = res => {
  if (res) {
    console.log("Output is", res);
    let data = res;
    if (data.includes('upi')){
      afterScan(data);
    }
    else{
      outputData.innerText = data;
    }
    scanning = false;

    video.srcObject.getTracks().forEach(track => {
      track.stop();
    });

    qrResult.hidden = false;
    canvasElement.hidden = true;
    btnScanQR.hidden = false;
  }
};

btnScanQR.onclick = () => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
      scanning = true;
      qrResult.hidden = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
};

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}


dragElement(document.getElementById("transaction-text"));

function dragElement(elem) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elem.id + "header")) {
    document.getElementById(elem.id + "header").onmousedown = dragMouseDown;
  } else {
    elem.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();    
    //pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    //pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    //pos3 = e.clientX;
    pos4 = e.clientY;
    elem.style.top = (elem.offsetTop - pos2) + "px";
    //elem.style.left = (elem.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {  
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function afterScan(data){
  console.log("here");
  var dataObject = data.split('&');
  dataObject = dataObject.map( (s) => { return s.split('?').pop() } );

  for (let i = 0; i < dataObject.length; i++){
    if (dataObject[i].includes('pa')) {
        pa = dataObject[i].split('=').pop();
    }
    if (dataObject[i].includes('pn')) {
        pn = dataObject[i].split('=').pop();
        pn = decodeURI(pn);
    }
  }
  outputData.innerHTML = pa + '<br>' + pn;
  document.getElementById('amount-submit').addEventListener('click', processTransaction);
}



function processTransaction() {

  var payee = '';

  if (!pn.includes('*') && !pn.includes("Paytm") && !pn.includes("PhonePe")){
    payee = pn;
  }
  else{
      payee = pa;
  }

  var amount = document.getElementById('amount-input').value;
  console.log("amount ", amount);
  if (amount != null && amount != ""){
    document.getElementById('transaction-amount').innerText = amount;
    document.getElementById('payee-name').innerText = payee;
    document.getElementById("tone").play();
    document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#00A04C');
    document.getElementById('container').style.display = "none";
    document.getElementById('transaction-page').style.display = "block";
    document.body.style.backgroundColor = "var(--green)";
    document.getElementById('main-video').play();
  }
  else{
    alert("Please enter a valid amount");
  }
}

