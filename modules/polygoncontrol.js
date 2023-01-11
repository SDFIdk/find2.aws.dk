
import {Control} from 'ol/control';
import {Draw, Modify, Snap} from 'ol/interaction';
import {Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';

async function transformer(koordinaterfrom, to, niveau, koordinaterto) {
  try {
    if (!(Number.isFinite(koordinaterfrom[0]) && koordinaterfrom.length === 2)) {
      for (let i= 0; i<koordinaterfrom.length; i++) {
        koordinaterto.push([]);
        await transformer(koordinaterfrom[i], to, niveau+1, koordinaterto[i]);
      };
    }
    else {
      if (to === 'wgs84') {
        const response = fetch('https://api.dataforsyningen.dk/rest/webproj/v1.0/trans/EPSG:25832/EPSG:4258/'+koordinaterfrom[0].toFixed(3)+','+koordinaterfrom[1].toFixed(3)+'?token=d902ac31b1c3ff2d3e7f6aa7073c6c67');
        let wgs84 = await response.json()
        //console.log(wgs84);
        wgs84= JSON.parse(wgs84);
        koordinaterto.push(wgs84.v2);
        koordinaterto.push(wgs84.v1);
        console.log(koordinaterfrom);
        console.log(koordinaterto);
      }
      else if (to === 'etrs89') {
        const response = fetch('https://api.dataforsyningen.dk/rest/webproj/v1.0/trans/EPSG:4258/EPSG:25832/'+koordinaterfrom[1].toFixed(10)+','+koordinaterfrom[0].toFixed(10)+'?token=d902ac31b1c3ff2d3e7f6aa7073c6c67');
        let etrs89 = await response.json()
        //console.log(etrs89)
        etrs89= JSON.parse(etrs89);
        koordinaterto.push(etrs89.v1.toFixed(3));
        koordinaterto.push(etrs89.v2.toFixed(3));
        console.log(koordinaterfrom);
        console.log(koordinaterto);
      }
    }
    console.log(niveau);
    if (niveau === 0) {
      return koordinaterto;
    }
  }
  catch (e) {
    //console.log(e);
  }
  return null;
}

export var PolygonControl = (function (Control) {
  let tegner= false;
  var source = new VectorSource();

  var vector = new VectorLayer({
    source: source,
    style: new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new Stroke({
        color: '#ffcc33',
        width: 2
      }),
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({
          color: '#ffcc33'
        })
      })
    })
  });

  var draw = new Draw({
    source: source,
    type: 'Polygon'
  });

  var snap = new Snap({source: source});

  var popup;
  function PolygonControl(opt_options) {
    var options = opt_options || {};
    popup= options.popup;

    var button = document.createElement('button');
    button.innerHTML = 'P';

    var element = document.createElement('div');
    element.className = 'polygoncontrol ol-unselectable ol-control';
    element.appendChild(button);

    Control.call(this, {
      element: element,
      target: options.target
    });

    button.addEventListener('click', this.tegnPolygon.bind(this), false);
  }

  if ( Control ) PolygonControl.__proto__ = Control;
  PolygonControl.prototype = Object.create( Control && Control.prototype );
  PolygonControl.prototype.constructor = PolygonControl;

  PolygonControl.prototype.tegnPolygon = async function tegnPolygon () {
   function addInteractions(map) {
      map.addInteraction(draw);
      map.addInteraction(snap);

    }
    tegner= !tegner;
    var element = document.getElementsByClassName('polygoncontrol')[0];
    element.classList.toggle("valgt");
    if (tegner) {
      this.getMap().addLayer(vector);
      var modify = new Modify({source: source});
      this.getMap().addInteraction(modify);
      addInteractions(this.getMap());
    }
    else { 
      let sFeatures= source.getFeatures();
      let koordinater= sFeatures[0].getGeometry().getCoordinates();
      let wgskoordinater= await transformer(koordinater, 'wgs84', 0, [])
      popup.show(koordinater[0][0], JSON.stringify(wgskoordinater));      
      navigator.permissions.query({name: "clipboard-write"}).then(result => {
        if (result.state == "granted" || result.state == "prompt") {
          navigator.clipboard.writeText(JSON.stringify(wgskoordinater));
        }
      });
      //let vFeatures= vector.getFeatures();
      //let geojson= new GeoJSON();
      //let features= geojson.readFeatures(source);    
      this.getMap().removeInteraction(draw);
      this.getMap().removeInteraction(snap);
      this.getMap().removeInteraction(modify);
      source.clear();
      this.getMap().removeLayer(vector);
    }
  };

  return PolygonControl;
}(Control));