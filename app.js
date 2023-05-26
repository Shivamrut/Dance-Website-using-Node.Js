// importing modules
const express = require('express');
const path = require('path');
const Db = require('./db');
const userDb = require('./userDb');
const passport = require('passport')
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')
const passportInit = require('./passport-config')

// creating app
const app = express();
const port = 80;
app.use('/static',express.static('static'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// pug config
app.set('view engine','pug');
app.set('views',path.join(__dirname, 'views'));

// session config
app.use(session({
    secret:'mysecret',
    resave:false,
    saveUninitialized:false
}))
app.use(flash());

// passport config
passportInit(passport);
app.use(passport.initialize())
app.use(passport.session())

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
var i = 0;
app.get('/login',async (req,res)=>{
    const obj = await req.flash('error');
    var test=i.toString();
    i++;
    const params = { 'pageName' : 'Log in to your account', 'messages' : test };
    console.log('flash: ',obj);
    res.status(200).render('login',params);

})
app.post('/login',passport.authenticate('local',{
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash:true
    })
);
app.post('/register',async (req,res)=>{
    try{
        console.log(req.body);
        const {name, email, username, password} = req.body;
        const user = await userDb.findOne({$or:[{username: username},{email:email}]}).exec();
        // console.log(typeof user);
        if(user){
            console.log('User exists');
            res.json({
                success : false
            });
        }
        else{
            const hashedPassword = await bcrypt.hash(password,10);
            userDb.insertMany({
                name:name,
                email:email,
                username:username,
                password:hashedPassword
            });
            res.json({
                success : true
            });
        }
    }catch(e)
    {
        console.log('Error in post register');
    }
    
    
})
app.get('/register',(req,res)=>{
    const params = { 'pageName' : 'Register new account'};
    res.status(200).render('register',params);

})
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