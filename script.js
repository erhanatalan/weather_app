const option = Array.from(document.querySelectorAll("option"))
const options = document.querySelector("option")
//console.log(option);
const select = document.querySelector(".form-select")
const go = document.querySelector("#go")
//console.log(select.value);


select.addEventListener("change", ()=>{
    // if(select.value){
    //     getWeather();
    // }
    go.click()
})

go.addEventListener("click", (e)=>{
    if(select.value){
        getWeather();
    }
})


const getWeather = async () =>{
    const URL = "https://api.openweathermap.org/data/2.5/"
    const apiKey= "2a593cca2507cce399c056cfcd13534b"
    const cityName = option[select.value].innerText;
    let getURL = `${URL}weather?q=${cityName}&appid=${apiKey}&units=metric&lang=tr`

    try{
        const res = await fetch(getURL);
        //console.log(res);
        if(!res.ok){
            throw new Error("Something went wrong")
        }
        const data = await res.json()

        document.querySelector(".durum").innerHTML=`
        <div class="row justify-content-center ">
            <div class="card shadow p-2 bg-white rounded " style="width: 18rem;">
                <img src="./img/${data.weather[0].icon}.png" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">${data.weather[0].description.toUpperCase()}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${new Date().toLocaleTimeString()}</li>
                    <li class="list-group-item">Sıcaklık: ${Math.round(data.main.temp)}°C</li>
                    <li class="list-group-item">Hissedilen Sıcaklık: ${Math.round(data.main.feels_like)}°C</li>
                    <li class="list-group-item">En Yüksek Sıcaklık: ${Math.round(data.main.temp_max)}°C</li>
                    <li class="list-group-item">En Düşük Sıcaklık: ${Math.round(data.main.temp_min)}°C</li>
                    <li class="list-group-item">Nem: ${data.main.humidity}%</li>
                    <li class="list-group-item">Hava Kapalılık Oranı: ${data.clouds.all}%</li>
                    <li class="list-group-item">Rüzgar Hızı: ${data.wind.speed}km/s</li>
                </ul>
            </div>
        </div>
        `

    }catch(error){
        console.log(error);
    }
}