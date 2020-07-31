const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express(); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/assets'));

app.listen(port, function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log('Server up and Running on port:', port);
});

app.get('/', function(req, res){
    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contacts');
            return;
        }
        return res.render('home', {
            title: 'My Contact List',
            contact_list: contacts
        });
    });
});

app.post('/add-contact', function(req, res){
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },
    function(err, newContact){
        if(err){
            console.log('Error in creating contact');
            return;
        }
        console.log('********', newContact);
        return res.redirect('back');
    });
});

app.get('/delete-contact', function(req, res){
    let id = req.query.id;
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in deleting object');
            return;
        }
        return res.redirect('back');
    });
});