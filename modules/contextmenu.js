import 'ol-contextmenu/dist/ol-contextmenu.css';
import ContextMenu from 'ol-contextmenu';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import * as util from 'dawa-util';
import * as vis from '/modules/vis';
import * as kort from '/modules/kort';
import 'babel-polyfill';
import 'whatwg-fetch';

var mapcm, popupcm, sourcecm;

var dawa= util.getQueryVariable('dawa');
if (!dawa) {
  dawa= 'https://dawa.aws.dk';
}

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

async function hvor(coordinate) { 
  contextmenu.clear(); 

  let menuItem= {};
  menuItem.text= "Koordinater: <strong>" + coordinate[0] + ', ' + coordinate[1] + '</strong>';
  menuItem.callback= koordinater;
  menuItem.classname= 'bold';
  contextmenu.push(menuItem);
  contextmenu.push('-');

  let promises= []
    , danMenuItems= [];

  // adgangsadresse
  promises.push(() => {return fetch(util.danUrl(dawa + "/adgangsadresser/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemAdgangsadresse);

  // navngiven vej
  promises.push(() => {return fetch(util.danUrl(dawa + "/navngivneveje",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemNavngivenvej);

  // vejstykke
  promises.push(() => {return fetch(util.danUrl(dawa + "/vejstykker/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemVejstykke);

  // supplerende bunavn
  promises.push(() => {return fetch(util.danUrl(dawa + "/supplerendebynavne2",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemSupplerendeBynavn);

  // postnummer
  promises.push(() => {return fetch(util.danUrl(dawa + "/postnumre/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemPostnummer);

  // bygning
  promises.push(() => {return fetch(util.danUrl(dawa + "/bygninger",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemBygning);

  // jordstykke
  promises.push(() => {return fetch(util.danUrl(dawa + "/jordstykker/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemJordstykke);

  // ejerlav
  promises.push(() => {return fetch(util.danUrl(dawa + "/ejerlav",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemEjerlav);

  // sogn
  promises.push(() => {return fetch(util.danUrl(dawa + "/sogne/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemData("Sogn", 'sogne'));

  // kommune
  promises.push(() => {return fetch(util.danUrl(dawa + "/kommuner/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemData("Kommune", 'kommuner'));

  // region
  promises.push(() => {return fetch(util.danUrl(dawa + "/landsdele",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemLandsdele);

  // region
  promises.push(() => {return fetch(util.danUrl(dawa + "/regioner/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemData("Region",'regioner'));

  // retskreds
  promises.push(() => {return fetch(util.danUrl(dawa + "/retskredse/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemData("Retskreds", 'retskredse'));

  // politikreds
  promises.push(() => {return fetch(util.danUrl(dawa + "/politikredse/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemData("Politikreds", 'politikredse'));

  // afstemningsområde
  promises.push(() => {return fetch(util.danUrl(dawa + "/afstemningsomraader/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemAfstemningsområde);

  // opstillingskreds
  promises.push(() => {return fetch(util.danUrl(dawa + "/opstillingskredse/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemData("Opstillingskreds", 'opstillingskredse'));

  // storkreds
  promises.push(() => {return fetch(util.danUrl(dawa + "/storkredse/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemStorkreds);

  // valglandsdel
  promises.push(() => {return fetch(util.danUrl(dawa + "/valglandsdele/reverse",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
  danMenuItems.push(danMenuItemValglandsdel);

  // stednavne
  promises.push(() => {return fetch(util.danUrl(dawa + "/stednavne",{x:coordinate[0], y: coordinate[1], srid: 25832}))});
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

  // var t0 = performance.now();
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
  //var t1 = performance.now();
  // console.log("Reverse midt" + (t1 - t0) + " milliseconds.")
  start= 0;
  let data= [];
  while (start < responses.length) {
    var stop= start+maxsamtidige<responses.length?start+maxsamtidige:responses.length;
    for (let i= start; i < stop; i++) {
      responses[i]= responses[i].json();
      //console.log('i: ' + i + ', start: ' + start + ', stop: ' + stop);
    }
    data= data.concat(await Promise.all(responses.slice(start, start+stop))); 
    for(let i=start; i<stop; i++) {
      danMenuItems[i](data[i]);
    } 
    start= start+maxsamtidige;
  }
  // var t2 = performance.now();
  // console.log("Reverse " + (t2 - t0) + " milliseconds.")
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function danVis(source, titel) {
  return function (data) {
    fetch(data.data.href+'?srid=25832&format=geojson&struktur=nestet').then( function(response) {
      response.json().then( function ( objekt ) {
        let klasse= vis.geometriklasse(objekt); 
        kort.flyToGeometry(objekt.properties.visueltcenter, new klasse(objekt.geometry.coordinates), mapcm.getView(), function() {}); 
        vis.vis(source, objekt, titel);
      });
    });
  };
}

function danMenuItemAdgangsadresse(data) {
  let menuItem= {};
  menuItem.text= "Adgangsadresse: <br/><strong>" +  util.formatAdgangsadresse(data,false) + '</strong>';
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
  menuItem.text= "Navngivenvej: <strong>" + data[0].navn + '</strong>';
  menuItem.callback= danVis(sourcecm, 'Navngiven vej');
  menuItem.data= data[0];
  contextmenu.push(menuItem);
}

function danMenuItemVejstykke(data) {
  let menuItem= {};
  menuItem.text= "Vejstykke: <strong>" + data.navn + ' (' + data.kode + ')' + '</strong>';
  menuItem.callback= danVis(sourcecm, 'Vejstykke');
  menuItem.data= data;
  contextmenu.push(menuItem);
}

function danMenuItemPostnummer(data) {
  let menuItem= {};
  menuItem.text= "Postnummer: <strong>" +  data.nr + " " + data.navn + '</strong>';
  menuItem.callback= danVis(sourcecm, 'Postnummer');
  menuItem.data= data;
  contextmenu.push(menuItem);
}

function danMenuItemSupplerendeBynavn(data) {
  if (data.length > 0) {
    let menuItem= {};
    menuItem.text= "Supplerende bynavn: <strong>" +  data[0].navn + '</strong>';
    menuItem.callback= danVis(sourcecm, 'Supplerende bynavn');
    menuItem.data= data[0];
    contextmenu.push(menuItem);
  }
}

function danMenuItemBygning(data) {
  for (var i= 0; i < data.length; i++) {
    let menuItem= {};
    menuItem.text= data[i].bygningstype;
    menuItem.data= data[i];
    menuItem.callback=  danVis(sourcecm, 'Bygning');;
    contextmenu.push(menuItem);
  }
}

function danMenuItemJordstykke(data) {
  let menuItem= {};
  menuItem.text= "Jordstykke: <strong>" + data.matrikelnr + " " + data.ejerlav.navn + '</strong>';
  menuItem.callback= danVis(sourcecm, 'Jordstykke');
  menuItem.data= data;
  contextmenu.push(menuItem);
}

function danMenuItemEjerlav(data) {
  if (data.length > 0) {
    let menuItem= {};
    menuItem.text= "Ejerlav: <strong>" +  data[0].navn + '</strong>';
    menuItem.callback= danVis(sourcecm, 'Ejerlav');
    menuItem.data= data[0];
    contextmenu.push(menuItem);
  }
}

function danMenuItemLandsdele(data) {
  if (data.length > 0) {
    let menuItem= {};
    menuItem.text= "Landsdel: <strong>" +  data[0].navn  + " (" +data[0].nuts3 + ")" + '</strong>';
    menuItem.callback= danVis(sourcecm, 'Landsdel');
    menuItem.data= data[0];
    contextmenu.push(menuItem);
  }
}

function danMenuItemAfstemningsområde(data) {
  let menuItem= {};
  menuItem.text= "Afstemningsområde: <strong>" + data.navn + " (" +data.nummer + ")" + '</strong>';
  menuItem.callback= danVis(sourcecm, 'Afstemningsområde');
  menuItem.data= data;
  contextmenu.push(menuItem);
}

function danMenuItemStorkreds(data) {
  let menuItem= {};
  menuItem.text= "Storkreds: <strong>" + data.navn + " (" + data.nummer + ")" + '</strong>';
  menuItem.callback= danVis(sourcecm, 'Storkreds');
  menuItem.data= data;
  contextmenu.push(menuItem);
}

function danMenuItemValglandsdel(data) {
  let menuItem= {};
  menuItem.text= "Valglandsdel: <strong>" + data.navn + " (" + data.bogstav + ")" + '</strong>';
  menuItem.callback= danVis(sourcecm, 'Storkreds');
  menuItem.data= data;
  contextmenu.push(menuItem);
}


function danMenuItemStednavne(data) {
  for (var i= 0; i<data.length;i++) {
    let menuItem= {};
    menuItem.text= capitalizeFirstLetter(data[i].undertype) + ": <strong>" + data[i].navn + '</strong>';
    menuItem.callback= danVis(sourcecm, capitalizeFirstLetter(data[i].undertype));
    menuItem.data= data[i];
    contextmenu.push(menuItem);
  }
}

function danMenuItemData(titel) {
  return function (data) { 
    let menuItem= {};
    menuItem.text= titel + ": <strong>" + data.navn + " (" + data.kode + ")" + '</strong>';
    menuItem.callback= danVis(sourcecm, titel);
    menuItem.data= data;
    contextmenu.push(menuItem);
  }
}

// function danVis(source, titel) {
//   return function (data) {    
//     vis.vis(source, data.data, titel);
//   }
// }