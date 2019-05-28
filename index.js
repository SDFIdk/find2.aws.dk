import 'ol/ol.css';
import 'ol-layerswitcher/src/ol-layerswitcher.css';
import './style.css';
import {Map} from 'ol';
import Geolocation from 'ol/Geolocation';
import Feature from 'ol/Feature';
import {Vector as VectorSource} from 'ol/source';
import {Vector as VectorLayer} from 'ol/layer';
import Point from 'ol/geom/Point';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import LayerSwitcher from 'ol-layerswitcher';
import {defaults as defaultControls, Control} from 'ol/control';
import {AddressSearchControl} from '/modules/AddressSearchControl';
import * as kort from '/modules/kort';
import * as geolocation from '/modules/geolocation';

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
};

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
        addressSource.addFeature(adgangspunkt); 
        var vejpunkt = new Feature();     
        vejpunkt.setStyle(markerstyle('blue'));
        vejpunkt.setGeometry(new Point(adgangsadresse.vejpunkt.koordinater));
        addressSource.addFeature(vejpunkt);
      });
    });
  }
}

