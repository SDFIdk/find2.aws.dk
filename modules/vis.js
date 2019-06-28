import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import MultiLineString from 'ol/geom/MultiLineString';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import Point from 'ol/geom/Point';
import * as util from 'dawa-util';

export function visJordstykke(source, data) { 
  var jordstykke = new Feature();        
  //jordstykke.setStyle(markerstyle('red'));
  jordstykke.setGeometry(new Polygon(data.geometry.coordinates));
  jordstykke.setProperties({data: data, popupTekst: jordstykkePopupTekst(data.properties)});
  source.addFeature(jordstykke);
}

function jordstykkePopupTekst(data) {
  return function () {
    return '<p><a href="' + data.href.replace('dawa', 'info') + '"  target="_blank">Jordstykke: ' + data.matrikelnr + " " + data.ejerlav.navn + '</a></p>'
  } 
}

export function visNavngivenvej(source, data) { 
  var navngivenvej = new Feature();        
  //Navngivenvej.setStyle(markerstyle('red'));
  navngivenvej.setGeometry(new MultiLineString(data.geometry.coordinates));
  navngivenvej.setProperties({data: data, popupTekst: navngivenvejPopupTekst(data.properties)});
  source.addFeature(navngivenvej);
}

function navngivenvejPopupTekst(data) {
  return function () {
    return '<p><a href="' + data.href.replace('dawa', 'info') + '"  target="_blank">Navngiven vej: ' + data.navn + '</a></p>'
  } 
}

export function visVejstykke(source, data) { 
  var vejstykke = new Feature();        
  //vejstykke.setStyle(markerstyle('red'));
  vejstykke.setGeometry(new MultiLineString(data.geometry.coordinates));
  vejstykke.setProperties({data: data, popupTekst: vejstykkePopupTekst(data.properties)});
  source.addFeature(vejstykke);
}

function vejstykkePopupTekst(data) {
  return function () {
    return '<p><a href="' + data.href.replace('dawa', 'info') + '"  target="_blank">Vejstykke: ' + data.navn + '(' + data.kode + ')</a></p>'
  } 
}

export function visAdgangsadresse(source, adgangsadresse) {
 	var adgangspunkt = new Feature();        
	adgangspunkt.setStyle(markerstyle('red'));
	adgangspunkt.setGeometry(new Point(adgangsadresse.adgangspunkt.koordinater));
	adgangspunkt.setProperties({data: adgangsadresse, popupTekst: adgangsadressePopupTekst(adgangsadresse)});
	source.addFeature(adgangspunkt);

	var vejpunkt = new Feature();     
	vejpunkt.setStyle(markerstyle('blue'));
	vejpunkt.setGeometry(new Point(adgangsadresse.vejpunkt.koordinater));
	vejpunkt.setProperties({data: adgangsadresse, popupTekst: adgangsadressePopupTekst(adgangsadresse)});
	source.addFeature(vejpunkt);
}

function adgangsadressePopupTekst(data) {
  return function () {
    return '<p><a href="' + data.href.replace('dawa', 'info') + '"  target="_blank">' + util.formatAdgangsadresse(data,false) + '</a></p>'
  } 
}

function markerstyle(color) {
  const style=
    new Style({
      image: new CircleStyle({radius: 4, fill: new Fill({color: color}), stroke: new Stroke({color: color, width: 1})})
    });
  return style;
}