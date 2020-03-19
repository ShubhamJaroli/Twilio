const express = require('express');
const bodyParser = require('body-parser')
const twilio = require('twilio')
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
var SID = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
var token = 'f0XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; //Khud ki lao
var client = new twilio(SID,token);
app.get('/',(req,res)=>
{
    res.send('WELCOME')
})

app.post('/twilioVerification',(req,res)=>
{   
    var number = req.body.Contact;
    client.messages.create({
        body:'Hello User',
        to : '+91'+number,
        from:'+12133719746'
    }).then((msg)=>
    {
        console.log(msg.sid)
        res.send({Message:msg,Id:msg.sid})
    })
})

app.get('/*',(req,res)=>
{
    res.send("NOT FOUND")
})
app.listen(3000)
