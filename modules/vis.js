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
import * as util from 'dawa-util';
import * as futil from '/modules/futil';
import * as kortlink from '/modules/kortlink';
import * as bbr from '/modules/bbrkodelister';
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
  console.log(arr);
  console.log(ressource);
  if (ressource === 'bbr') {
    ressource= ressource + '/' + arr[2].toLowerCase();
  }
  console.log(ressource);
  return ressource;
}

function getStyle(href, klasse) {
  let ressource= getRessource(href);
  let strokeColor= 'rgba(255, 0, 0, 0.85)';
  let fillColor= 'rgba(255, 0, 0, 0.2)';
  let zindex= 100;
  switch (ressource) {
  case 'navngivneveje':
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
  case 'bbr/bygninger':
  case 'bbr/tekniskeanlaeg':
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
  case 'bbr/bygninger':
    betegnelse= bbr.getBygAnvendelse(data.byg021BygningensAnvendelse) + ' fra ' + data.byg026Opførelsesår;
    break;
  case 'bbr/tekniskeanlaeg':
    betegnelse= bbr.getKlassifikation(data.tek020Klassifikation) + ' fra ' + data.tek024Etableringsår;
    break;
  case 'navngivneveje':
    betegnelse= data.navn + ', ' + data.administrerendekommune.navn + ' Kommune';
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

export function vis(source, data, titel) {
  let klasse= geometriklasse(data);  
  var område = new Feature(new klasse(data.geometry.coordinates)); 
  //område.setGeometry();      
  område.setStyle(getStyle(data.properties.href, klasse));
  område.setProperties({data: data, popupTekst: popupTekst(data.properties, titel)});
  source.addFeature(område);
}

function popupTekst(data, titel) {
  return '<h4 class=popupoverskrift>' + titel + '</h4><p><a href="' + futil.setSubdomain(data.href, 'info') + '"  target="_blank">' + getBetegnelse(data) + '</a></p><button id="kortlink">Kort</button><button id="skråfotolink" hidden>Skråfoto</button><button id="fjern">Fjern</button>';
}

let markerradius= 4;

export function visAdresse(source, adresse) {
  var adgangspunkt = new Feature();        
  adgangspunkt.setStyle(markerstyle('red'));
  adgangspunkt.setGeometry(new Point(adresse.adgangsadresse.adgangspunkt.koordinater));
  adgangspunkt.setProperties({data: adresse, popupTekst: adressePopupTekst(adresse)});
  source.addFeature(adgangspunkt);

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

export function visAdgangsadresse(source, adgangsadresse) {
  var adgangspunkt = new Feature();             
  adgangspunkt.setStyle(markerstyle('red'));
  adgangspunkt.setGeometry(new Point(adgangsadresse.adgangspunkt.koordinater));
  //adgangspunkt.setGeometry(new Circle(adgangsadresse.adgangspunkt.koordinater));
  let popuptekst= adgangsadressePopupTekst(adgangsadresse);
  adgangspunkt.setProperties({data: adgangsadresse, popupTekst: popuptekst});
  source.addFeature(adgangspunkt);

  var vejpunkt = new Feature();     
  vejpunkt.setStyle(markerstyle('blue'));
  vejpunkt.setGeometry(new Point(adgangsadresse.vejpunkt.koordinater));
  vejpunkt.setProperties({data: adgangsadresse, popupTekst: popuptekst});
  source.addFeature(vejpunkt);
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