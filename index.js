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

proj4.defs('EPSG:25832', "+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs");
register(proj4);
var dkProjection = getProjection('EPSG:25832');
dkProjection.setExtent([120000, 5661139.2, 1378291.2, 6500000]);

var kfTileGrid = new WMTSTileGrid({
  extent: [120000, 5661139.2, 1378291.2, 6500000],
  resolutions: [1638.4,819.2,409.6,204.8,102.4,51.2,25.6,12.8,6.4,3.2,1.6,0.8,0.4,0.2],
  matrixIds: ['L00','L01','L02','L03','L04','L05','L06','L07','L08','L09','L10','L11','L12','L13'],
});

let kftoken= 'd23aed4ea6f89420aae2fcf89b47e95b';

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
  view: new View({
    minZoom: 2,
    maxZoom: 13,
    center: [654500, 6176450], // start center position
    zoom: 9, // start zoom level
    resolutions: [1638.4,819.2,409.6,204.8,102.4,51.2,25.6,12.8,6.4,3.2,1.6,0.8,0.4,0.2,0.1], // Equal to WMTS resolutions with three more detailed levels
    projection: dkProjection // use our custom projection defined earlier
  })
});