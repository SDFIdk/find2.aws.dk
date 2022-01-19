
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
import * as futil from '/modules/futil';

proj4.defs('EPSG:25832', "+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs");
register(proj4);
var dkProjection = getProjection('EPSG:25832');
dkProjection.setExtent([120000, 5661139.2, 1378291.2, 6500000]);

var kfTileGrid = new WMTSTileGrid({
  extent: [120000, 5661139.2, 1378291.2, 6500000],
  resolutions: [1638.4,819.2,409.6,204.8,102.4,51.2,25.6,12.8,6.4,3.2,1.6,0.8,0.4,0.2],
  matrixIds: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13'],
});

export const view= new View({
    minZoom: 2,
    maxZoom: 13,
    center: [654500, 6176450], // start center position
    zoom: 13, // start zoom level
    resolutions: [1638.4,819.2,409.6,204.8,102.4,51.2,25.6,12.8,6.4,3.2,1.6,0.8,0.4,0.2,0.1], // Equal to WMTS resolutions with three more detailed levels
    projection: dkProjection // use our custom projection defined earlier
  })

function getAttributions() {
  return '<p>Kort fra <a href="https://kortforsyningen.dk" target="_blank">Kortforsyningen</a>. Data fra <a href="https://dawadocs.dataforsyningen.dk" target="_blank">DAWA</a>. Det hele fra <a href="https://sdfe.dk" target="_blank">SDFE</a>.</p>';
}

let kftoken= futil.getKortforsyningstoken(); 'd902ac31b1c3ff2d3e7f6aa7073c6c67';
let daf_user = 'BPBSMUJAQZ';
let daf_pass = 'promptly75.Approach';

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
                title:'Ortofoto',
                type:'base',
                visible: true, // by default this layer is visible
                source: new TileWMS({ 
                    url: "https://services.datafordeler.dk/GeoDanmarkOrto/orto_foraar/1.0.0/wms?username="+daf_user+"&password="+daf_pass,
                    params: {
                        'LAYERS':'orto_foraar',
                        'VERSION':'1.3.0',
                        'TRANSPARENT':'FALSE',
                        'FORMAT': "image/png",
                        'STYLES':'default', 
                    }
                })
            }),    

            new LayerTile({
                title:'Forvaltningskort: Adresse-byggesag',
                type:'base',
                visible: true, // by default this layer is visible
                source: new TileWMS({ 
                    url: "https://api.dataforsyningen.dk/forvaltning2?token="+kftoken,
                    params: {
                        'LAYERS':'Adresse-byggesag',
                        'VERSION':'1.1.1',
                        'TRANSPARENT':'false',
                        'FORMAT': "image/png",
                        'STYLES':'default', 
                    },                    
                    attributions: getAttributions()
                })
            }),        

            new LayerTile({
                title:'Forvaltningskort: Basis',
                type:'base',
                visible: true, // by default this layer is visible
                source: new TileWMS({ 
                    url: "https://api.dataforsyningen.dk/forvaltning2?token="+kftoken,
                    params: {
                        'LAYERS':'Basis_kort',
                        'VERSION':'1.1.1',
                        'TRANSPARENT':'false',
                        'FORMAT': "image/png",
                        'STYLES':'default', 
                    },                    
                    attributions: getAttributions()
                })
            }),     

            new LayerTile({
                title:'Skærmkort - grå',
                type:'base',
                visible: true, // by default this layer is visible
                source: new WMTS({ 
                    url: "https://services.datafordeler.dk/Dkskaermkort/topo_skaermkort_graa/1.0.0/wmts?username="+daf_user+"&password="+daf_pass,
                    layer: "topo_skaermkort_graa",
                    matrixSet: "View1",
                    format: "image/jpeg",
                    tileGrid: kfTileGrid,
                    style: 'default',
                    size: [256, 256],                    
                    attributions: getAttributions()
                })
            }),

            new LayerTile({
                title:'Skærmkort - dæmpet',
                type:'base',
                visible: true, // by default this layer is visible
                source: new WMTS({ 
                    url: "https://services.datafordeler.dk/Dkskaermkort/topo_skaermkort_daempet/1.0.0/wmts?username="+daf_user+"&password="+daf_pass,
                    layer: "topo_skaermkort_daempet",
                    matrixSet: "View1",
                    format: "image/jpeg",
                    tileGrid: kfTileGrid,
                    style: 'default',
                    size: [256, 256],                    
                    attributions: getAttributions()
                })
            }),

            new LayerTile({
                title:'Skærmkort',
                type:'base',
                visible: true, // by default this layer is visible
                source: new WMTS({ 
                    url: "https://services.datafordeler.dk/Dkskaermkort/topo_skaermkort_wmts/1.0.0/wmts?username="+daf_user+"&password="+daf_pass,
                    layer: "topo_skaermkort",
                    matrixSet: "View1",
                    format: "image/jpeg",
                    tileGrid: kfTileGrid,
                    style: 'default',
                    size: [256, 256],                    
                    attributions: getAttributions()
                })
            })
        ]
  });

