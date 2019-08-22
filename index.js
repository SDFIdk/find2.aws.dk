import 'ol/ol.css';
import 'ol-layerswitcher/src/ol-layerswitcher.css';
import 'ol-popup/src/ol-popup.css';
import './styles/style.css';
import './styles/dawa-autocomplete.css';
import './styles/autocomplete.css';
import 'babel-polyfill';
import 'whatwg-fetch';
import {Map} from 'ol';
import {Vector as VectorSource} from 'ol/source';
import {Vector as VectorLayer} from 'ol/layer';
import LayerGroup from 'ol/layer/Group';
import LayerSwitcher from 'ol-layerswitcher';
import {defaults as defaultControls} from 'ol/control';
import Select from 'ol/interaction/Select.js';
import {MultiSearchControl} from '/modules/multisearchcontrol';
import * as kort from '/modules/kort';
import * as menu from '/modules/contextmenu';
import * as geolocation from '/modules/geolocation';
import {GeolocationControl} from '/modules/geolocationcontrol';
//import * as kortlink from '/modules/kortlink';
import Popup from 'ol-popup';
import * as vis from '/modules/vis';
import * as futil from '/modules/futil';
import * as util from 'dawa-util';


const ressourcer= [
  {navn: 'Adresser', selected: adresseSelected, init: false},
  {navn: 'Adgangsadresser', selected: adgangsadresseSelected, init: true},
  {navn: 'Vejstykker', selected: vejstykkeSelected, init: false},
  {navn: 'Navngivne veje', selected: showSelected('Navngivne veje'), init: false},
  {navn: 'Supplerende bynavne', selected: supplerendeBynavnSelected, init: false},
  {navn: 'Postnumre', selected: showSelected('Postnummer'), init: false}, 
  {navn: 'Byer', selected: stednavnSelected, init: false},  
  {navn: 'Stednavne', selected: stednavnSelected, init: false}, 
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
  layers: [kort.historiskeOrtofoto, kort.historiskeKort, kort.lag, kort.adresselag, kort.baggrundskort],
  loadTilesWhileAnimating: true,
  view: kort.view, 
  controls: defaultControls().extend([
    new MultiSearchControl(ressourcer),
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
    let feature= features.getArray()[0];
    let data= feature.getProperties()['data'];
    let popupTekst= features.getArray()[0].getProperties()['popupTekst'];
    //alert('href: ' + features.getArray()[0].getProperties()['href'] );
    popup.show(e.mapBrowserEvent.coordinate, popupTekst);
    let fbtn= document.getElementById('fjern');
    if (fbtn) {
      fbtn.onclick=  function(e) { e;
        addressSource.removeFeature(feature);
        popup.hide();
        // if (addressSource.getFeatures().length === 0) {
        //   kortlink.fjernKortlinkControl(map);
        // }
      }
    }
    let kbtn= document.getElementById('kortlink');
    if (kbtn) {
      kbtn.onclick=  function(e) { e;
        navigator.permissions.query({name: "clipboard-write"}).then(result => {
          if (result.state == "granted" || result.state == "prompt") {
            let findkort= 'Skærmkort';
            let baselayers= map.getLayers();
            baselayers.forEach( (element) => {
              if (element instanceof LayerGroup) {
                let layers= element.getLayers();
                layers.forEach((layer) => {
                  let prop= layer.getProperties();
                  if (prop.visible) {
                    findkort= prop.title;
                  }
                })
              };
            });
            let viskort= kort.mapKort(findkort);
            let url= futil.setSubdomain(data.href?data.href:data.properties.href, 'vis') + '?vispopup=true&kort='+viskort;
            navigator.clipboard.writeText(url);
            window.open(url, 'Link_til_kort');
          }
        });
      }
    }
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

map.on('dblclick', function (evt) {
  console.log(evt.coordinate);
  if (!map.hasFeatureAtPixel(evt.pixel)) {
  //if (addressSource.getFeaturesAtCoordinate(evt.coordinate).length === 0) {
    visNærmesteAdgangsadresse(evt.coordinate);
  } 
});

var dawa= futil.getDawaUrl();

async function visNærmesteAdgangsadresse(coordinate) {
  let response= await fetch(util.danUrl(dawa + "/adgangsadresser/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832}));
  let adgangsadresse= await response.json();
  let view= map.getView();
  kort.flyTo(adgangsadresse.adgangspunkt.koordinater, view, function() {});
  vis.visAdgangsadresse(addressSource, adgangsadresse);
}

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
  let response= await fetch(valgt.href+'?format=geojson&struktur=nestet&srid=25832');
//  let response= await fetch('https://dawa-test.aws.dk/supplerendebynavne2/' + valgt.dagi_id + '?format=geojson&struktur=nestet&srid=25832');
  let data= await response.json();
  let klasse= vis.geometriklasse(data);
  kort.flyToGeometry(data.properties.visueltcenter, new klasse(data.geometry.coordinates), map.getView(), function() {});
  vis.vis(addressSource, data, 'Supplerende vejnavn');
}

async function stednavnSelected(valgt) {
  let response= await fetch(valgt.href+'?format=geojson&struktur=nestet&srid=25832');
  let data= await response.json();
  let klasse= vis.geometriklasse(data);
  kort.flyToGeometry(data.properties.sted.visueltcenter, new klasse(data.geometry.coordinates), map.getView(), function() {});
  vis.vis(addressSource, data, futil.capitalizeFirstLetter(data.properties.sted.undertype));
}

map.addControl(menu.getContextMenu(map, popup, addressSource));

// PWA stuff
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swfile= '/service-worker.js';
    navigator.serviceWorker.register(swfile)
      .then((reg) => {
        console.log('Service worker registered.', reg);
      })
      .catch(function (err) {
        console.log('Service Worker registration failed: ', err)
      });
  });
}
