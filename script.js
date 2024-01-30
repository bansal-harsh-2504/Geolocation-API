const fullAddress = document.querySelector(".formattedAddress");
let apiEndpoint = "https://api.opencagedata.com/geocode/v1/json";
let apiKey = "a1fc235aa5bb4cb5aced811599de0810";
const getUserCurrentAddress = async (latitude, longitude)=>{
    let queryString = `${latitude}%2C${longitude}`; 
    let apiURL = `${apiEndpoint}?q=${queryString}&key=${apiKey}`;
    console.log(apiURL);
    try{
        const res = await fetch(apiURL);
        const data = await res.json();
        fullAddress.textContent = `${data.results[0].formatted}`;
    }catch(error){
        console.log(error);
    }
};

document.querySelector(".geo-btn").addEventListener("click", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((coordinates) => {
            // console.log(coordinates);
            const { latitude, longitude } = coordinates.coords;
            document.querySelector(".showDetails").innerText = `Latitude: ${latitude},Longitude: ${longitude}`;
            getUserCurrentAddress(latitude, longitude);
        }, (err)=>{
            console.log(err.message);
        });
    }
});