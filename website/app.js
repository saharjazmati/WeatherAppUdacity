/* Global Variables */

let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '32aec6e1a86b8434da6241c3647c5908 ';
document.getElementById('generate').addEventListener('click', performAction);

const getFunction = async (baseURL, zip, Key)=>{
    const res = await fetch(baseURL+zip+',us&appid='+Key);
    try {
      const data = await res.json();
      //postData('http://localhost:3000/add',data); 
      return data; //we can do something with returned data here: 
    }  catch(error) {
      console.log("error", error);    
    }
  }


function performAction(e){ 
    const feelings =  document.getElementById('feelings').value;
    getFunction(baseURL,document.getElementById('zip').value,apiKey) 
            // New Syntax!
     .then(function(data){
        postData('http://localhost:3000/add',{date:newDate,temperature:data.main.temp,userResponse:feelings});
        updateUI('http://localhost:3000/all')
        });
}

const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, { 
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    	 },
    body: JSON.stringify(data),
    });
    try {
      const newData = await response.json();
	  return newData;
    }catch(error) {
    console.log("error", error); // show the console usual error message 
    }
}
//Update UI 
const updateUI = async () => { //url=''

  const request = await fetch('http://localhost:3000/all');
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData[0].date;
    document.getElementById('temp').innerHTML = allData[0].temperature;
    document.getElementById('content').innerHTML = allData[0].userResponse;
  }catch(error){
    console.log("error", error);
  }
}



