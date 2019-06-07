import 'ol/ol.css';
import 'ol-layerswitcher/src/ol-layerswitcher.css';
import 'ol-contextmenu/dist/ol-contextmenu.css';
import 'ol-popup/src/ol-popup.css';
import './style.css';
import {Map} from 'ol';
import Feature from 'ol/Feature';
import {Vector as VectorSource} from 'ol/source';
import {Vector as VectorLayer} from 'ol/layer';
import GeoJSON from 'ol/format/GeoJSON.js';
import Point from 'ol/geom/Point';
import Polygon from 'ol/geom/Polygon';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import LayerSwitcher from 'ol-layerswitcher';
import ContextMenu from 'ol-contextmenu';
import {defaults as defaultControls} from 'ol/control';
import Select from 'ol/interaction/Select.js';
import {AddressSearchControl} from '/modules/AddressSearchControl';
import * as kort from '/modules/kort';
import * as geolocation from '/modules/geolocation';
import Popup from 'ol-popup';
import * as util from 'dawa-util';

const map = new Map({
  target: 'map',
  layers: [kort.baggrundskort, kort.lag],
  loadTilesWhileAnimating: true,
  view: kort.view, 
  controls: defaultControls().extend([
    new AddressSearchControl({selected: selected}),
    new LayerSwitcher()
  ]),
});

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
    let data= features.getArray()[0].getProperties()['data'];
    let popupTekst= features.getArray()[0].getProperties()['popupTekst'];
    //alert('href: ' + features.getArray()[0].getProperties()['href'] );
    popup.show(e.mapBrowserEvent.coordinate, popupTekst())
    href;
  }
  features.clear(); // deselect feature
});

function flyTo(location, view, done) {
  var duration = 4000;
  var zoom = view.getZoom();
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
    zoom: 4,
    duration: duration / 2
  }, {
    zoom: zoom,
    duration: duration / 2
  }, callback);
}

function markerstyle(color) {
  const style=
    new Style({
      image: new CircleStyle({radius: 4, fill: new Fill({color: color}), stroke: new Stroke({color: color, width: 1})})
    });
  return style;
}

function selected(control) {
  return function (event) {
    fetch(event.data.href+'?srid=25832').then( function(response) {
      response.json().then( function ( adgangsadresse ) {
        // var x= adgangsadresse.adgangspunkt.koordinater[1]
        //   , y= adgangsadresse.adgangspunkt.koordinater[0];
        // var marker= L.circleMarker(L.latLng(x, y), {color: 'red', fillColor: 'red', stroke: true, fillOpacity: 1.0, radius: 4, weight: 2, opacity: 1.0}).addTo(map);//defaultpointstyle);
        // var popup= marker.bindPopup(L.popup().setContent("<a href='https://info.aws.dk/adgangsadresser?id="+adgangsadresse.id+"'>" + dawautil.formatAdgangsadresse(adgangsadresse) + "</a>"),{autoPan: true});
        // if (adgangsadresse.vejpunkt) {
        //   var vx= adgangsadresse.vejpunkt.koordinater[1]
        //     , vy= adgangsadresse.vejpunkt.koordinater[0];
        //   var vpmarker= L.circleMarker(L.latLng(vx, vy), {color: 'blue', fillColor: 'blue', stroke: true, fillOpacity: 1.0, radius: 4, weight: 2, opacity: 1.0}).addTo(map);//defaultpointstyle);
        //   vpmarker.bindPopup(L.popup().setContent("<a href='https://info.aws.dk/adgangsadresser?id="+adgangsadresse.id+"'>" + dawautil.formatAdgangsadresse(adgangsadresse) + "</a>"),{autoPan: true});
        // }
        let map= control.getMap();
        let view= map.getView();
        flyTo(adgangsadresse.adgangspunkt.koordinater, view, function() {});
        //view.animate({center: adgangsadresse.adgangspunkt.koordinater, duration: 12000});
        //popup.openPopup();
        var adgangspunkt = new Feature();        
        adgangspunkt.setStyle(markerstyle('red'));
        adgangspunkt.setGeometry(new Point(adgangsadresse.adgangspunkt.koordinater));
        adgangspunkt.setProperties({data: adgangsadresse, popupTekst: adgangsadressePopupTekst(adgangsadresse)});
        addressSource.addFeature(adgangspunkt);

        var vejpunkt = new Feature();     
        vejpunkt.setStyle(markerstyle('blue'));
        vejpunkt.setGeometry(new Point(adgangsadresse.vejpunkt.koordinater));
        vejpunkt.setProperties({data: adgangsadresse, popupTekst: adgangsadressePopupTekst(adgangsadresse)});
        addressSource.addFeature(vejpunkt);
      });
    });
  }
}