export var historiskeOrtofoto= new LayerGroup({
    'title': 'Historiske ortofoto',
    'fold': 'close',
    layers: [  
      new LayerTile({
        title:'Ortofoto Temp 10',
        type:'base',
        visible: true, // by default this layer is visible
        source: new TileWMS({ 
          url: "https://api.dataforsyningen.dk/orto_foraar_temp?token="+kftoken,
          params: {
            'LAYERS':'quickorto,quickorto_10cm',
            'VERSION':'1.1.1',
            'TRANSPARENT':'false',
            'FORMAT': "image/png",
            'STYLES':'' 
          },          
          attributions: getAttributions()
        })
      }),
      new LayerTile({
        title:'Ortofoto 2018',
        type:'base',
        visible: true, // by default this layer is visible
        source: new TileWMS({ 
          url: "https://api.dataforsyningen.dk/orto_foraar?token="+kftoken,
          params: {
            'LAYERS':'geodanmark_2018_10cm,geodanmark_2018_12_5cm',
            'VERSION':'1.1.1',
            'TRANSPARENT':'false',
            'FORMAT': "image/png",
            'STYLES':'' 
          },          
          attributions: getAttributions()
        })
      }),  
      new LayerTile({
        title:'Ortofoto 2017',
        type:'base',
        visible: true, // by default this layer is visible
        source: new TileWMS({ 
          url: "https://api.dataforsyningen.dk/orto_foraar?token="+kftoken,
          params: {
            'LAYERS':'geodanmark_2017_10cm,geodanmark_2017_12_5cm',
            'VERSION':'1.1.1',
            'TRANSPARENT':'false',
            'FORMAT': "image/png",
            'STYLES':'' 
          },          
          attributions: getAttributions()
        })
      }),  
      new LayerTile({
        title:'Ortofoto 2016',
        type:'base',
        visible: true, // by default this layer is visible
        source: new TileWMS({ 
          url: "https://api.dataforsyningen.dk/orto_foraar?token="+kftoken,
          params: {
            'LAYERS':'geodanmark_2016_12_5cm',
            'VERSION':'1.1.1',
            'TRANSPARENT':'false',
            'FORMAT': "image/png",
            'STYLES':'' 
          },          
          attributions: getAttributions()
        })
      }),  
      new LayerTile({
        title:'Ortofoto 2015',
        type:'base',
        visible: true, // by default this layer is visible
        source: new TileWMS({ 
          url: "https://api.dataforsyningen.dk/orto_foraar?token="+kftoken,
          params: {
            'LAYERS':'geodanmark_2015_12_5cm,hrks_2015_10cm',
            'VERSION':'1.1.1',
            'TRANSPARENT':'false',
            'FORMAT': "image/png",
            'STYLES':'' 
          },          
          attributions: getAttributions()
        })
      }), 
      new LayerTile({
        title:'Ortofoto 2008',
        type:'base',
        visible: true, // by default this layer is visible
        source: new TileWMS({ 
          url: "https://api.dataforsyningen.dk/orto_sommer_2008?token="+kftoken,
          params: {
            'LAYERS':'orto_sommer_2008',
            'VERSION':'1.1.1',
            'TRANSPARENT':'false',
            'FORMAT': "image/png",
            'STYLES':'' 
          },          
          attributions: getAttributions()
        })
      }), 
      new LayerTile({
        title:'Ortofoto 2005',
        type:'base',
        visible: true, // by default this layer is visible
        source: new TileWMS({ 
          url: "https://api.dataforsyningen.dk/orto_sommer_2005?token="+kftoken,
          params: {
            'LAYERS':'orto_sommer_2005',
            'VERSION':'1.1.1',
            'TRANSPARENT':'false',
            'FORMAT': "image/png",
            'STYLES':'' 
          },          
          attributions: getAttributions()
        })
      }),  
      new LayerTile({
        title:'Ortofoto 2002',
        type:'base',
        visible: true, // by default this layer is visible
        source: new TileWMS({ 
          url: "https://api.dataforsyningen.dk/orto_sommer_2002?token="+kftoken,
          params: {
            'LAYERS':'orto_sommer_2002',
            'VERSION':'1.1.1',
            'TRANSPARENT':'false',
            'FORMAT': "image/png",
            'STYLES':'' 
          },          
          attributions: getAttributions()
        })
      }),  
      new LayerTile({
        title:'Ortofoto 1999',
        type:'base',
        visible: true, // by default this layer is visible
        source: new TileWMS({ 
          url: "https://api.dataforsyningen.dk/orto_sommer_1999?token="+kftoken,
          params: {
            'LAYERS':'orto_sommer_1999',
            'VERSION':'1.1.1',
            'TRANSPARENT':'false',
            'FORMAT': "image/png",
            'STYLES':'' 
          },          
          attributions: getAttributions()
        })
      })
    ]
  });

