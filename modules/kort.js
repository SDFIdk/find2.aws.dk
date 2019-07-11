
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
    'title': 'Basiskort',
    'fold': 'open',
    layers: [             
      new LayerTile({
        title:'Open Street Map',
        type:'base',
        source: new OSM(),
        visible: false
      }),
      new LayerTile({
        //opacity: 1.0,
        title:'Ortofoto',
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
      // new LayerTile({  
      //   title:'Skærmkort (WMS)',    
      //   type:'base',
      //   visible: false, // by default this layer is visible
      //   source: new TileWMS({       
      //     url: 'https://services.kortforsyningen.dk/topo_skaermkort?token='+kftoken,
      //     params: {
      //       'LAYERS':'dtk_skaermkort',
      //       'VERSION':'1.1.1',
      //       'TRANSPARENT':'false',
      //       'FORMAT': "image/png",
      //       'STYLES':'' 
      //     }
      //   })
      // }),  
      new LayerTile({
        //opacity: 1.0,
        title:'Forvaltningskort',
        type:'base',
        visible: true, // by default this layer is visible
        source: new TileWMS({ 
          url: "https://services.kortforsyningen.dk/forvaltning?token="+kftoken,
          params: {
            'LAYERS':'basis_kort',
            'VERSION':'1.1.1',
            'TRANSPARENT':'false',
            'FORMAT': "image/png",
            'STYLES':'default' 
          }
        })
      }),   
      new LayerTile({
        //opacity: 1.0,
        title:'Skærmkort - grå',
        type:'base',
        visible: true, // by default this layer is visible
        source: new WMTS({ 
          url: "https://services.kortforsyningen.dk/topo_skaermkort_graa?token="+kftoken,
          layer: "dtk_skaermkort_graa",
          matrixSet: "View1",
          format: "image/jpeg",
          tileGrid: kfTileGrid,
          style: 'default',
          size: [256, 256]
        })
      }),
      new LayerTile({
        //opacity: 1.0,
        title:'Skærmkort - dæmpet',
        type:'base',
        visible: true, // by default this layer is visible
        source: new WMTS({ 
          url: "https://services.kortforsyningen.dk/topo_skaermkort_daempet?token="+kftoken,
          layer: "dtk_skaermkort_daempet",
          matrixSet: "View1",
          format: "image/jpeg",
          tileGrid: kfTileGrid,
          style: 'default',
          size: [256, 256]
        })
      }),
      new LayerTile({
        //opacity: 1.0,
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
    ]
  });

export var historiskeOrtofoto= new LayerGroup({
    'title': 'Historiske ortofoto',
    'fold': 'close',
    layers: [  
      new LayerTile({
        //opacity: 1.0,
        title:'Ortofoto Temp 10',
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
        title:'Ortofoto 2008',
        type:'base',
        visible: true, // by default this layer is visible
        source: new TileWMS({ 
          url: "https://services.kortforsyningen.dk/orto_sommer_2008?token="+kftoken,
          params: {
            'LAYERS':'orto_sommer_2008',
            'VERSION':'1.1.1',
            'TRANSPARENT':'false',
            'FORMAT': "image/png",
            'STYLES':'' 
          }
        })
      }), 
      new LayerTile({
        //opacity: 1.0,
        title:'Ortofoto 2005',
        type:'base',
        visible: true, // by default this layer is visible
        source: new TileWMS({ 
          url: "https://services.kortforsyningen.dk/orto_sommer_2005?token="+kftoken,
          params: {
            'LAYERS':'orto_sommer_2005',
            'VERSION':'1.1.1',
            'TRANSPARENT':'false',
            'FORMAT': "image/png",
            'STYLES':'' 
          }
        })
      }),  
      new LayerTile({
        //opacity: 1.0,
        title:'Ortofoto 2002',
        type:'base',
        visible: true, // by default this layer is visible
        source: new TileWMS({ 
          url: "https://services.kortforsyningen.dk/orto_sommer_2002?token="+kftoken,
          params: {
            'LAYERS':'orto_sommer_2002',
            'VERSION':'1.1.1',
            'TRANSPARENT':'false',
            'FORMAT': "image/png",
            'STYLES':'' 
          }
        })
      }),  
      new LayerTile({
        //opacity: 1.0,
        title:'Ortofoto 1999',
        type:'base',
        visible: true, // by default this layer is visible
        source: new TileWMS({ 
          url: "https://services.kortforsyningen.dk/orto_sommer_1999?token="+kftoken,
          params: {
            'LAYERS':'orto_sommer_1999',
            'VERSION':'1.1.1',
            'TRANSPARENT':'false',
            'FORMAT': "image/png",
            'STYLES':'' 
          }
        })
      })
    ]
  });

export var historiskeKort= new LayerGroup({
    'title': 'Historiske kort',
    'fold': 'close',
    layers: [  
      new LayerTile({
        //opacity: 1.0,
        title:'1980 - 2001',
        type:'base',
        visible: true, // by default this layer is visible
        source: new TileWMS({ 
          url: "https://services.kortforsyningen.dk/topo4cm_1980_2001?token="+kftoken,
          params: {
            'LAYERS':'dtk_4cm_1980_2001',
            'VERSION':'1.1.1',
            'TRANSPARENT':'false',
            'FORMAT': "image/png",
            'STYLES':'default' 
          }
        })
      }),   
      new LayerTile({
        //opacity: 1.0,
        title:'1953 - 1976',
        type:'base',
        visible: true, // by default this layer is visible
        source: new TileWMS({ 
          url: "https://services.kortforsyningen.dk/topo4cm_1953_1976?token="+kftoken,
          params: {
            'LAYERS':'dtk_4cm_1953_1976',
            'VERSION':'1.1.1',
            'TRANSPARENT':'false',
            'FORMAT': "image/png",
            'STYLES':'default' 
          }
        })
      }),  
      new LayerTile({
        //opacity: 1.0,
        title:'1928 - 1940',
        type:'base',
        visible: true, // by default this layer is visible
        source: new TileWMS({ 
          url: "https://services.kortforsyningen.dk/topo20_lave_maalebordsblade?token="+kftoken,
          params: {
            'LAYERS':'dtk_lave_maalebordsblade',
            'VERSION':'1.1.1',
            'TRANSPARENT':'false',
            'FORMAT': "image/png",
            'STYLES':'default' 
          }
        })
      }), 
      new LayerTile({
        //opacity: 1.0,
        title:'1842 - 1899',
        type:'base',
        visible: true, // by default this layer is visible
        source: new TileWMS({ 
          url: "https://services.kortforsyningen.dk/topo20_hoeje_maalebordsblade?token="+kftoken,
          params: {
            'LAYERS':'dtk_hoeje_maalebordsblade',
            'VERSION':'1.1.1',
            'TRANSPARENT':'false',
            'FORMAT': "image/png",
            'STYLES':'default' 
          }
        })
      })
    ]
  });

export var adresselag= new LayerGroup({
  title: 'Adresselag',
  fold: 'open',
  layers: [
    new ImageLayer({
      title:'Vejtilslutningspunkter',
      type:'overlay',
      visible: false,
      opacity: 1.0,
      zIndex:1000,
      source: new ImageWMS({
        url: "https://kort.aws.dk/geoserver/aws4_wms/wms",
        params:{
          'LAYERS':'vejtilslutningspunkter',
          'VERSION':'1.1.1',
          'TRANSPARENT':'true',
          'FORMAT': "image/png",
          'STYLES':'' 
        },
      })
    }),
    new ImageLayer({
      title:'Vejnavneområder',
      type:'overlay',
      visible: false,
      opacity: 1.0,
      zIndex:1000,
      source: new ImageWMS({
        url: "https://kort.aws.dk/geoserver/aws4_wms/wms",
        params:{
          'LAYERS':'vejnavneomraader',
          'VERSION':'1.1.1',
          'TRANSPARENT':'true',
          'FORMAT': "image/png",
          'STYLES':'' 
        },
      })
    }),
    new ImageLayer({
      title:'Vejpunktlinjer',
      type:'overlay',
      visible: false,
      opacity: 1.0,
      zIndex:1000,
      source: new ImageWMS({
        url: "https://kort.aws.dk/geoserver/aws4_wms/wms",
        params:{
          'LAYERS':'vejpunktlinjer',
          'VERSION':'1.1.1',
          'TRANSPARENT':'true',
          'FORMAT': "image/png",
          'STYLES':'' 
        },
      })
    }),
    new ImageLayer({
      title:'Vejpunkter',
      type:'overlay',
      visible: false,
      opacity: 1.0,
      zIndex:1000,
      source: new ImageWMS({
        url: "https://kort.aws.dk/geoserver/aws4_wms/wms",
        params:{
          'LAYERS':'vejpunkter',
          'VERSION':'1.1.1',
          'TRANSPARENT':'true',
          'FORMAT': "image/png",
          'STYLES':'' 
        },
      })
    }),
    new ImageLayer({
      title:'Adgangsadresser',
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
    })
  ]
});

export var lag= new LayerGroup({
  title: 'Andre lag',
  fold: 'close',
  layers: [
    new ImageLayer({
      title:'Retskreds',
      type:'overlay',
      visible: false,
      opacity: 1.0,
      zIndex:1000,
      source: new ImageWMS({
        url: "https://services.kortforsyningen.dk/dagi?token="+kftoken,
        params:{
          'LAYERS':'retskreds',
          'VERSION':'1.1.1',
          'TRANSPARENT':'true',
          'FORMAT': "image/png",
          'STYLES':'' 
        },
      })
    }),
    new ImageLayer({
      title:'Politikreds',
      type:'overlay',
      visible: false,
      opacity: 1.0,
      zIndex:1000,
      source: new ImageWMS({
        url: "https://services.kortforsyningen.dk/dagi?token="+kftoken,
        params:{
          'LAYERS':'politikreds',
          'VERSION':'1.1.1',
          'TRANSPARENT':'true',
          'FORMAT': "image/png",
          'STYLES':'' 
        },
      })
    }),
    new ImageLayer({
      title:'Sogn',
      type:'overlay',
      visible: false,
      opacity: 1.0,
      zIndex:1000,
      source: new ImageWMS({
        url: "https://services.kortforsyningen.dk/dagi?token="+kftoken,
        params:{
          'LAYERS':'sogn',
          'VERSION':'1.1.1',
          'TRANSPARENT':'true',
          'FORMAT': "image/png",
          'STYLES':'' 
        },
      })
    }),
    new ImageLayer({
      title:'Postnummer',
      type:'overlay',
      visible: false,
      opacity: 1.0,
      zIndex:1000,
      source: new ImageWMS({
        url: "https://services.kortforsyningen.dk/dagi?token="+kftoken,
        params:{
          'LAYERS':'postdistrikt',
          'VERSION':'1.1.1',
          'TRANSPARENT':'true',
          'FORMAT': "image/png",
          'STYLES':'' 
        },
      })
    }),
    new ImageLayer({
      title:'Kommune',
      type:'overlay',
      visible: false,
      opacity: 1.0,
      zIndex:1000,
      source: new ImageWMS({
        url: "https://services.kortforsyningen.dk/dagi?token="+kftoken,
        params:{
          'LAYERS':'kommune',
          'VERSION':'1.1.1',
          'TRANSPARENT':'true',
          'FORMAT': "image/png",
          'STYLES':'' 
        },
      })
    }),
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
    })
  ]
});

