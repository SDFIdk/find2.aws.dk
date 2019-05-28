
import {View} from 'ol';
import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';
import {get as getProjection} from 'ol/proj';
import LayerTile from 'ol/layer/Tile';
import ImageLayer from 'ol/layer/Image';
import LayerGroup from 'ol/layer/Group';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';
import ImageWMS from 'ol/source/ImageWMS';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';

proj4.defs('EPSG:25832', "+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs");
register(proj4);
var dkProjection = getProjection('EPSG:25832');
dkProjection.setExtent([120000, 5661139.2, 1378291.2, 6500000]);

var kfTileGrid = new WMTSTileGrid({
  extent: [120000, 5661139.2, 1378291.2, 6500000],
  resolutions: [1638.4,819.2,409.6,204.8,102.4,51.2,25.6,12.8,6.4,3.2,1.6,0.8,0.4,0.2],
  matrixIds: ['L00','L01','L02','L03','L04','L05','L06','L07','L08','L09','L10','L11','L12','L13'],
});

export const view= new View({
    minZoom: 2,
    maxZoom: 13,
    center: [654500, 6176450], // start center position
    zoom: 13, // start zoom level
    resolutions: [1638.4,819.2,409.6,204.8,102.4,51.2,25.6,12.8,6.4,3.2,1.6,0.8,0.4,0.2,0.1], // Equal to WMTS resolutions with three more detailed levels
    projection: dkProjection // use our custom projection defined earlier
  })

let kftoken= 'd23aed4ea6f89420aae2fcf89b47e95b';

export var baggrundskort= new LayerGroup({
    'title': 'Baggrundskort',
    layers: [             
      new LayerTile({
        title:'Open Street Map',
        type:'base',
        source: new OSM(),
        visible: false
      }),
      new LayerTile({
        //opacity: 1.0,
        title:'Ortofoto (WMTS)',
        type:'base',
        visible: true, // by default this layer is visible
        source: new WMTS({ 
          url: "https://services.kortforsyningen.dk/orto_foraar?token="+kftoken,
          layer: "orto_foraar",
          matrixSet: "View1",
          format: "image/jpeg",
          tileGrid: kfTileGrid,
          style: 'default',
          size: [256, 256]
        })
      }), 
      new LayerTile({
        //opacity: 1.0,
        title:'Ortofoto Temp 10 (WMS)',
        type:'base',
        visible: true, // by default this layer is visible
        source: new TileWMS({ 
          url: "https://services.kortforsyningen.dk/orto_foraar_temp?token="+kftoken,
          params: {
            'LAYERS':'quickorto_10cm',
            'VERSION':'1.1.1',
            'TRANSPARENT':'false',
            'FORMAT': "image/png",
            'STYLES':'' 
          }
        })
      }), 
      new LayerTile({
        //opacity: 1.0,
        title:'Ortofoto Temp (WMS)',
        type:'base',
        visible: true, // by default this layer is visible
        source: new TileWMS({ 
          url: "https://services.kortforsyningen.dk/orto_foraar_temp?token="+kftoken,
          params: {
            'LAYERS':'quickorto',
            'VERSION':'1.1.1',
            'TRANSPARENT':'false',
            'FORMAT': "image/png",
            'STYLES':'' 
          }
        })
      }), 
      new LayerTile({  
        title:'Skærmkort (WMS)',    
        type:'base',
        visible: false, // by default this layer is visible
        source: new TileWMS({       
          url: 'https://services.kortforsyningen.dk/topo_skaermkort?token='+kftoken,
          params: {
            'LAYERS':'dtk_skaermkort',
            'VERSION':'1.1.1',
            'TRANSPARENT':'false',
            'FORMAT': "image/png",
            'STYLES':'' 
          }
        })
      }),
      new LayerTile({
        //opacity: 1.0,
        title:'Skærmkort (WMTS)',
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
    ]
  });

export var lag= new LayerGroup({
  title: 'Overlays',
  layers: [
    new ImageLayer({
      title:'Matrikel',
      type:'overlay',
      visible: false,
      opacity: 1.0,
      zIndex:1000,
      source: new ImageWMS({
        url: "https://services.kortforsyningen.dk/mat?token="+kftoken,
        params:{
          'LAYERS':'MatrikelSkel,Centroide',
          'VERSION':'1.1.1',
          'TRANSPARENT':'true',
          'FORMAT': "image/png",
          'STYLES':'' 
        },
      })
    }),
    new ImageLayer({
      title:'Adresser',
      type:'overlay',
      visible: false,
      opacity: 1.0,
      zIndex:1000,
      source: new ImageWMS({
        url: "https://kort.aws.dk/geoserver/aws4_wms/wms",
        params:{
          'LAYERS':'adgangsadresser',
          'VERSION':'1.1.1',
          'TRANSPARENT':'true',
          'FORMAT': "image/png",
          'STYLES':'' 
        },
      })
    }),
  ]
});