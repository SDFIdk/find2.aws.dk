
import {Control} from 'ol/control';
import * as geolocation from '/modules/geolocation';
import * as kort from '/modules/kort';

export var GeolocationControl = (function (Control) {
  function GeolocationControl(opt_options) {
    var options = opt_options || {};

    var button = document.createElement('button');
    button.innerHTML = 'L';

    var element = document.createElement('div');
    element.className = 'geolocationcontrol ol-unselectable ol-control';
    element.appendChild(button);

    Control.call(this, {
      element: element,
      target: options.target
    });

    button.addEventListener('click', this.showGeolocation.bind(this), false);
  }

  if ( Control ) GeolocationControl.__proto__ = Control;
  GeolocationControl.prototype = Object.create( Control && Control.prototype );
  GeolocationControl.prototype.constructor = GeolocationControl;

  GeolocationControl.prototype.showGeolocation = function showGeolocation () {
    //this.getMap().getView().setCenter(geolocation.getPosition());

    kort.flyTo(geolocation.getPosition(), this.getMap().getView(), function() {});
  };

  return GeolocationControl;
}(Control));
