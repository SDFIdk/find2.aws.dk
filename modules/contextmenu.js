import 'ol-contextmenu/dist/ol-contextmenu.css';
import ContextMenu from 'ol-contextmenu';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import * as util from 'dawa-util';

var mapcm, popupcm, sourcecm;

var contextmenu_items = [];

const contextmenu = new ContextMenu({
  width: 350,
  items: contextmenu_items
});

export function getContextMenu(map, popup, source) {
  mapcm= map;
  popupcm=popup;
  sourcecm= source;
  return contextmenu;
}

contextmenu.on('open', function (evt) {
  evt.coordinate[0]= Math.round(evt.coordinate[0]*1000)/1000;
  evt.coordinate[1]= Math.round(evt.coordinate[1]*1000)/1000;
  hvor(evt.coordinate);
});

function center(obj) {
  mapcm.getView().animate({
    duration: 700,
    center: obj.coordinate
  });
}

function koordinater(obj) { 
  popupcm.show(obj.coordinate, '(' + obj.coordinate[0] + ', ' + obj.coordinate[1] + ')');
}

function initMenuItems() {  
  contextmenu.clear(); 
  let menuItem= {};
  menuItem.text= "Centrer kort her";
  menuItem.callback= center;
  menuItem.classname= 'bold';
  contextmenu.push(menuItem);
  contextmenu.push('-');
}

function hvor(coordinate) {
  initMenuItems();

  let menuItem= {};
  menuItem.text= "Koordinater: " + '(' + coordinate[0] + ', ' + coordinate[1] + ')';
  menuItem.callback= koordinater;
  menuItem.classname= 'bold';
  contextmenu.push(menuItem);

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

  // supplerende bunavn
  promises.push(fetch(util.danUrl("https://dawa.aws.dk/supplerendebynavne2",{x:coordinate[0], y: coordinate[1], srid: 25832})));
  promises[antal].danMenuItem= danMenuItemSupplerendeBynavn;
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

function danMenuItemSupplerendeBynavn(data) {
  if (data.length > 0) {
    let menuItem= {};
    menuItem.text= "Supplerende bynavn: " +  data[0].navn;
    contextmenu.push(menuItem);
  }
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
  sourcecm.addFeature(jordstykke);
}

function jordstykkePopupTekst(data) {
  return function () {
    return '<p><a href="' + data.href.replace('dawa', 'info') + '"  target="_blank">Jordstykke: ' + data.matrikelnr + " " + data.ejerlav.navn + '</a></p>'
  } 
}

function danMenuItemStednavne(data) {
  for (var i= 0; i<data.length;i++) {
    let menuItem= {};
    menuItem.text= capitalizeFirstLetter(data[i].undertype) + ": " + data[i].navn;
    contextmenu.push(menuItem);
  }
}

function danMenuItemData(titel) {
  return function (data) { 
    let menuItem= {};
    menuItem.text= titel + ": " + data.navn + " (" + data.kode + ")";
    contextmenu.push(menuItem);
  }
}


