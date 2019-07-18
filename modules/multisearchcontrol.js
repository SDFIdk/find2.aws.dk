import {Control} from 'ol/control';
import autocomplete from 'autocomplete.js';
import * as dawaAutocomplete2 from 'dawa-autocomplete2';
import * as util from 'dawa-util';
import * as futil from '/modules/futil';


var dawa= futil.getDawaUrl();

function initAutocomplete(input, url, selected) {

  function search(url) {
    return function search(query, callback) {
      fetch(url+query)
      .catch(function (error) {
        alert(error.message);
        callback([]);
      })
      .then(function(response) {
        if (response.status >=400 && response.status <= 499) {
          response.json().then(function (object) {
            alert(object.type + ': ' + object.title);
          });            
          callback([]);
        }
        else if (response.status >= 200 && response.status <=299 ){
          return response.json();
        }
      }) 
      .then( function ( resultat ) { 
        callback(resultat);
      });
    }
  }

  autocomplete(input, { debug: true, hint: false, templates: { empty: '' }, autoselect: true }, [
    {
      source: search(url),
      displayKey: 'tekst',
      templates: {
        suggestion: function(suggestion) {
          return '<div>' + suggestion.tekst + '</div>';
        }
      }
    }
  ]).on('autocomplete:selected', function(even, suggestion, dataset) {
    even, dataset;
   // console.log('selected', suggestion, dataset);
    selected(suggestion);
  }).on('autocomplete:cursorchanged', function(even, suggestion, dataset) {
    even, suggestion, dataset;
    //console.log('cursorchanged', suggestion, dataset);
  });
}

function initAdresse(selected) {

  var input = document.createElement('input');
  input.type='search';
  input.className = 'input';
  input.placeholder= 'vejnavn husnr, etage. dør, postnr'

  var element = document.createElement('div');
  element.className = 'container';
  element.appendChild(input);

  dawaAutocomplete2.dawaAutocomplete(input, {
      select: selected,        
      adgangsadresserOnly: false
    }
  );

  return element;
}

function initAdgangsadresse(selected) {

  var input = document.createElement('input');
  input.type='search';
  input.className = 'input';
  input.placeholder= 'vejnavn husnr, postnr'

  var element = document.createElement('div');
  element.className = 'container';
  element.appendChild(input);

  dawaAutocomplete2.dawaAutocomplete(input, {
      select: selected,        
      adgangsadresserOnly: true,
      baseUrl: dawa
    }
  );

  return element;
}

function initInput(placeholder, url, selected)
{
  var input = document.createElement('input');
  input.type='search';
  input.className = 'input';
  input.placeholder= placeholder;

  var container = document.createElement('div');
  container.className = 'container';
  //postnummercontainer.className = 'postnummerinput ol-control';
  container.appendChild(input);

  initAutocomplete(input, url, selected);

  return container;
}