function adgangsadressePopupTekst(data) {
  return function () {
    return '<p><a href="' + data.href.replace('dawa', 'info') + '"  target="_blank">' + util.formatAdgangsadresse(data,false) + '</a></p>'
  } 
}

var contextmenu_items = [
  {
    text: 'Center map here',
    classname: 'bold',
    callback: center
  },
  {
    text: 'Some Actions',
    items: [
      {
        text: 'Center map here',
        callback: center
      },
      {
        text: 'Add a Marker'
      }
    ]
  },
  {
    text: 'Add a Marker'
  },
  '-' // this is a separator
];

var contextmenu = new ContextMenu({
  width: 350,
  items: contextmenu_items
});
map.addControl(contextmenu);


contextmenu.on('open', function (evt) {
  hvor(evt.coordinate);
});

map.on('pointermove', function (e) {

  var pixel = map.getEventPixel(e.originalEvent);
  var hit = map.hasFeatureAtPixel(pixel);

  if (e.dragging) return;

  map.getTargetElement().style.cursor = hit ? 'pointer' : '';
});

// from https://github.com/DmitryBaranovskiy/raphael
function elastic(t) {
  return Math.pow(2, -10 * t) * Math.sin((t - 0.075) * (2 * Math.PI) / 0.3) + 1;
}

function center(obj) {
  map.getView.animate({
    duration: 700,
    easing: elastic,
    center: obj.coordinate
  });
}

