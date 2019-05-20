import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';
import {get as getProjection} from 'ol/proj';
import TileWMS from 'ol/source/TileWMS.js';
import WMTS from 'ol/source/WMTS.js';
import WMTSTileGrid from 'ol/tilegrid/WMTS.js';
import Geolocation from 'ol/Geolocation.js';
import {defaults as defaultControls, Control} from 'ol/control.js';
import * as dawaAutocomplete2 from 'dawa-autocomplete2';

proj4.defs('EPSG:25832', "+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs");
register(proj4);
var dkProjection = getProjection('EPSG:25832');
dkProjection.setExtent([120000, 5661139.2, 1378291.2, 6500000]);

var kfTileGrid = new WMTSTileGrid({
  extent: [120000, 5661139.2, 1378291.2, 6500000],
  resolutions: [1638.4,819.2,409.6,204.8,102.4,51.2,25.6,12.8,6.4,3.2,1.6,0.8,0.4,0.2],
  matrixIds: ['L00','L01','L02','L03','L04','L05','L06','L07','L08','L09','L10','L11','L12','L13'],
});

const view= new View({
    minZoom: 2,
    maxZoom: 13,
    center: [654500, 6176450], // start center position
    zoom: 13, // start zoom level
    resolutions: [1638.4,819.2,409.6,204.8,102.4,51.2,25.6,12.8,6.4,3.2,1.6,0.8,0.4,0.2,0.1], // Equal to WMTS resolutions with three more detailed levels
    projection: dkProjection // use our custom projection defined earlier
  })

let kftoken= 'd23aed4ea6f89420aae2fcf89b47e95b';

//
// Define address search control.
//

/**
 * @constructor
 * @extends {module:ol/control/Control~Control}
 * @param {Object=} opt_options Control options.
 */

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
        view.animate({zoom: 12}, {center: adgangsadresse.adgangspunkt.koordinater});
        //popup.openPopup();
      });
    });
  }
}

var AddressSearchControl = (function (Control) {
  function AddressSearchControl(opt_options) {
    var options = opt_options || {};

    var input = document.createElement('input');
    input.type='search';
    input.placeholder= 'vejnavn husnr, postnr'

    var element = document.createElement('div');
    element.className = 'adresseinput ol-control';
    element.appendChild(input);

    Control.call(this, {
      element: element,
      target: options.target
    });

    dawaAutocomplete2.dawaAutocomplete(input, {
        select: selected(this),        
        adgangsadresserOnly: true
      }
    );

    input.addEventListener('click', this.handleRotateNorth.bind(this), false);
  }

  if ( Control ) AddressSearchControl.__proto__ = Control;
  AddressSearchControl.prototype = Object.create( Control && Control.prototype );
  AddressSearchControl.prototype.constructor = AddressSearchControl;

  AddressSearchControl.prototype.handleRotateNorth = function handleRotateNorth () {
    this.getMap().getView().setRotation(0);
  };

  return AddressSearchControl;
}(Control));

const map = new Map({
  target: 'map',
  layers: [
    // new TileLayer({
    //   source: new OSM()
    // })
    // new TileLayer({
    //   source: new TileWMS({        
    //     url: 'https://services.kortforsyningen.dk/topo_skaermkort?token='+kftoken,
    //     type:'base',
    //     visible: true, // by default this layer is visible
    //     params: {
    //       'LAYERS':'dtk_skaermkort',
    //       'VERSION':'1.1.1',
    //       'TRANSPARENT':'false',
    //       'FORMAT': "image/png",
    //       'STYLES':'' 
    //     }
    //   })
    // })
    
    // new TileLayer({
    //   source: new OSM()
    // }),
    new TileLayer({
      opacity: 1.0,
      title:'Skærmkort',
      type:'base',
      visible: true, // by default this layer is visible
      source: new WMTS({ 
        url: "https://services.kortforsyningen.dk/topo_skaermkort?token="+kftoken,
        layer: "dtk_skaermkort",
        matrixSet: "View1",
        format: "image/jpeg",
        tileGrid: kfTileGrid,
        style: 'default',
        size: [256, 256]
      })
    })
  ],
  view: view, 
  controls: defaultControls().extend([
    new AddressSearchControl()
  ]),
});

var geolocation = new Geolocation({
    // enableHighAccuracy must be set to true to have the heading value.
    trackingOptions: {
      enableHighAccuracy: true
    },
    projection: view.getProjection()
  });
geolocation.setTracking(true);
geolocation.on('change', function(evt) {
  view.setCenter(geolocation.getPosition());
  geolocation.setTracking(false);
});