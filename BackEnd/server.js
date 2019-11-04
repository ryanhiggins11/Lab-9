const express = require('express')
const app = express()
const port = 4000
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const mongoDB = 'mongodb+srv://admin:admin@cluster0-lk0ot.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB,{useNewUrlParser:true});

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title:String,
    year:String,
    poster:String
})

const MovieModel = mongoose.model('movie', movieSchema);


app.get('/', (req, res) => res.send('Hello World!'))

app.get('/whatever', (req, res) => {
    res.send('whatever')
})

app.get('/name', (req, res) => {
    console.log(req.query.lastname)
    res.send('Welcome ' + req.query.firstname +
        ' ' + req.query.lastname);
})

app.post('/name', (req, res) => {
    console.log(req.body.lastname);
    res.send('post recieved from '
        + req.body.firstname + ' ' +
        req.body.lastname)
})

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/api/movies', (req, res) => {

    MovieModel.find((error, data) =>{
        res.json({movies:data});
    })
   
})

app.delete('/api/movies/:id', (req, res) =>{
    console.log(req.params.id);

    MovieModel.deleteOne({_id:req.params.id}, (error, data) =>{
        if(error)
            res.json(error);
        
        res.json(data);
    })
})

app.get('/api/movies/:id', (req, res)=>{
    console.log(req.params.id);

    MovieModel.findById(req.params.id, (error,data)=>{
        res.json(data);
    })
})

app.post('/api/movies', (req,res)=>{
    console.log('Post request Successful');
    console.log(req.body.title);
    console.log(req.body.year);
    console.log(req.body.poster);

    MovieModel.create({
        title:req.body.title, 
        year:req.body.year, 
        poster:req.body.poster
    });

    res.json('post recieved!');
})
app.get('/hello/:name', (req, res) => {
    console.log(req.params.name);
    res.send('Hello ' + req.params.name)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))