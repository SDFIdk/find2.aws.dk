import 'ol/ol.css';
import 'ol-layerswitcher/src/ol-layerswitcher.css';
import 'ol-popup/src/ol-popup.css';
import './styles/style.css';
import './styles/dawa-autocomplete.css';
import './styles/autocomplete.css';
import 'babel-polyfill';
import 'whatwg-fetch';
import {Map} from 'ol';
import Feature from 'ol/Feature';
import {Vector as VectorSource} from 'ol/source';
import {Vector as VectorLayer} from 'ol/layer';
import Point from 'ol/geom/Point';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import LayerSwitcher from 'ol-layerswitcher';
import {defaults as defaultControls} from 'ol/control';
import Select from 'ol/interaction/Select.js';
import {MultiSearchControl} from '/modules/MultiSearchControl';
import {AddressSearchControl} from '/modules/AddressSearchControl';
import {JordstykkeControl} from '/modules/jordstykkecontrol';
import * as kort from '/modules/kort';
import * as menu from '/modules/contextmenu';
import * as geolocation from '/modules/geolocation';
import Popup from 'ol-popup';
import * as util from 'dawa-util';
import * as vis from '/modules/vis';


const ressourcer= [
  {navn: 'Adresser', selected: adresseSelected},
  {navn: 'Adgangsadresser', selected: adgangsadresseSelected},
  {navn: 'Jordstykker', selected: jordstykkeSelected},
  {navn: 'Vejstykker'}
]

const map = new Map({
  target: 'map',
  layers: [kort.baggrundskort, kort.lag],
  loadTilesWhileAnimating: true,
  view: kort.view, 
  controls: defaultControls().extend([
    new MultiSearchControl(ressourcer),
    //new AddressSearchControl({selected: addressSelected}),
    //new JordstykkeControl({selected: jordstykkeSelected}),
    new LayerSwitcher()
  ]),
});

document.getElementsByClassName('input')[0].focus();

geolocation.show(map);

const addressSource= new VectorSource();
const addressLayer= new VectorLayer({source: addressSource});
map.addLayer(addressLayer);

var popup= new Popup();
map.addOverlay(popup);

const select= new Select();
map.addInteraction(select);
select.on('select', function(e) {
  let features= e.target.getFeatures();
  if (features.getLength() > 0) {
    let href= features.getArray()[0].getProperties()['href'];
    // let data= features.getArray()[0].getProperties()['data'];
    let popupTekst= features.getArray()[0].getProperties()['popupTekst'];
    //alert('href: ' + features.getArray()[0].getProperties()['href'] );
    popup.show(e.mapBrowserEvent.coordinate, popupTekst())
    href;
  }
  features.clear(); // deselect feature
});

map.on('pointermove', function (e) {

  var pixel = map.getEventPixel(e.originalEvent);
  var hit = map.hasFeatureAtPixel(pixel);

  if (e.dragging) return;

  map.getTargetElement().style.cursor = hit ? 'pointer' : '';
  //console.log(hit + ', ' + map.getTargetElement().style.cursor)
});

function beregnAfstand(location1, location2) {
  let l= Math.sqrt(Math.pow(location1[0]-location2[0], 2) + Math.pow(location1[0]-location2[0], 2));
  return l;
}

function beregnZoomniveau(afstand, zoom) {
  let z= 3;
  if (afstand < 1000) z= 13;
  else if (afstand < 1500) z= 12;
  else if (afstand < 2000) z= 11;
  else if (afstand < 5000) z= 10;
  else if (afstand < 9000) z= 9;
  else if (afstand < 11000) z= 8;
  else if (afstand < 13000) z= 7;
  else if (afstand < 50000) z= 6;
  else if (afstand < 75000) z= 5;
  else if (afstand < 100000) z= 4;
  return (z > zoom)?zoom:z;
}

function beregnVarighed(afstand) {
  let v= 4000;
  if (afstand < 500) v= 100;
  else if (afstand < 2500) v= 1500;
  else if (afstand < 5000) v= 1750;
  else if (afstand < 7500) v= 2000;
  else if (afstand < 10000) v= 2500;
  else if (afstand < 12500) v= 3000;
  else if (afstand < 15000) v= 3500;
  return v;
}

function flyTo(location, view, done) {
  let afstand= beregnAfstand(location, view.getCenter());
  var duration = beregnVarighed(afstand);
  var zoom = view.getZoom();
  //console.log('Afstand: ' + afstand + 'Zoom start: ' + zoom);
  var parts = 2;
  var called = false;
  function callback(complete) {
    --parts;
    if (called) {
      return;
    }
    if (parts === 0 || !complete) {
      called = true;
      done(complete);
    }
  }
  view.animate({
    center: location,
    duration: duration
  }, callback);
  view.animate({
    zoom: beregnZoomniveau(afstand,zoom),
    duration: duration / 2
  }, {
    zoom: zoom,
    duration: duration / 2
  }, callback);
}

async function adgangsadresseSelected(event) {
  let response= await fetch(event.data.href+'?srid=25832');
  let adgangsadresse= await response.json();
  let view= map.getView();
  flyTo(adgangsadresse.adgangspunkt.koordinater, view, function() {});
  vis.visAdgangsadresse(addressSource, adgangsadresse);
}

function adresseSelected(event) {
  fetch(event.data.href+'?srid=25832').then( function(response) {
    response.json().then( function ( adresse ) {
      let view= map.getView();
      flyTo(adresse.adgangsadresse.adgangspunkt.koordinater, view, function() {});
      vis.visAdresse(addressSource, adresse);
    });
  });
}

function jordstykkeSelected(valgt) {
  fetch(valgt.jordstykke.href+'?format=geojson&struktur=nestet&srid=25832').then( function(response) {
    response.json().then( function ( data ) {
      if (data.geometri || data.features && data.features.length === 0) {
            alert('Søgning gav intet resultat');
            return;
      }
      flyTo(data.properties.visueltcenter, map.getView(), function() {});
      vis.visJordstykke(addressSource, data);
    });
  });
}

map.addControl(menu.getContextMenu(map, popup, addressSource));
