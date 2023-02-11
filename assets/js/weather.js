
import { weather_data } from './data.js';

const menu = document.querySelector('#dropdownMenuButton');
const ciudades = [];

let crearCiudad = () => {

  for (let elemento of weather_data) {
    ciudades.push(elemento.city.toLocaleLowerCase())
  };

  const elementosHTML = [];

  for (let ciudad of ciudades) {
    const nodo = document.createElement('option');
    nodo.innerHTML = `${ciudad}`;
    // nodo.dataset.id = `${ciudad.toLocaleLowerCase()}`;
    nodo.className = 'dropdown-item';
    nodo.value = `${ciudad}`;
    elementosHTML.push(nodo);
  };
  
  menu.append(...elementosHTML);

};

crearCiudad();

let loadDayForecastData = (opcion) => {

  function agregarHTML(arregloId, arregloDatos) {
    if (arregloId.length === arregloDatos.length) {
      let contador = 0;
      for (let id of arregloId) {
        document.querySelector(`${id}`).innerHTML = `${arregloDatos[contador]}`;
        contador++;
      };
    };
  };
	
  const {city: ciudad, date: fecha, maxtemperature: max, mintemperature: min, cloudiness: nube, wind: viento, rainfall: lluvia, forecast_today: hoy} = weather_data[opcion];
  const principalId = ['#city', '#date', '#maxtemperature', '#mintemperature', '#cloudiness', '#wind', '#rainfall'];
  const principalDatos = [ciudad, fecha, max, min, nube, viento, lluvia];
  agregarHTML(principalId, principalDatos);

  const {icon: icono_tarde, temperature: temperatura_tarde, forecast: pronostico_tarde, text: texto_tarde} = hoy[0];
  const tardeId = ['#late_icon', '#late_temperature', '#late_forecast', '#late_text'];
  const tardeDatos = [icono_tarde, temperatura_tarde, pronostico_tarde, texto_tarde];
  agregarHTML(tardeId, tardeDatos);

  const {icon: icono_noche, temperature: temperatura_noche, forecast: pronostico_noche, text: texto_noche} = hoy[1];
  const nocheId = ['#night_icon', '#night_temperature', '#night_forecast', '#night_text'];
  const nocheDatos = [icono_noche, temperatura_noche, pronostico_noche, texto_noche];
  agregarHTML(nocheId, nocheDatos);

};

let loadWeekForecastData = (opcion) => {

  function crearDiaHTML({text, date, temperature, icon}) {

    const html = `
    <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
      <div class="d-flex flex-column">
        <h6 class="mb-1 text-dark font-weight-bold text-sm">${text}</h6>
        <span class="text-xs">${date}</span>
      </div>
      <div class="d-flex align-items-center ">
        <span class="font-weight-bold text-dark mx-2">${temperature.min}</span> |  <span class="text-dark mx-2">${temperature.max}</span>
        <div class="ms-4"><i class="material-icons fs-2 me-1 rainy">${icon}</i></div>
      </div>
    </li>
    `;

    const contenedor = document.querySelector('.list-group');
    contenedor.innerHTML += html;

  };
	
  const {forecast_week: semana} = weather_data[opcion];
  const [dia1, dia2, dia3, dia4, dia5, dia6, dia7] = semana;
  crearDiaHTML(dia1);
  crearDiaHTML(dia2);
  crearDiaHTML(dia3);
  crearDiaHTML(dia4);
  crearDiaHTML(dia5);
  crearDiaHTML(dia6);
  crearDiaHTML(dia7);
	
};

menu.addEventListener('click', evento => {
  console.log(evento.target.value)
  console.log(ciudades.indexOf(evento.target.value))
  
  loadDayForecastData(ciudades.indexOf(evento.target.value));
  loadWeekForecastData(ciudades.indexOf(evento.target.value));


});

// document.addEventListener('DOMContentLoaded', loadDayForecastData);

// const cargarButon = document.querySelector('#loadinfo');
// cargarButon.addEventListener('click', loadWeekForecastData);




