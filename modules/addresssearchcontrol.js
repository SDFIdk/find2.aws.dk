import {Control} from 'ol/control';
import * as dawaAutocomplete2 from 'dawa-autocomplete2';

 
export var AddressSearchControl = (function (Control) {
  function AddressSearchControl(opt_options) {
    var options = opt_options || {};

    var input = document.createElement('input');
    input.type='search';
    input.className = 'adresseinput';
    input.placeholder= 'vejnavn husnr, postnr'

    var element = document.createElement('div');
    element.className = 'adresseinput ol-control';
    element.appendChild(input);

    Control.call(this, {
      element: element,
      target: options.target
    });

    dawaAutocomplete2.dawaAutocomplete(input, {
        select: opt_options.selected(this),        
        adgangsadresserOnly: true
      }
    );

  }

  if ( Control ) AddressSearchControl.__proto__ = Control;
  AddressSearchControl.prototype = Object.create( Control && Control.prototype );
  AddressSearchControl.prototype.constructor = AddressSearchControl;

  return AddressSearchControl;
}(Control));