function beregnAfstand(location1, location2) {
  let l= Math.sqrt(Math.pow(location1[0]-location2[0], 2) + Math.pow(location1[0]-location2[0], 2));
  return l;
}

function beregnZoomniveau(afstand, zoom) {
  let z= 3;
  if (afstand < 1000) z= 13;
  else if (afstand < 1500) z= 12;
  else if (afstand < 2000) z= 11;
  else if (afstand < 5000) z= 10;
  else if (afstand < 9000) z= 9;
  else if (afstand < 11000) z= 8;
  else if (afstand < 13000) z= 7;
  else if (afstand < 50000) z= 6;
  else if (afstand < 75000) z= 5;
  else if (afstand < 100000) z= 4;
  return (z > zoom)?zoom:z;
}

function beregnVarighed(afstand) {
  let v= 4000;
  if (afstand < 500) v= 1000;
  else if (afstand < 2500) v= 1500;
  else if (afstand < 5000) v= 1750;
  else if (afstand < 7500) v= 2000;
  else if (afstand < 10000) v= 2500;
  else if (afstand < 12500) v= 3000;
  else if (afstand < 15000) v= 3500;
  return v;
}

export function flyTo(location, view, done) {
  let afstand= beregnAfstand(location, view.getCenter());
  var duration = beregnVarighed(afstand);
  var zoom = view.getZoom();
  //console.log('Afstand: ' + afstand + 'Zoom start: ' + zoom);
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
    zoom: beregnZoomniveau(afstand,zoom),
    duration: duration / 2
  }, {
    zoom: zoom,
    duration: duration / 2
  }, callback);
}

export function flyToGeometry(location, geometry, view, done) {
  let afstand= location?beregnAfstand(location, view.getCenter()):1000;
  var duration = beregnVarighed(afstand);
  var zoom = view.getZoom();
  //console.log('Afstand: ' + afstand + 'Zoom start: ' + zoom);
  var parts = 2;
  var called = false;
  function callback(complete) {
    view.fit(geometry, {'duration': duration / 2});
    done(true);
  }
  if (location) {
    view.animate({
      center: location,
      duration: duration
    }); 
  }
  view.animate({
    zoom: beregnZoomniveau(afstand,zoom),
    duration: duration / 2
  }, callback);
}