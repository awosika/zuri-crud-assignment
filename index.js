const app = require('express')();

// connection string
const mongoose = require ('mongoose');
const connectionString = "mongodb+srv://Gbenx2021:damilola1984@cluster0.agroi.mongodb.net/dataObject?retryWrites=true&w=majority";
const { Schema } = mongoose;



//create a function to connect to the database
mongoose.connect(connectionString, { 
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err) => {
    if(err){
        console.log({err})
    } else{
        console.log("Database connected")
    }

}) ;  

// create schema

const personalSchema = new Schema({
    name:  String,
    email: String,
    country: String
});
const Personal = mongoose.model('Personal', personalSchema);


// create routes
// fetch all personalData in the database
// create a get request
app.get('/personalData', (req, res) => {
    Personal.find({ }, (err, personalData) => {
        if(err){
            return res.status(500).json({err})
        } else{
            return res.status(200).json({personalData})
        }
    })
});


// create a post request 
app.post('/personalData', (req, res) => {
    Personal.update({name: 'Bisola Opaleye' },{set: {name: 'Bisola Awosika'}}, (err, personalData) => {
        if(err){
            return res.status(500).json({err})
        } else{
            return res.status(200).json({personalData})
        }
    })
});


//create a delete request
app.get('/personalData', (req, res) => {
    Personal.deleteOne({country: 'canada' }, (err, personalData) => {
        if(err){
            return res.status(500).json({err})
        } else{
            return res.status(200).json({personalData})
        }
    })
});


app.listen(6000, () => console.log('app connected'))