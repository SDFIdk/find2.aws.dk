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

export function vis(source, data, titel) { 
  var område = new Feature(); 
  let klasse= geometriklasse(data);       
  //område.setStyle(markerstyle('red'));
  område.setGeometry(new klasse(data.geometry.coordinates));
  område.setProperties({data: data, popupTekst: popupTekst(data.properties, titel)});
  source.addFeature(område);
}

function popupTekst(data, titel) {
  return '<h4 class=popupoverskrift>' + titel + '</h4><p><a href="' + futil.setSubdomain(data.href, 'info') + '"  target="_blank">' + data.tekst + '</a></p><button id="kortlink">Link til kort</button><button id="fjern">Fjern</button>';
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
  return '<h4 class=popupoverskrift>Adresse</h4><p><a href="' + futil.setSubdomain(data.href, 'info') + '"  target="_blank">' + formatAdresse(data, false) + '</a></p><button id="kortlink">Kortlink</button><button id="fjern">Fjern</button>';
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
  adgangspunkt.setProperties({data: adgangsadresse, popupTekst: adgangsadressePopupTekst(adgangsadresse)});
  source.addFeature(adgangspunkt);

  var vejpunkt = new Feature();     
  vejpunkt.setStyle(markerstyle('blue'));
  vejpunkt.setGeometry(new Point(adgangsadresse.vejpunkt.koordinater));
  vejpunkt.setProperties({data: adgangsadresse, popupTekst: adgangsadressePopupTekst(adgangsadresse)});
  source.addFeature(vejpunkt);
}

function adgangsadressePopupTekst(data) {
  return '<h4 class=popupoverskrift>Adgangsadresse</h4><p><a href="' + futil.setSubdomain(data.href, 'info') + '"  target="_blank">' + util.formatAdgangsadresse(data,false) + '</a></p><button id="kortlink">Kortlink</button><button id="fjern">Fjern</button>';
}

function markerstyle(color) {
  const style=
    new Style({
      image: new CircleStyle({radius: markerradius, fill: new Fill({color: color}), stroke: new Stroke({color: color, width: 1})})
    });
  return style;
}