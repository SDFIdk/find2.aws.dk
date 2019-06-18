import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';

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