export var historiskeKort= new LayerGroup({
    'title': 'Historiske kort',
    'fold': 'close',
    layers: [  
      new LayerTile({
        title:'1980 - 2001',
        type:'base',
        visible: true, // by default this layer is visible
        source: new TileWMS({ 
          url: "https://api.dataforsyningen.dk/topo4cm_1980_2001?token="+kftoken,
          params: {
            'LAYERS':'dtk_4cm_1980_2001',
            'VERSION':'1.1.1',
            'TRANSPARENT':'false',
            'FORMAT': "image/png",
            'STYLES':'default' 
          },          
          attributions: getAttributions()
        })
      }),   
      new LayerTile({
        title:'1953 - 1976',
        type:'base',
        visible: true, // by default this layer is visible
        source: new TileWMS({ 
          url: "https://api.dataforsyningen.dk/topo4cm_1953_1976?token="+kftoken,
          params: {
            'LAYERS':'dtk_4cm_1953_1976',
            'VERSION':'1.1.1',
            'TRANSPARENT':'false',
            'FORMAT': "image/png",
            'STYLES':'default' 
          },          
          attributions: getAttributions()
        })
      }),  
      new LayerTile({
        title:'1928 - 1940',
        type:'base',
        visible: true, // by default this layer is visible
        source: new TileWMS({ 
	  url: "https://services.datafordeler.dk/LaveMaalebordsblade/topo20_lavemalebordsblade/1.0.0/WMS?username="+daf_user+"&password="+daf_pass,
          params: {
            'LAYERS':'dtk_lave_maalebordsblade',
            'VERSION':'1.3.0',
            'TRANSPARENT':'FALSE',
            'FORMAT': "image/png",
            'STYLES':'default' 
          },          
          attributions: getAttributions()
        })
      }), 
      new LayerTile({
        title:'1842 - 1899',
        type:'base',
        visible: true, // by default this layer is visible
        source: new TileWMS({ 
	  url: "https://services.datafordeler.dk/HoejeMaalebordsblade/topo20_hoejemalebordsblade/1.0.0/WMS?username="+daf_user+"&password="+daf_pass,
          params: {
            'LAYERS':'dtk_hoeje_maalebordsblade',
            'VERSION':'1.3.0',
            'TRANSPARENT':'FALSE',
            'FORMAT': "image/png",
            'STYLES':'default' 
          },          
          attributions: getAttributions()
        })
      })
    ]
  });

