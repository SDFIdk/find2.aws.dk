import {Control} from 'ol/control';
import autocomplete from 'autocomplete.js';

const host= 'https://dawa.aws.dk/'

const ressourcer= [
  {navn: 'Adgangsadresser'},
  {navn: 'Jordstykker'},
  {navn: 'Vejstykker'}
]

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
 
export var MultiSearchControl = (function (Control) {
  function MultiSearchControl(opt_options) {
    let options = opt_options || {};

    let selektor = document.createElement('select');
    selektor.id='selector';
    selektor.className = 'ol-control';

    ressourcer.forEach( (element) => {
      let option= document.createElement('option');
      option.value= element.navn;
      let content = document.createTextNode(element.navn);
      option.appendChild(content);  
      selektor.appendChild(option);  
    })

    var input = document.createElement('input');
    input.type='search';
    input.className = 'jordstykkeinput ol-control';
    input.placeholder= 'matrikelnr ejerlav'

    var element = document.createElement('div');
    element.className = 'jordstykkecontainer ol-control';
    //element.className = 'jordstykkeinput ol-control';
    element.appendChild(input);

    var combi = document.createElement('div');
    combi.className = 'multisearchcontainer ol-control';
    //element.className = 'jordstykkeinput ol-control';
    combi.appendChild(selektor);
    combi.appendChild(element);

    Control.call(this, {
      element: combi,
      target: options.target
    });

    autocomplete(input, { debug: true, hint: false, templates: { empty: 'empty' }, autoselect: true }, [
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
        console.log('selected', suggestion, dataset);
        options.selected(suggestion);
        //visjordstykke(map, suggestion);
      }).on('autocomplete:cursorchanged', function(even, suggestion, dataset) {
        console.log('cursorchanged', suggestion, dataset);
      });

  }

  if ( Control ) MultiSearchControl.__proto__ = Control;
  MultiSearchControl.prototype = Object.create( Control && Control.prototype );
  MultiSearchControl.prototype.constructor = MultiSearchControl;

  return MultiSearchControl;
}(Control));