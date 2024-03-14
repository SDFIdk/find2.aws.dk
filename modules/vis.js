import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import MultiPolygon from 'ol/geom/MultiPolygon';
import Circle from 'ol/geom/Circle';
import LineString from 'ol/geom/LineString';
import MultiLineString from 'ol/geom/MultiLineString';
import {Circle as CircleStyle, Fill, Stroke, Style, RegularShape} from 'ol/style';
//import CircleStyle from 'ol/style/Circle';
import Point from 'ol/geom/Point';
import MultiPoint from 'ol/geom/MultiPoint';
import LayerGroup from 'ol/layer/Group';
import * as util from 'dawa-util';
import * as futil from './futil';
import * as kortlink from './kortlink';
import * as kort from './kort';
import 'babel-polyfill';
import 'whatwg-fetch';

export function geometriklasse(data) {
  let klasse;
  switch (data.geometry.type) {
  case 'Polygon':
    klasse= Polygon;
    break;
  case 'MultiPolygon':
    klasse= MultiPolygon;
    break;
  case 'LineString':
    klasse= LineString;
    break;
  case 'MultiLineString':
    klasse= MultiLineString;
    break;
  case 'Point':
    klasse= Point;
    break;
  case 'MultiPoint':
    klasse= MultiPoint;
    break;
  }
  return klasse;
}

function getRessource(url) {
  url= new URL(url);
  let arr= url.pathname.split('/');
  let ressource= arr[1].toLowerCase();
  if (ressource === 'bbr') {
    ressource= ressource + '/' + arr[2].toLowerCase();
  }
  return ressource;
}

function getStyle(href, klasse) {
  let ressource= getRessource(href);
  let strokeColor= 'rgba(255, 0, 0, 0.85)';
  let fillColor= 'rgba(255, 0, 0, 0.2)';
  let zindex= 100;
  switch (ressource) {
  case 'navngivneveje':
  case 'vejnavnpostnummerrelationer':
  case 'vejstykker':
    strokeColor= 'rgba(0, 0, 255, 0.85)';
    fillColor= 'rgba(0, 0, 255, 0.2)';
    zindex= 800;
    break;
  case 'ejerlav': 
  case 'jordstykker':
    strokeColor= 'rgba(0, 255, 0, 1.0)';
    fillColor= 'rgba(0, 255, 0, 0.2)';
    zindex= 600;
    break;  
  case 'bygninger':
    strokeColor= 'rgba(0, 255, 255, 0.85)';
    fillColor= 'rgba(0, 255, 255, 0.2)';
    zindex= 700;
    break;   
  case 'supplerendebynavne2': 
  case 'postnumre': 
  case 'sogne':
  case 'politikredse':
  case 'retskredse':
  case 'regioner':
  case 'landsdele': 
  case 'kommuner':
  case 'afstemningsomraader': 
  case 'menighedsraadsafstemningsomraader':
  case 'opstillingskredse':
  case 'storkredse':
  case 'valglandsdele':
    strokeColor= 'rgba(255, 0, 0, 0.85)';
    fillColor= 'rgba(255, 0, 0, 0.2)';
    zindex= 400;
    break;
  case 'bebyggelser':
  case 'stednavne':
  case 'stednavne2':
  case 'steder':
    strokeColor= 'rgba(0, 255, 0, 0.75)';
    fillColor= 'rgba(0, 255, 0, 0.2)';
    zindex= 500;
    break; 
  }

  let style;
  if (klasse === Point || klasse === MultiPoint) {
    style= markerstyle('green');
  }
  else {
    style=
      new Style({
        stroke: new Stroke({
          color: strokeColor,
          width: 2
        }),
        fill: new Fill({
          color: fillColor
        }),
        zindex: zindex
      });
  };
  return style;
}


function getBetegnelse(data) {
  let ressource= getRessource(data.href);
  let betegnelse= 'betegnelse ikke implementeret';
  switch (ressource) {    
  case 'navngivneveje':
    betegnelse= data.navn + ', ' + data.administrerendekommune.navn + ' Kommune';
    break;
  case 'vejnavnpostnummerrelationer':
    betegnelse= data.betegnelse;
    break;
  case 'supplerendebynavne2':
    betegnelse= data.navn + ', ' + data.kommune.navn + ' Kommune';
    break;   
  case 'sogne':
  case 'vejstykker':
  case 'ejerlav':
  case 'politikredse':
  case 'retskredse':
  case 'regioner': 
  case 'kommuner':
    betegnelse= data.navn + ' (' + data.kode + ')';
    break;  
  case 'jordstykker':
    betegnelse= data.matrikelnr + ' ' + data.ejerlav.navn;
    break;  
  case 'bygninger':
    betegnelse= data.id;
    break;   
  case 'postnumre':
    betegnelse= data.nr + ' ' + data.navn;
    break;
  case 'landsdel': 
  case 'landsdele': 
    betegnelse= data.navn + ' (' + data.nuts3 + ')';
    break;
  case 'afstemningsomraader': 
  case 'menighedsraadsafstemningsomraader':
  case 'opstillingskredse':
  case 'storkredse':
    betegnelse= data.navn + ' (' + data.nummer + ')';
    break;
  case 'valglandsdele':
    betegnelse= data.navn + ' (' + data.bogstav + ')';
    break;
  case 'bebyggelser':
    betegnelse= data.navn + ' (' + data.type + ')';
    break;
  case 'stednavne':
    betegnelse= data.navn + ' (' + data.undertype + ')';
    break;
  case 'stednavne2':
    betegnelse= data.navn + ' (' + data.sted.undertype + ')';
    break;
  case 'steder':
    betegnelse= data.primærtnavn + ' (' + data.undertype + ')';
    break; 
  }
  return betegnelse;
}


