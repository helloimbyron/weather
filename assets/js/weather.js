
import { weather_data } from './data.js';

const menuCiudades = document.querySelector('#dropdownMenuButton');
const contenedor = document.querySelector('.list-group');
const cargarButon = document.querySelector('#loadinfo');
const opcionCiudad = document.querySelector('#city')
const ciudades = [];
const elementosHTML = [];
const iconoAmarillo = ['brightness_medium', 'thunderstorm', 'bolt'];
// const iconoAzul = ['water_drop', 'cloud'];

let crearCiudad = () => {
  for (const elemento of weather_data) {
    ciudades.push(elemento.city.toLocaleLowerCase())
  };

  for (const ciudad of ciudades) {
    const nodo = document.createElement('option');
    nodo.innerHTML = `${ciudad}`;
    nodo.className = 'dropdown-item';
    nodo.value = `${ciudad}`;
    elementosHTML.push(nodo);
  };
  
  menuCiudades.append(...elementosHTML);

};

function agregarHoyHTML(arregloId, arregloDatos) {
  if (arregloId.length === arregloDatos.length) {
    let contador = 0;
    for (let id of arregloId) {
      document.querySelector(`${id}`).innerHTML = `${arregloDatos[contador]}`;
      contador++;
    };
  };
};

function agregarSemanaHTML({text, date, temperature, icon}) {

  const min = cambiarSigno(temperature.min);
  const max = cambiarSigno(temperature.max);
  const colorIcon = (iconoAmarillo.includes(icon)) ? 'sunny': 'rainy';

  const html = `
  <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
    <div class="d-flex flex-column">
      <h6 class="mb-1 text-dark font-weight-bold text-sm">${text}</h6>
      <span class="text-xs">${date}</span>
    </div>
    <div class="d-flex align-items-center ">
      <span class="font-weight-bold text-dark mx-2">${min}</span> |  <span class="text-dark mx-2">${max}</span>
      <div class="ms-4"><i class="material-icons fs-2 me-1 ${colorIcon}">${icon}</i></div>
    </div>
  </li>
  `;

  contenedor.innerHTML += html;

};

function eliminarListaHTML() {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  };
};

function cambiarSigno(celsius) {
  return celsius.replace('℃', 'ºC');
};

let loadDayForecastData = (opcion) => {

  const {city: ciudad, date: fecha, maxtemperature: max, mintemperature: min, cloudiness: nube, wind: viento, rainfall: lluvia, forecast_today: hoy} = weather_data[opcion];
  const principalId = ['#city', '#date', '#maxtemperature', '#mintemperature', '#cloudiness', '#wind', '#rainfall'];
  const principalDatos = [ciudad, fecha, cambiarSigno(max), cambiarSigno(min), nube, viento, lluvia];
  agregarHoyHTML(principalId, principalDatos);
  
  const {icon: icono_tarde, temperature: temperatura_tarde, forecast: pronostico_tarde, text: texto_tarde} = hoy[0];
  const tardeId = ['#late_icon', '#late_temperature', '#late_forecast', '#late_text'];
  const tardeDatos = [icono_tarde, cambiarSigno(temperatura_tarde), pronostico_tarde, texto_tarde];
  agregarHoyHTML(tardeId, tardeDatos);
  
  const {icon: icono_noche, temperature: temperatura_noche, forecast: pronostico_noche, text: texto_noche} = hoy[1];
  const nocheId = ['#night_icon', '#night_temperature', '#night_forecast', '#night_text'];
  const nocheDatos = [icono_noche, cambiarSigno(temperatura_noche), pronostico_noche, texto_noche];
  agregarHoyHTML(nocheId, nocheDatos);

};

let loadWeekForecastData = (opcion) => {
  const {forecast_week: semana} = weather_data[opcion];
  for (const dia of semana) {
    agregarSemanaHTML(dia);
  };
};

menuCiudades.addEventListener('change', evento => {
  const opcion = ciudades.indexOf(evento.target.value);
  if (opcion >= 0) {
    eliminarListaHTML();
    loadDayForecastData(opcion);
  };
});

cargarButon.addEventListener('click', () => {
  const opcion = ciudades.indexOf(opcionCiudad.innerHTML.toLowerCase());
  if (opcion >= 0) {
    eliminarListaHTML();
    loadWeekForecastData(opcion);
  };
});

crearCiudad();
document.addEventListener('DOMContentLoaded', loadDayForecastData(0));
