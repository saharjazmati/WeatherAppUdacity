// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Require Express to run server and routes
const express = require('express');
/* Start up an instance of app */
const app = express();
/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
/* Initialize the main project folder*/
app.use(express.static('website'));
const port = 3000;
// Setup Server
const server = app.listen(port, listening);
 function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
  };
// GET route returns projectData
app.get('/all', function (request, response) {
    response.send(projectData);
});

// POST route adds data to ProjectData
app.post('/add', function (request, response) {
    const newEntry = {
        temperature: request.body.temperature,
        dates: request.body.dates,
        userResponse: request.body.userResponse,
    };

    projectData.unshift(newEntry);
});
 /* here 
// GET route
app.get('/all', sendData);
function sendData (request, response) {
  response.send(projectData);
};

// POST route
app.post('/add', callBack);
function callBack(req,res){
    const data = req.body 
    newData = {
    temperature: data.temperature,
    date: data.date,
    userResponse: data.userResponse, }
    Object.assign(projectData, newData);
    res.send(projectData)
    }
  res.send('POST received');
};
// POST weather
const data = [];
app.post('/weather', addweather); //was addAnimal and was /animal
function addweather (req,res){
    data.push(req.body);
}*/
