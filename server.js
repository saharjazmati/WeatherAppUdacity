// Global variables
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '32aec6e1a86b8434da6241c3647c5908 ';

document.getElementById('generate').addEventListener('click', performAction);

// Make a GETrequest from a web APIs,
const getFunction = async (baseURL, zip, Key)=>{ //sisi checked
    const res = await fetch(baseURL+zip+',us&appid='+Key); //rebuild our URL into a fetch call
    try {
      const data = await res.json(); //don’ t go to the next part till 
      //postData('http://localhost:3000/add',data); //sss just added
      return data; //we can do something with returned data here: 
    }  catch(error) {
      console.log("error", error);    // appropriately handle the error
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
    const response = await fetch(url, { //script not to go on to the next part until it’s received the data needed, because fetch is calling to a web APIs
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
    console.log("error", error);
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



