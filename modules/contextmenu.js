import 'ol-contextmenu/dist/ol-contextmenu.css';
import ContextMenu from 'ol-contextmenu';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import * as util from 'dawa-util';
import * as vis from '/modules/vis';
import 'babel-polyfill';
import 'whatwg-fetch';

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
  centrer(obj.coordinate);
}

function centrer(koordinater) {
  mapcm.getView().animate({
    duration: 700,
    center: koordinater
  });
}

function koordinater(obj) {
  let tekst= '(' + obj.coordinate[0] + ', ' + obj.coordinate[1] + ')'; 
  popupcm.show(obj.coordinate, tekst);
  navigator.permissions.query({name: "clipboard-write"}).then(result => {
    if (result.state == "granted" || result.state == "prompt") {
      navigator.clipboard.writeText(tekst);
    }
  });
}

function initMenuItems() {  
  contextmenu.clear(); 
  let menuItem= {};
  menuItem.text= "Centrer kort her";
  menuItem.callback= center;
  menuItem.classname= 'bold';
  contextmenu.push(menuItem);
}

async function hvor(coordinate) {
  initMenuItems();

  let menuItem= {};
  menuItem.text= "Koordinater: " + '(' + coordinate[0] + ', ' + coordinate[1] + ')';
  menuItem.callback= koordinater;
  menuItem.classname= 'bold';
  contextmenu.push(menuItem);
  contextmenu.push('-');

  let promises= []
    , danMenuItems= [];

  // adgangsadresse
  promises.push(() => {return fetch(util.danUrl("https://dawa.aws.dk/adgangsadresser/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemAdgangsadresse);

  // navngiven vej
  promises.push(() => {return fetch(util.danUrl("https://dawa.aws.dk/navngivneveje",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemNavngivenvej);

  // vejstykke
  promises.push(() => {return fetch(util.danUrl("https://dawa.aws.dk/vejstykker/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemVejstykke);

  // bygning
  promises.push(() => {return fetch(util.danUrl("https://dawa.aws.dk/bygninger",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemBygning);

  // jordstykke
  promises.push(() => {return fetch(util.danUrl("https://dawa.aws.dk/jordstykker/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemJordstykke);

  // sogn
  promises.push(() => {return fetch(util.danUrl("https://dawa.aws.dk/sogne/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemData("Sogn", 'sogne'));

  // supplerende bunavn
  promises.push(() => {return fetch(util.danUrl("https://dawa.aws.dk/supplerendebynavne2",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemSupplerendeBynavn);

  // postnummer
  promises.push(() => {return fetch(util.danUrl("https://dawa.aws.dk/postnumre/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemPostnummer);

  // kommune
  promises.push(() => {return fetch(util.danUrl("https://dawa.aws.dk/kommuner/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemData("Kommune", 'kommuner'));

  // region
  promises.push(() => {return fetch(util.danUrl("https://dawa.aws.dk/regioner/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemData("Region",'regioner'));

  // retskreds
  promises.push(() => {return fetch(util.danUrl("https://dawa.aws.dk/retskredse/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemData("Retskreds", 'retskredse'));

  // politikreds
  promises.push(() => {return fetch(util.danUrl("https://dawa.aws.dk/politikredse/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemData("Politikreds", 'politikredse'));

  // afstemningsområde
  promises.push(() => {return fetch(util.danUrl("https://dawa.aws.dk/afstemningsomraader/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemAfstemningsområde);

  // opstillingskreds
  promises.push(() => {return fetch(util.danUrl("https://dawa.aws.dk/opstillingskredse/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemData("Opstillingskreds", 'opstillingskredse'));

  // storkreds
  promises.push(() => {return fetch(util.danUrl("https://dawa.aws.dk/storkredse/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemStorkreds);

  // valglandsdel
  promises.push(() => {return fetch(util.danUrl("https://dawa.aws.dk/valglandsdele/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemValglandsdel);

  // stednavne
  promises.push(() => {return fetch(util.danUrl("https://dawa.aws.dk/stednavne",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemStednavne);

  // Promise.all(promises) 
  // .catch(function (error) {
  //   alert(error.message);
  // })
  // .then(function(responses) {      
  //   for (var i= responses.length-1; i>=0; i--) {
  //     if (responses[i].ok) {
  //       responses[i]= responses[i].json();
  //     }
  //     else {
  //       responses.splice(i, 1);
  //       promises.splice(i, 1);
  //     }
  //   }
  //   return Promise.all(responses);
  // })
  // .then(function(data) {
  //   if (data.length === 0) return;
  //   for(let i=0; i<data.length; i++) {
  //     promises[i].danMenuItem(data[i]);
  //   } 
  // });

  // Prøv at tilpas Babel til at håndtere async/await. 
  // Se eventuelt på https://babeljs.io/
  // og https://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined

  const maxsamtidige= 10;
  let start= 0;
  let responses= [];
  while (start < promises.length) {
    let stop= start+maxsamtidige<promises.length?start+maxsamtidige:promises.length;
    for (let i= start; i < stop; i++) promises[i]= promises[i]();
    responses= responses.concat(await Promise.all(promises.slice(start, start+maxsamtidige))); 
    start= start+maxsamtidige;
  }
  for (var i= responses.length-1; i>=0; i--) {
    if (!responses[i].ok) {
      responses.splice(i, 1);
      danMenuItems.splice(i, 1);
    }
  }
  start= 0;
  let data= [];
  while (start < responses.length) {
    var stop= start+maxsamtidige<responses.length?start+maxsamtidige:responses.length;
    for (let i= start; i < stop; i++) {
      responses[i]= responses[i].json();
      //console.log('i: ' + i + ', start: ' + start + ', stop: ' + stop);
    }
    data= data.concat(await Promise.all(responses.slice(start, start+maxsamtidige))); 
    for(let i=start; i<stop; i++) {
      danMenuItems[i](data[i]);
    } 
    start= start+maxsamtidige;
  }
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

function danMenuItemAdgangsadresse(data) {
  let menuItem= {};
  menuItem.text= "Adgangsadresse: " +  util.formatAdgangsadresse(data,false);
  menuItem.callback= danVisAdgangsadresse(sourcecm);
  menuItem.data= data;
  contextmenu.push(menuItem);
}

function danVisAdgangsadresse(source) {
  return function (data) { 
    centrer(data.data.adgangspunkt.koordinater);    
    vis.visAdgangsadresse(source, data.data);
  }
}

function danMenuItemNavngivenvej(data) {
  let menuItem= {};
  menuItem.text= "Navngivenvej: " + data[0].navn;
  menuItem.callback= danVisNavngivenvej(sourcecm);
  menuItem.data= data[0];
  contextmenu.push(menuItem);
}

function danVisNavngivenvej(source) {
  return function (data) {
    fetch(data.data.href+'?srid=25832&format=geojson&struktur=nestet').then( function(response) {
      response.json().then( function ( navngivenvej ) { 
        vis.visNavngivenvej(source, navngivenvej);
      });
    });
  };
}

function danMenuItemVejstykke(data) {
  let menuItem= {};
  menuItem.text= "Vejstykke: " + data.navn + '(' + data.kode;
  menuItem.callback= danVisVejstykke(sourcecm);
  menuItem.data= data;
  contextmenu.push(menuItem);
}

function danVisVejstykke(source) {
  return function (data) {    
    vis.visVejstykke(source, data.data);
  }
}

function danMenuItemBygning(data) {
  for (var i= 0; i < data.length; i++) {
    let menuItem= {};
    menuItem.text= data[i].bygningstype;
    menuItem.data= data[i];
    menuItem.callback= visBygning;
    contextmenu.push(menuItem);
  }
}

function visBygning(data) {  
  var bygning = new Feature();        
  //bygning.setStyle(markerstyle('red'));
  bygning.setGeometry(new Polygon(data.data.geometry.coordinates));
  bygning.setProperties({data: data.data, popupTekst: bygningPopupTekst(data.data.properties)});
  sourcecm.addFeature(bygning);
}

function bygningPopupTekst(data) {
  return function () {
    return '<p><a href="' + data.href.replace('dawa', 'info') + '"  target="_blank">' + data.bygningstype + '</a></p>'
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
  menuItem.text= "Jordstykke: " + data.matrikelnr + " " + data.ejerlav.navn;
  menuItem.callback= danVisJordstykke(sourcecm);
  menuItem.data= data;
  contextmenu.push(menuItem);
}

function danVisJordstykke(source) {
  return function (data) {    
    vis.visJordstykke(source, data.data);
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
    menuItem.callback= danVis(sourcecm, titel);
    menuItem.data= data;
    contextmenu.push(menuItem);
  }
}

function danVis(source, titel) {
  return function (data) {    
    vis.vis(source, data.data, titel);
  }
}