export var MultiSearchControl = (function (Control) {
  function MultiSearchControl(ressourcer) {

    let aktuelRessource;

    // selektor til datatype
    let selector = document.createElement('select');
    selector.id='selector';
    selector.className = 'selector';

    ressourcer.forEach(ressource => {

      let option= document.createElement('option');
      option.value= ressource.navn;
      let content = document.createTextNode(ressource.navn);
      if (ressource.init) {
        option.setAttribute('selected','');
       aktuelRessource= ressource;
      }
      option.appendChild(content);  
      selector.appendChild(option); 

      switch (ressource.navn) {
      case 'Adresser':
        ressource.element= initAdresse(ressource.selected);
        break;
      case 'Adgangsadresser':
        ressource.element= initAdgangsadresse(ressource.selected);
        break;
      case 'Vejstykker':
        ressource.element= initInput('vejnavn, kommunenavn', dawa + "/vejstykker?autocomplete&q=", ressource.selected);
        break;
      case 'Navngivne veje':
        ressource.element= initInput('vejnavn, kommunenavn', dawa + "/navngivneveje?autocomplete&q=", ressource.selected);
        break;
      case 'Supplerende bynavne':
        ressource.element= initInput('supplerende bynavn, kommune', dawa + "/supplerendebynavne2?autocomplete&q=", ressource.selected);
        break;
      case 'Postnumre':
        ressource.element= initInput('postnr postnummernavn', dawa + "/postnumre?autocomplete&q=", ressource.selected);
        break;
      case 'Byer':
        ressource.element= initInput('by', dawa + "/stednavne2?autocomplete&undertype=by&q=", ressource.selected);
        break; 
      case 'Stednavne':
        ressource.element= initInput('Stednavne', dawa + "/stednavne2?autocomplete&q=", ressource.selected);
        break;   
      case 'Jordstykker':
        ressource.element= initInput('matrikelnr ejerlavsnavn', dawa + "/jordstykker?autocomplete&q=", ressource.selected);
        break; 
      case 'Ejerlav':
        ressource.element= initInput('ejerlavsnavn', dawa + "/ejerlav?autocomplete&q=", ressource.selected);
        break; 
      case 'Sogne':
        ressource.element= initInput('sognenavn', dawa + "/sogne?autocomplete&q=", ressource.selected);
        break; 
      case 'Kommuner':
        ressource.element= initInput('kommunenavn', dawa + "/kommuner?autocomplete&q=", ressource.selected);
        break; 
      case 'Regioner':
        ressource.element= initInput('regionsnavn', dawa + "/regioner?autocomplete&q=", ressource.selected);
        break; 
      case 'Landsdele':
        ressource.element= initInput('landsdel', dawa + "/landsdele?autocomplete&q=", ressource.selected);
        break; 
      case 'Politikredse':
        ressource.element= initInput('politikredsnavn', dawa + "/politikredse?autocomplete&q=", ressource.selected);
        break; 
      case 'Retskredse':
        ressource.element= initInput('retskredsnavn', dawa + "/retskredse?autocomplete&q=", ressource.selected);
        break; 
      case 'Afstemningsområder':
        ressource.element= initInput('afstemningsområdenavn, kommune', dawa + "/afstemningsomraader?autocomplete&q=", ressource.selected);
        break; 
      case 'Opstillingskredse':
        ressource.element= initInput('opstillingskredsnavn', dawa + "/opstillingskredse?autocomplete&q=", ressource.selected);
        break; 
      case 'Storkredse':
        ressource.element= initInput('storkredsnavn', dawa + "/storkredse?autocomplete&q=", ressource.selected);
        break; 
      case 'Valglandsdele':
        ressource.element= initInput('valglandsdelsnavn', dawa + "/valglandsdele?autocomplete&q=", ressource.selected);
        break; 
      case 'Menighedsrådsafstemningsområder':
        ressource.element= initInput('menighedsrådsafstemningsområdenavn', dawa + "/menighedsraadsafstemningsomraader?autocomplete&q=", ressource.selected);
        break; 
      }
    });

    var selectorcontainer = document.createElement('div');
    selectorcontainer.className = 'selectorcontainer';
    selectorcontainer.appendChild(selector);

    // control
    var combi = document.createElement('div');
    combi.className = 'multisearchcontainer ol-control';
    //element.className = 'jordstykkeinput ol-control';
    if (ressourcer.length !== 1) {
      combi.appendChild(selectorcontainer);
    }
    combi.appendChild(aktuelRessource.element);

    selector.addEventListener('change', (event) => {
      aktuelRessource.element.remove(); 
      let ressource= ressourcer.find( ressource => ressource.navn === event.target.value );      
      combi.appendChild(ressource.element);
      aktuelRessource= ressource;
      aktuelRessource.element.getElementsByClassName('input')[0].focus();
    });

    Control.call(this, {
      element: combi //,
    //  target: options.target
    });

  }

  if ( Control ) MultiSearchControl.__proto__ = Control;
  MultiSearchControl.prototype = Object.create( Control && Control.prototype );
  MultiSearchControl.prototype.constructor = MultiSearchControl;

  return MultiSearchControl;
}(Control));