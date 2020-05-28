const express = require('express');
const path = require('path');
const port = 8500;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get("/", function(req, resp){
    return resp.render('home', {'title' : 'Dynamic title'});
});

app.get("/practice", function(req, res){
    return res.render("practice", {
        title : "Contact List"
    });
});

app.get("/contacts", function(req, res){

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Unable to fetch contacts from database');
            return;
        }

        return res.render('contacts', {
            title : 'Contacts List',
            heading : 'My Contacts List',
            contact_list : contacts
        });
    });
    // return res.render("contacts", {
    //     title : "Contact List",
    //     heading : "My Contacts List",
    //     contact_list : contactList
    // });
});

var contactList = [
    {
        name:"Arun",
        phone: "9492136642"
    },
    {
        name: "Sridher",
        phone: "8639328041"
    },
    {
        name: "Ambati",
        phone: "7569514776"
    }
];

app.post("/create-contact", function(req, res){
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    
    // contactList.push(req.body);

    Contact.create({
        name : req.body.name,
        phone : req.body.phone
    }, function(err, newContact){
        if(err){
            console.log('error in creating a contact');
            return;
        }

        console.log(newContact);
        res.redirect('back');
    });
    // return res.redirect("back");
});

app.get("/delete-contact", function(req, res){
    console.log(req.query);
    let id = req.query.id;

    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log("Couldn't delete contact");
            return;    
        }

        return res.redirect('back');
    });
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex, 1);
    // }

    // return res.redirect("back");
});

app.listen(port, function(err, data){
    if(err){
        console.log("Error in running the server ", err);
    }
    console.log("Express server is running on port ", port);
});