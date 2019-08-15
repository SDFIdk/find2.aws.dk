import Geolocation from 'ol/Geolocation';
import Feature from 'ol/Feature';
import {Vector as VectorSource} from 'ol/source';
import {Vector as VectorLayer} from 'ol/layer';
import Point from 'ol/geom/Point';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {GeolocationControl} from '/modules/geolocationcontrol';

var geolocation= null;

export function getPosition() {
  return geolocation.getPosition();
}

export function show(map) {

  map.getView().setCenter([722125.86, 6178892.29]);

  var positionFeature = new Feature();
  positionFeature.setStyle(new Style({
    image: new CircleStyle({
      radius: 6,
      fill: new Fill({
        color: '#3399CC'
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 2
      })
    })
  }));
  positionFeature.setProperties({popupTekst: '<p>Her er du</p>'});

  geolocation = new Geolocation({
    trackingOptions: {
      enableHighAccuracy: true
    },
    projection: map.getView().getProjection()
  });

  geolocation.setTracking(true);

  let geolocationcontrol= new GeolocationControl();

  let init= false;
  geolocation.on('change', function(evt) {
    if (!init) {
      map.getView().setCenter(geolocation.getPosition());
      map.addControl(geolocationcontrol);
      init= true;
    }
    evt;
    //geolocation.setTracking(false);
  });

  geolocation.on('error', function(evt) {
    console.log(evt);
    //geolocation.setTracking(false);
  });

  geolocation.on('change:position', function() {
    var coordinates = geolocation.getPosition();
    positionFeature.setGeometry(coordinates ?
      new Point(coordinates) : null);
  });

  // var accuracyFeature = new Feature();
  // geolocation.on('change:accuracyGeometry', function() {
  //   accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
  // });

  new VectorLayer({
    map: map,
    source: new VectorSource({
      features: [/* accuracyFeature,*/ positionFeature]
    })
  })

}