export var adresselag= new LayerGroup({
  title: 'Adresselag',
  fold: 'open',
  layers: [  
    new LayerTile({
      title:'Vejnavne',
      type:'overlay',
      visible: false, 
      opacity: 1.0,
      zIndex:1000,
      source: new TileWMS({ 
        url: "https://api.dataforsyningen.dk/forvaltning2?token="+kftoken,
        params: {
          'LAYERS':'Navne_basis_kort',
          'VERSION':'1.1.1',
          'TRANSPARENT':'true',
          'FORMAT': "image/png",
          'STYLES':'', 
        },          
        attributions: getAttributions()
      })
    }),  
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
        attributions: getAttributions()
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
        attributions: getAttributions()
      })
    }),
    new ImageLayer({
      title:'Vejnavnelinjer',
      type:'overlay',
      visible: false,
      opacity: 1.0,
      zIndex:1000,
      source: new ImageWMS({
        url: "https://kort.aws.dk/geoserver/aws4_wms/wms",
        params:{
          'LAYERS':'vejnavnelinjer',
          'VERSION':'1.1.1',
          'TRANSPARENT':'true',
          'FORMAT': "image/png",
          'STYLES':'' 
        },          
        attributions: getAttributions()
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
        attributions: getAttributions()
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
        attributions: getAttributions()
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
        attributions: getAttributions()
      })
    })    
  ]
});

