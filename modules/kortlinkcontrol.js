import {Control} from 'ol/control';
import * as geolocation from './geolocation';
import * as kort from './kort';

export var KortlinkControl = (function (Control) {
  function KortlinkControl(opt_options) {
    var options = opt_options || {};

    var button = document.createElement('button');
    button.innerHTML = 'K';

    var element = document.createElement('div');
    element.className = 'kortlinkcontrol ol-unselectable ol-control';
    element.appendChild(button);

    Control.call(this, {
      element: element,
      target: options.target
    });

    button.addEventListener('click', this.showGeolocation.bind(this), false);
  }

  if ( Control ) KortlinkControl.__proto__ = Control;
  KortlinkControl.prototype = Object.create( Control && Control.prototype );
  KortlinkControl.prototype.constructor = KortlinkControl;

  KortlinkControl.prototype.showGeolocation = function showGeolocation () {
    //this.getMap().getView().setCenter(geolocation.getPosition());

    kort.flyTo(geolocation.getPosition(), this.getMap().getView(), function() {});
  };

  return KortlinkControl;
}(Control));
