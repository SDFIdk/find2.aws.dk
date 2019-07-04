import {Control} from 'ol/control';
import autocomplete from 'autocomplete.js';
import * as dawaAutocomplete2 from 'dawa-autocomplete2';

const host= 'https://dawa.aws.dk/'

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
      adgangsadresserOnly: true
    }
  );

  return element;
}

function initJordstykke(selected)
{
  function search(query, callback) {
    fetch(host + "jordstykker/autocomplete?fuzzy&q="+query+"*")
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
    .then( function ( veje ) { 
      callback(veje);
    });
  }


  var jordstykke = document.createElement('input');
  jordstykke.type='search';
  jordstykke.className = 'input';
  jordstykke.placeholder= 'matrikelnr ejerlav'

  var jordstykkecontainer = document.createElement('div');
  jordstykkecontainer.className = 'container';
  //jordstykkecontainer.className = 'jordstykkeinput ol-control';
  jordstykkecontainer.appendChild(jordstykke);

  autocomplete(jordstykke, { debug: true, hint: false, templates: { empty: 'empty' }, autoselect: true }, [
    {
      source: search,
      displayKey: 'tekst',
      templates: {
        suggestion: function(suggestion) {
          return '<div>' + suggestion.tekst + '</div>';
        }
      }
    }
  ]).on('autocomplete:selected', function(even, suggestion, dataset) {
   // console.log('selected', suggestion, dataset);
    selected(suggestion);
    //visjordstykke(map, suggestion);
  }).on('autocomplete:cursorchanged', function(even, suggestion, dataset) {
    //console.log('cursorchanged', suggestion, dataset);
  });

  return jordstykkecontainer;
}
 
export var MultiSearchControl = (function (Control) {
  function MultiSearchControl(ressourcer) {

    const adresseRessource = ressourcer.find( ressource => ressource.navn === 'Adresser' );
    let adressecontainer= initAdresse(adresseRessource.selected);
    adresseRessource.element= adressecontainer;

    const adgangsadresseRessource = ressourcer.find( ressource => ressource.navn === 'Adgangsadresser' );
    let adgangsadressecontainer= initAdgangsadresse(adgangsadresseRessource.selected);
    adgangsadresseRessource.element= adgangsadressecontainer;

    const jordstykkeRessource = ressourcer.find( ressource => ressource.navn === 'Jordstykker' );
    let jordstykkecontainer= initJordstykke(jordstykkeRessource.selected); 
    jordstykkeRessource.element= jordstykkecontainer;

    let aktuelRessourcenavn= 'Adgangsadresser';
    let aktuelRessource= ressourcer.find( ressource => ressource.navn === aktuelRessourcenavn );

    // selektor til datatype
    let selector = document.createElement('select');
    selector.id='selector';
    selector.className = 'selector';

    ressourcer.forEach( (element) => {
      let option= document.createElement('option');
      option.value= element.navn;
      let content = document.createTextNode(element.navn);
      if (element.navn === aktuelRessourcenavn) {
        option.setAttribute('selected','');
      }
      option.appendChild(content);  
      selector.appendChild(option);  
    })

    var selectorcontainer = document.createElement('div');
    selectorcontainer.className = 'selectorcontainer';
    //jordstykkecontainer.className = 'jordstykkeinput ol-control';
    selectorcontainer.appendChild(selector);

    // control
    var combi = document.createElement('div');
    combi.className = 'multisearchcontainer ol-control';
    //element.className = 'jordstykkeinput ol-control';
    combi.appendChild(selectorcontainer);
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