function visueltcenter(ressource,data) {
  let koor= null;
  switch (ressource) {   
  case 'adresser':
    koor= data.adgangsadresse.adgangspunkt.koordinater;
    break;
  case 'adgangsadresser':
    koor= data.adgangspunkt.koordinater;
    break;    
  case 'navngivneveje':    
    koor= null;
    break;  
  case 'vejstykker':     
    koor= null;
    break;   
  case 'vejnavne':    
    koor= null;
    break;
  case 'supplerendebynavne2':    
    koor= null;
    break;  
  case 'ejerlav':    
    koor= null;
    break;
  case 'jordstykker':   
    koor= data.properties.visueltcenter;
    break;  
  case 'postnumre':    
    koor= null;
    break;
  case 'bygninger':   
    koor=  data.properties.visueltcenter;
    break;
  case 'sogne':   
    koor= null;
    break;
  case 'politikredse':   
    koor= null;
    break;
  case 'retskredse':   
    koor= null;
    break;
  case 'regioner':   
    koor= null;
    break;
  case 'landsdele':   
    koor= null;
    break;
  case 'kommuner':   
    koor= null;
    break;
  case 'afstemningsomraader':    
    koor= null;
    break;
  case 'menighedsraadsafstemningsomraader':   
    koor= null;
    break;
  case 'opstillingskredse':   
    koor= null;
    break;
  case 'storkredse':   
    koor= null;
    break; 
  case 'valglandsdele':   
    koor= null;
    break;
  case 'bebyggelser':   
    koor= null;
    break;    
  case 'stednavne':
    koor=  data.properties.visueltcenter;
   break;    
  case 'stednavne2': 
    koor=  data.properties.sted.visueltcenter;
    break;      
  case 'steder': 
    koor=  data.properties.visueltcenter;
    break;      
  case 'stednavntyper':   
    koor= null;
    break; 
  default:       
    koor= null;
  }
  return koor;
}

export function visPopup(popup, feature, coordinate, source) {
  let data= feature.getProperties()['data'];
  if (!data) return;
  let popupTekst= feature.getProperties()['popupTekst'];
  //alert('href: ' + features.getArray()[0].getProperties()['href'] );
  popup.show(coordinate, popupTekst);
  let fbtn= document.getElementById('fjern');
  if (fbtn) {
    fbtn.onclick=  function(e) { e;
      source.removeFeature(feature);
      popup.hide();
      // if (addressSource.getFeatures().length === 0) {
      //   kortlink.fjernKortlinkControl(map);
      // }
    }
  }
  let kbtn= document.getElementById('kortlink');
  if (kbtn) {
    kbtn.onclick=  function(e) { e;
      let findkort= 'Skærmkort';
      let baselayers= popup.getMap().getLayers();
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
      window.open(url, 'Link_til_kort');
      navigator.permissions.query({name: "clipboard-write"}).then(result => {
        if (result.state == "granted" || result.state == "prompt") {
          navigator.clipboard.writeText(url);
        }
      });
    }
  }
  let sfbtn= document.getElementById('skråfotolink');
  if (sfbtn) {
    let href= data.href?data.href:data.properties.href;
    let koor= visueltcenter(futil.getDawaRessource(href), data);
    if (koor) {
      sfbtn.hidden= false;
      sfbtn.onclick=  function(e) { e;
        let url= "https://skraafoto.dataforsyningen.dk/viewer.html?center=" + koor[0] + "%2C" + koor[1] + "&orientation=north";
        window.open(url, 'Link_til_kort');
        navigator.permissions.query({name: "clipboard-write"}).then(result => {
          if (result.state == "granted" || result.state == "prompt") {
            navigator.clipboard.writeText(url);
          }
        });
      }
    }
  }
}

export function vis(source, data, titel, popup) {
  let klasse= geometriklasse(data);  
  var område = new Feature(new klasse(data.geometry.coordinates)); 
  //område.setGeometry();      
  område.setStyle(getStyle(data.properties.href, klasse));
  område.setProperties({data: data, popupTekst: popupTekst(data.properties, titel)});
  source.addFeature(område);
  visPopup(popup, område, data.properties.visueltcenter, source);
}