export var lag= new LayerGroup({
    title: 'Andre lag',
    fold: 'close',
    layers: [

        new ImageLayer({
            title:'Terræn',
            type:'overlay',
            visible: false,
            opacity: 1.0,
            zIndex:1000,
            source: new ImageWMS({
                url: "https://services.datafordeler.dk/DHMNedboer/dhm/1.0.0/WMS?username="+daf_user+"&password="+daf_pass,
                params:{
                    'LAYERS':'dhm_terraen_skyggekort',
                    'VERSION':'1.3.0',
                    'TRANSPARENT':'TRUE',
                    'FORMAT': "image/png",
                    'STYLES':'' 
                },                    
                attributions: getAttributions()
            })
        }),

        new ImageLayer({
            title:'Overflade',
            type:'overlay',
            visible: false,
            opacity: 1.0,
            zIndex:1000,
            source: new ImageWMS({
                url: "https://services.datafordeler.dk/DHMNedboer/dhm/1.0.0/WMS?username="+daf_user+"&password="+daf_pass,
                params:{
                    'LAYERS':'dhm_overflade_skyggekort',
                    'VERSION':'1.3.0',
                    'TRANSPARENT':'TRUE',
                    'FORMAT': "image/png",
                    'STYLES':'' 
                },                    
                attributions: getAttributions()
            })
        }),

        new ImageLayer({
            title:'Højdekurver',
            type:'overlay',
            visible: false,
            opacity: 1.0,
            zIndex:1000,
            source: new ImageWMS({
                url: "https://services.datafordeler.dk/DHMNedboer/dhm/1.0.0/WMS?username="+daf_user+"&password="+daf_pass,
                params:{
                    'LAYERS':'dhm_kurve_traditionel',
                    'VERSION':'1.3.0',
                    'TRANSPARENT':'TRUE',
                    'FORMAT': "image/png",
                    'STYLES':'roed' 
                },                    
                attributions: getAttributions()
            })
        }),
        new ImageLayer({
            title:'Retskreds',
            type:'overlay',
            visible: false,
            opacity: 1.0,
            zIndex:1000,
            source: new ImageWMS({
                url: "https://services.datafordeler.dk/DAGIM/dagi/1.0.0/WMS?username="+daf_user+"&password="+daf_pass,
                params:{
                    'LAYERS':'Retskreds',
                    'VERSION':'1.1.1',
                    'TRANSPARENT':'TRUE',
                    'FORMAT': "image/png",
                    'STYLES':'' 
                },                    
                attributions: getAttributions()
            })
        }),
        new ImageLayer({
            title:'Politikreds',
            type:'overlay',
            visible: false,
            opacity: 1.0,
            zIndex:1000,
            source: new ImageWMS({
                url: "https://services.datafordeler.dk/DAGIM/dagi/1.0.0/WMS?username="+daf_user+"&password="+daf_pass,
                params:{
                    'LAYERS':'Politikreds',
                    'VERSION':'1.1.1',
                    'TRANSPARENT':'TRUE',
                    'FORMAT': "image/png",
                    'STYLES':'' 
                },                    
                attributions: getAttributions()
            })
        }),
        new ImageLayer({
            title:'Sogn',
            type:'overlay',
            visible: false,
            opacity: 1.0,
            zIndex:1000,
            source: new ImageWMS({
                url: "https://services.datafordeler.dk/DAGIM/dagi/1.0.0/WMS?username="+daf_user+"&password="+daf_pass,
                params:{
                    'LAYERS':'Sogneinddeling',
                    'VERSION':'1.1.1',
                    'TRANSPARENT':'TRUE',
                    'FORMAT': "image/png",
                    'STYLES':'' 
                },                    
                attributions: getAttributions()
            })
        }),
        new ImageLayer({
            title:'Postnummer',
            type:'overlay',
            visible: false,
            opacity: 1.0,
            zIndex:1000,
            source: new ImageWMS({
                url: "https://services.datafordeler.dk/DAGIM/dagi/1.0.0/WMS?username="+daf_user+"&password="+daf_pass,
                params:{
                    'LAYERS':'Postnummerinddeling',
                    'VERSION':'1.1.1',
                    'TRANSPARENT':'TRUE',
                    'FORMAT': "image/png",
                    'STYLES':'' 
                },                    
                attributions: getAttributions()
            })
        }),
        new ImageLayer({
            title:'Kommune',
            type:'overlay',
            visible: false,
            opacity: 1.0,
            zIndex:1000,
            source: new ImageWMS({
                url: "https://services.datafordeler.dk/DAGIM/dagi/1.0.0/WMS?username="+daf_user+"&password="+daf_pass,
                params:{
                    'LAYERS':'Kommuneinddeling',
                    'VERSION':'1.3.0',
                    'TRANSPARENT':'TRUE',
                    'FORMAT': "image/png",
                    'STYLES':'' 
                },                    
                attributions: getAttributions()
            })
        }),
        new ImageLayer({
            title:'Matrikel',
            type:'overlay',
            visible: false,
            opacity: 1.0,
            zIndex:1000,
            source: new ImageWMS({
                url: "https://services.datafordeler.dk/Matrikel/MatrikelGaeldendeogForeloebigWMS/1.0.0/WMS?username="+daf_user+"&password="+daf_pass,
                params:{
                    'LAYERS':'MatrikelSkel_Gaeldende,Centroide_Gaeldende',
                    'VERSION':'1.3.0',
                    'TRANSPARENT':'TRUE',
                    'FORMAT': "image/png",
                    'STYLES':'' 
                },                    
                attributions: getAttributions()
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
  function callback() {
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

export function mapKort(findkort) {
  let viskort= 'Skærmkort';
  switch (findkort) {
    case 'Skærmkort - grå':
    case 'Skærmkort - dæmpet':
      viskort= 'Skærmkort - dæmpet';
      break;
    case '1980 - 2001':
    case '1953 - 1976':
    case 'Open Street Map':
    case 'Forvaltningskort':
    case 'Skærmkort':
      viskort= 'Skærmkort';
      break;
    case 'Ortofoto':
    case 'Ortofoto Temp 10':
    case 'Ortofoto 2018':
    case 'Ortofoto 2017':
    case 'Ortofoto 2016':
    case 'Ortofoto 2015':
    case 'Ortofoto 2008':
    case 'Ortofoto 2005':
    case 'Ortofoto 2002':
    case 'Ortofoto 1999':
      viskort= 'Ortofoto';
      break;
    case '1928 - 1940':
      viskort= 'Historisk 1928-1940';
      break;
    case '1842 - 1899':
      viskort= 'Historisk 1842-1899';
      break;
  }
  return viskort;
}
