// importing modules
const express = require('express');
const path = require('path');
const Db = require('./db');

// creating app
const app = express();
const port = 80;
app.use('/static',express.static('static'));
app.use(express.json());
app.use(express.urlencoded());

// pug config
app.set('view engine','pug');
app.set('views',path.join(__dirname, 'views'));

// get endpoints
app.get('/',(req,res)=>{
    const params = {'pageName' : 'Home' };
    res.status(200).render('index.pug',params);
});

app.get('/about', (req,res)=>{
    const params = {'pageName' : 'About' };

    res.status(200).render('about.pug',params);

});

app.get('/contact', (req,res)=>{
    const params = {'pageName' : 'Contact Us' };

    res.status(200).render('contact.pug',params);

});

app.get('/services', (req,res)=>{
    const params = {'pageName' : 'Services' };

    res.status(200).render('services.pug',params);

});

app.get('/classes', (req,res)=>{
    const params = { 'pageName' : 'Classes We Provide'};

    res.status(200).render('classes.pug',params);

});

// post endpoints
app.post('/contact',(req,res)=>{
    const data = req.body;
    console.log('reqbody: ', data);
    const db = Db.getSingleInstance();
    const result = db.createContact(data);
    result 
    .then(data => {
        console.log(data);
        res.json({
            data : data
        })
    })
    .catch(err=>{
        console.log('Error in post contact');
        // console.log(err);
    });

});

// starting server
app.listen(port, ()=>{
    console.log(`The app is running at http://127.0.0.1/`);
})