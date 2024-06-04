let contenedor = document.querySelector(".flex-cont");
let form = document.querySelector(".formulario form");
let ciudadInput = document.querySelector(".ciudad-input");
let paisInput = document.querySelector(".paises");

let mostrarDatos = (data) => {
    const { name, main: { temp, temp_min, temp_max }, weather: [arr] } = data;

    let nom_ciudad = document.querySelector(".ciudad-nombre");
    let temperatura_actual = document.querySelector(".clima-api");
    let temp_minima = document.querySelector(".temp-min");
    let temp_maxima = document.querySelector(".temp-max");
    let icono = document.querySelector (".icon")

    if (nom_ciudad && temperatura_actual && temp_minima && temp_maxima) {
        nom_ciudad.innerHTML = name;
        temperatura_actual.innerHTML = `${temp} °C`;
        temp_minima.innerHTML = `${temp_min} °C`;
        temp_maxima.innerHTML = `${temp_max} °C`;
        icono.src = `https://openweathermap.org/img/wn/${arr.icon}@2x.png`;


    } else {
        alert("Error: No se encontraron elementos para mostrar los datos.");
    }
}

let llamarApi = (ciudad, pais) => {

    let api_key = '0c07801a96a89a03eb505581e06bd207';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${api_key}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.cod === 200) {
                mostrarDatos(data);
            } else {
                alert(`Error: ${data.message}`);
            }
        })
        .catch(error => {
            console.log("Ocurrió un error: " + error);
        });

}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    let ciudad = ciudadInput.value;
    let pais = paisInput.value;
    llamarApi(ciudad, pais);
});