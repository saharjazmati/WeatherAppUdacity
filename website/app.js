/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'.'+ d.getDate()+'.'+ d.getFullYear();
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey='32aec6e1a86b8434da6241c3647c5908&units=imperial';
document.getElementById('generate').addEventListener('click', performAction);

// Make a GETrequest from a web APIs,
let newTemp ="";
const getFunction = async (baseURL, zip, Key)=>{
  const res = await fetch(baseURL + zip + ',us&appid=' + Key);
    console.log(res)
    try {
      const weatherJournalData = await res.json();
      newTemp = weatherJournalData.main.temp;
      return newTemp;
    }  catch(error) {
      console.log("error", error);
    }
  }

function performAction(e){
    const feeling =  document.getElementById('feelings').value;
    console.log(baseURL+document.getElementById('zip').value+',us&appid='+apiKey)
    getFunction(baseURL,document.getElementById('zip').value,apiKey)
     .then(function(weatherJournalData){
        postData('http://localhost:3000/add', {dates:newDate, temperature:newTemp, userResponse:feeling});
    }).then(function () {
     updateUI();
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
      console.log(newData)
	  return newData;
    }catch(error) {
    console.log("error", error);
    }
}
//Update UI
const updateUI = async () => {
  const request = await fetch('http://localhost:3000/all');
  try{
    const allData = await request.json();
    console.log(allData);
    document.getElementById('date').innerHTML = allData.dates;
    document.getElementById('temp').innerHTML = `Temperature: ${(allData.temperature)} degrees`;
    document.getElementById('content').innerHTML = `My feeling is ${allData.userResponse}`;
  }catch(error){
    console.log("error", error);
  }
}
