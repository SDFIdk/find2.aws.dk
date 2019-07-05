import {Control} from 'ol/control';
import autocomplete from 'autocomplete.js';
import * as dawaAutocomplete2 from 'dawa-autocomplete2';
import * as util from 'dawa-util';

var dawa= util.getQueryVariable('dawa');
if (!dawa) {
  dawa= 'https://dawa.aws.dk';
}

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

  autocomplete(input, { debug: true, hint: false, templates: { empty: 'empty' }, autoselect: true }, [
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
   // console.log('selected', suggestion, dataset);
    selected(suggestion);
  }).on('autocomplete:cursorchanged', function(even, suggestion, dataset) {
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

function initJordstykke(selected)
{
  var jordstykke = document.createElement('input');
  jordstykke.type='search';
  jordstykke.className = 'input';
  jordstykke.placeholder= 'matrikelnr ejerlav'

  var jordstykkecontainer = document.createElement('div');
  jordstykkecontainer.className = 'container';
  //jordstykkecontainer.className = 'jordstykkeinput ol-control';
  jordstykkecontainer.appendChild(jordstykke);

  initAutocomplete(jordstykke, dawa + "/jordstykker?autocomplete&q=", selected);

  return jordstykkecontainer;
} 

function initVejstykke(selected)
{
  var vejstykke = document.createElement('input');
  vejstykke.type='search';
  vejstykke.className = 'input';
  vejstykke.placeholder= 'matrikelnr ejerlav'

  var vejstykkecontainer = document.createElement('div');
  vejstykkecontainer.className = 'container';
  //vejstykkecontainer.className = 'vejstykkeinput ol-control';
  vejstykkecontainer.appendChild(vejstykke);

  initAutocomplete(vejstykke, dawa + "/vejstykker?autocomplete&q=", selected);

  return vejstykkecontainer;
}

function initSupplerendeBynavn(selected)
{
  var supplerendeBynavn = document.createElement('input');
  supplerendeBynavn.type='search';
  supplerendeBynavn.className = 'input';
  supplerendeBynavn.placeholder= 'matrikelnr ejerlav'

  var supplerendeBynavncontainer = document.createElement('div');
  supplerendeBynavncontainer.className = 'container';
  //supplerendeBynavncontainer.className = 'supplerendeBynavninput ol-control';
  supplerendeBynavncontainer.appendChild(supplerendeBynavn);

  initAutocomplete(supplerendeBynavn, dawa + "/supplerendebynavne2?autocomplete&q=", selected);

  return supplerendeBynavncontainer;
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

    const vejstykkeRessource = ressourcer.find( ressource => ressource.navn === 'Vejstykker' );
    let vejstykkecontainer= initVejstykke(vejstykkeRessource.selected); 
    vejstykkeRessource.element= vejstykkecontainer;

    const supplerendeBynavnRessource = ressourcer.find( ressource => ressource.navn === 'Supplerende bynavne' );
    let supplerendeBynavncontainer= initSupplerendeBynavn(supplerendeBynavnRessource.selected); 
    supplerendeBynavnRessource.element= supplerendeBynavncontainer;

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