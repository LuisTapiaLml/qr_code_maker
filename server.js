const express = require('express');

const app =  express();

app.listen('3000');

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
    res.render('index.html');
});

console.log('listening port 3000'); 