function hvor(coordinate) {
  contextmenu.clear();
  var antal= 0;
  var promises= [];

  // jordstykke
  promises.push(fetch(util.danUrl("https://dawa.aws.dk/jordstykker/reverse",{x:coordinate[0], y: coordinate[1], format: 'geojson', struktur: 'nestet', srid: 25832})));
  promises[antal].danMenuItem= danMenuItemJordstykke;
  antal++;

  // sogn
  promises.push(fetch(util.danUrl("https://dawa.aws.dk/sogne/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832})));
  promises[antal].danMenuItem= danMenuItemData("Sogn", 'sogne');
  antal++;

  // postnummer
  promises.push(fetch(util.danUrl("https://dawa.aws.dk/postnumre/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832})));
  promises[antal].danMenuItem= danMenuItemPostnummer;
  antal++;

  // kommune
  promises.push(fetch(util.danUrl("https://dawa.aws.dk/kommuner/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832})));
  promises[antal].danMenuItem= danMenuItemData("Kommune", 'kommuner');
  antal++;

  // region
  promises.push(fetch(util.danUrl("https://dawa.aws.dk/regioner/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832})));
  promises[antal].danMenuItem= danMenuItemData("Region",'regioner');
  antal++;

  // retskreds
  promises.push(fetch(util.danUrl("https://dawa.aws.dk/retskredse/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832})));
  promises[antal].danMenuItem= danMenuItemData("Retskreds", 'retskredse');
  antal++;

  // politikreds
  promises.push(fetch(util.danUrl("https://dawa.aws.dk/politikredse/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832})));
  promises[antal].danMenuItem= danMenuItemData("Politikreds", 'politikredse');
  antal++;

  // afstemningsområde
  promises.push(fetch(util.danUrl("https://dawa.aws.dk/afstemningsomraader/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832})));
  promises[antal].danMenuItem= danMenuItemAfstemningsområde;
  antal++;

  // opstillingskreds
  promises.push(fetch(util.danUrl("https://dawa.aws.dk/opstillingskredse/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832})));
  promises[antal].danMenuItem= danMenuItemData("Opstillingskreds", 'opstillingskredse');
  antal++;

  // storkreds
  promises.push(fetch(util.danUrl("https://dawa.aws.dk/storkredse/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832})));
  promises[antal].danMenuItem= danMenuItemStorkreds;
  antal++;

  // valglandsdel
  promises.push(fetch(util.danUrl("https://dawa.aws.dk/valglandsdele/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832})));
  promises[antal].danMenuItem= danMenuItemValglandsdel;
  antal++;

  // stednavne
  promises.push(fetch(util.danUrl("https://dawa.aws.dk/stednavne",{x:coordinate[0], y: coordinate[1], srid: 25832})));
  promises[antal].danMenuItem= danMenuItemStednavne;
  antal++;

  Promise.all(promises) 
  .catch(function (error) {
    alert(error.message);
  })
  .then(function(responses) {      
    for (var i= responses.length-1; i>=0; i--) {
      if (responses[i].ok) {
        responses[i]= responses[i].json();
      }
      else {
        responses.splice(i, 1);
        promises.splice(i, 1);
      }
    }
    return Promise.all(responses);
  })
  .then(function(data) {
    if (data.length === 0) return;
    for(let i=0; i<data.length; i++) {
      promises[i].danMenuItem(data[i]);
    } 
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function danMenuItemPostnummer(data) {
  let menuItem= {};
  menuItem.text= "Postnummer: " +  data.nr + " " + data.navn;
  contextmenu.push(menuItem);
}

function danMenuItemAfstemningsområde(data) {
  let menuItem= {};
  menuItem.text= "Afstemningsområde: " + data.navn + " (" +data.nummer + ")";
  contextmenu.push(menuItem);
}

function danMenuItemStorkreds(data) {
  let menuItem= {};
  menuItem.text= "Storkreds: " + data.navn + " (" + data.nummer + ")";
  contextmenu.push(menuItem);
}

function danMenuItemValglandsdel(data) {
  let menuItem= {};
  menuItem.text= "Valglandsdel: " + data.navn + " (" + data.bogstav + ")";
  contextmenu.push(menuItem);
}

function danMenuItemJordstykke(data) {
  let menuItem= {};
  menuItem.text= "Jordstykke: " + data.properties.matrikelnr + " " + data.properties.ejerlav.navn;
  menuItem.callback= visJordstykke;
  menuItem.data= data;
  contextmenu.push(menuItem);
}

function visJordstykke(data) {  
  var jordstykke = new Feature();        
  //jordstykke.setStyle(markerstyle('red'));
  jordstykke.setGeometry(new Polygon(data.data.geometry.coordinates));
  jordstykke.setProperties({data: data.data, popupTekst: jordstykkePopupTekst(data.data.properties)});
  addressSource.addFeature(jordstykke);
}

function jordstykkePopupTekst(data) {
  return function () {
    return '<p><a href="' + data.href.replace('dawa', 'info') + '"  target="_blank">Jordstykke: ' + data.matrikelnr + " " + data.ejerlav.navn + '</a></p>'
  } 
}

function danMenuItemStednavne(data) {
  let tekst= '';
  for (var i= 0; i<data.length;i++) {
    let menuItem= {};
    menuItem.text= capitalizeFirstLetter(data[i].undertype) + ": " + data[i].navn;
    contextmenu.push(menuItem);
  }
}

function danMenuItemData(titel,id) {
  return function (data) { 
    let menuItem= {};
    menuItem.text= titel + ": " + data.navn + " (" + data.kode + ")";
    contextmenu.push(menuItem);
  }
}


