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
import Polygon from 'ol/geom/Polygon';
import MultiLineString from 'ol/geom/MultiLineString';
import MultiPolygon from 'ol/geom/MultiPolygon';
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
  {navn: 'Adresser', selected: adresseSelected, init: false},
  {navn: 'Adgangsadresser', selected: adgangsadresseSelected, init: true},
  {navn: 'Vejstykker', selected: vejstykkeSelected, init: false},
  {navn: 'Supplerende bynavne', selected: supplerendeBynavnSelected, init: false},
  {navn: 'Postnumre', selected: showSelected('Postnummer'), init: false}, 
  {navn: 'Byer', selected: bySelected, init: false}, 
  {navn: 'Jordstykker', selected: showSelected('Jordstykke'), init: false},
  {navn: 'Ejerlav', selected: showSelected('Ejerlav'), init: false},
  {navn: 'Sogne', selected: showSelected('Sogn'), init: false},
  {navn: 'Kommuner', selected: showSelected('Kommune'), init: false},
  {navn: 'Regioner', selected: showSelected('Region'), init: false},
  {navn: 'Landsdele', selected: showSelected('Landsdel'), init: false},
  {navn: 'Politikredse', selected: showSelected('Politikreds'), init: false},
  {navn: 'Retskredse', selected: showSelected('Retskreds'), init: false},
  {navn: 'Afstemningsområder', selected: showSelected('Afstemningsområde'), init: false},
  {navn: 'Opstillingskredse', selected: showSelected('Opstillingskreds'), init: false},
  {navn: 'Storkredse', selected: showSelected('Storkreds'), init: false},
  {navn: 'Valglandsdele', selected: showSelected('Valglandsdel'), init: false},
  {navn: 'Menighedsrådsafstemningsområder', selected: showSelected('Menighedsafstemningsområde'), init: false}
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

async function adresseSelected(event) {
  let response= await fetch(event.data.href+'?srid=25832');
  let adresse= await response.json();
  let view= map.getView();
  kort.flyTo(adresse.adgangsadresse.adgangspunkt.koordinater, view, function() {});
  vis.visAdresse(addressSource, adresse);
}

async function adgangsadresseSelected(event) {
  let response= await fetch(event.data.href+'?srid=25832');
  let adgangsadresse= await response.json();
  let view= map.getView();
  kort.flyTo(adgangsadresse.adgangspunkt.koordinater, view, function() {});
  vis.visAdgangsadresse(addressSource, adgangsadresse);
}

function showSelected(titel) {
  return async function (valgt) {
    let response= await fetch(valgt.href+'?format=geojson&struktur=nestet&srid=25832');
    let data= await response.json();
    let klasse= vis.geometriklasse(data);
    kort.flyToGeometry(data.properties.visueltcenter, new klasse(data.geometry.coordinates), map.getView(), function() {});
    vis.vis(addressSource, data, titel);
  }
}

async function vejstykkeSelected(valgt) {
  let response= await fetch(valgt.href+'?format=geojson&struktur=nestet&srid=25832');
  let data= await response.json();
  let klasse= vis.geometriklasse(data);
  kort.flyToGeometry(data.geometry.coordinates[0][0], new klasse(data.geometry.coordinates), map.getView(), function() {}); // to do: hvis vejstykke bliver forsynet med visuelt center, så brug show selected
  vis.vis(addressSource, data, 'Vejstykke');
}

async function supplerendeBynavnSelected(valgt) {
//  fetch(valgt.href+'?format=geojson&struktur=nestet&srid=25832').then( function(response) {
  let response= await fetch('https://dawa-test.aws.dk/supplerendebynavne2/' + valgt.dagi_id + '?format=geojson&struktur=nestet&srid=25832');
  let data= await response.json();
  let klasse= vis.geometriklasse(data);
  kort.flyToGeometry(data.properties.visueltcenter, new klasse(data.geometry.coordinates), map.getView(), function() {});
  vis.vis(addressSource, data, 'Supplerende vejnavn');
}

async function bySelected(valgt) {
  let response= await fetch(valgt.href+'?format=geojson&struktur=nestet&srid=25832');
  let data= await response.json();
  let klasse= vis.geometriklasse(data);
  kort.flyToGeometry(data.properties.sted.visueltcenter, new klasse(data.geometry.coordinates), map.getView(), function() {});
  vis.vis(addressSource, data, 'By');
}

map.addControl(menu.getContextMenu(map, popup, addressSource));
