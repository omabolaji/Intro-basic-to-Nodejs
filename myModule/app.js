'use strict'

const Enigma = require('./enigma');
const eng = new Enigma('famousb');

    // console.log(eng.hello("Dave"));
    // console.log(eng.goodmorning("dave"));
    let encodeString  = eng.encode("Don't panic!");
    let decodeString  = eng.decode(encodeString);
    
    console.log("Encode: " , encodeString);
    console.log("Decode: ", decodeString);
    
    let qr = eng.qrgen("http://www.npmjs.com", "outImage.png");
    qr ? console.log("QR Created") : console.log("QR Failed");