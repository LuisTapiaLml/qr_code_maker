const express = require('express');

const app =  express();

app.listen('3000');

app.use('/qrcode',express.static(__dirname + '/public'));

app.get('/qrcode',(req,res)=>{
    res.render('index.html');
});

console.log('listening port 3000'); 