export function visStednavn(source, data, titel, popup) {
  let klasse= geometriklasse(data);  
  var område = new Feature(new klasse(data.geometry.coordinates)); 
  //område.setGeometry();      
  område.setStyle(getStyle(data.properties.href, klasse));
  område.setProperties({data: data, popupTekst: popupTekst(data.properties, titel)});
  source.addFeature(område);
  visPopup(popup, område, data.properties.sted.visueltcenter, source);
}

function popupTekst(data, titel) {
  return '<h4 class=popupoverskrift>' + titel + '</h4><p><a href="' + futil.setSubdomain(data.href, 'info') + '"  target="_blank">' + getBetegnelse(data) + '</a></p><button id="kortlink">Kort</button><button id="skråfotolink" hidden>Skråfoto</button><button id="fjern">Fjern</button>';
}

let markerradius= 4;

export function visAdresse(source, adresse, popup) {
  var adgangspunkt = new Feature();        
  adgangspunkt.setStyle(markerstyle('red'));
  adgangspunkt.setGeometry(new Point(adresse.adgangsadresse.adgangspunkt.koordinater));
  adgangspunkt.setProperties({data: adresse, popupTekst: adressePopupTekst(adresse)});
  source.addFeature(adgangspunkt);
  visPopup(popup, adgangspunkt, adresse.adgangsadresse.adgangspunkt.koordinater, source)

  var vejpunkt = new Feature();     
  vejpunkt.setStyle(markerstyle('blue'));
  vejpunkt.setGeometry(new Point(adresse.adgangsadresse.vejpunkt.koordinater));
  vejpunkt.setProperties({data: adresse, popupTekst: adressePopupTekst(adresse)});
  source.addFeature(vejpunkt);
}

function adressePopupTekst(data) {
  return '<h4 class=popupoverskrift>Adresse</h4><p><a href="' + futil.setSubdomain(data.href, 'info') + '"  target="_blank">' + formatAdresse(data, false) + '</a></p><button id="kortlink">Kort</button><button id="skråfotolink">Skråfoto</button><button id="fjern">Fjern</button>';
}

function formatAdresse (data, enlinje= true) {
  let separator= enlinje?", ":"<br/>";
  let etagedør= (data.etage?", "+data.etage+".":"") + (data.dør?" "+data.dør:"");

  let supplerendebynavn= data.supplerendebynavn?separator + data.supplerendebynavn:"";
  return data.adgangsadresse.vejstykke.navn + " " + data.adgangsadresse.husnr + etagedør + supplerendebynavn + separator + data.adgangsadresse.postnummer.nr + " " + data.adgangsadresse.postnummer.navn
}

export function visAdgangsadresse(source, adgangsadresse, popup) {
  var adgangspunkt = new Feature();             
  adgangspunkt.setStyle(markerstyle('red'));
  adgangspunkt.setGeometry(new Point(adgangsadresse.adgangspunkt.koordinater));
  //adgangspunkt.setGeometry(new Circle(adgangsadresse.adgangspunkt.koordinater));
  let popuptekst= adgangsadressePopupTekst(adgangsadresse);
  adgangspunkt.setProperties({data: adgangsadresse, popupTekst: popuptekst});
  source.addFeature(adgangspunkt);
  visPopup(popup, adgangspunkt, adgangsadresse.adgangspunkt.koordinater, source)

  var vejpunkt = new Feature();     
  vejpunkt.setStyle(markerstyle('blue'));
  vejpunkt.setGeometry(new Point(adgangsadresse.vejpunkt.koordinater));
  vejpunkt.setProperties({data: adgangsadresse, popupTekst: popuptekst});
  source.addFeature(vejpunkt);
}

export function visVejtilslutningspunkt(source, koordinater, data) {  
  var vejtilslutningspunkt = new Feature();             
  vejtilslutningspunkt.setStyle(markerstyle('blue'));
  vejtilslutningspunkt.setGeometry(new Point(koordinater));
  //vejtilslutningspunkt.setGeometry(new Circle(adgangsadresse.vejtilslutningspunkt.koordinater));
  let popuptekst= popupTekst(data, 'Vejtilslutningspunkt');
  vejtilslutningspunkt.setProperties({data: data, popupTekst: popuptekst});
  source.addFeature(vejtilslutningspunkt);
}

function adgangsadressePopupTekst(data) {
  return '<h4 class=popupoverskrift>Adgangsadresse</h4><p><a href="' + futil.setSubdomain(data.href, 'info') + '"  target="_blank">' + util.formatAdgangsadresse(data,false) + '</a></p><button id="kortlink">Kort</button><button id="skråfotolink">Skråfoto</button><button id="fjern">Fjern</button>';
}

function markerstyle(color) {
  const style=
    new Style({
      image: new CircleStyle({radius: markerradius, fill: new Fill({color: color}), stroke: new Stroke({color: color, width: 1}), zindex: 999})
    });
  return style;
}

function style(color) {
  const style=
     new Style({
          stroke: new Stroke({
            color: 'rgba(255, 0, 0, 0.75)',
            width: 2
          }),
          fill: new Fill({
            color: 'rgba(255, 0, 0, 0.1)'
          })
        });
  return style;
}
