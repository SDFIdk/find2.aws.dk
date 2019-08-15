
import {KortlinkControl} from '/modules/kortlinkcontrol';

let kortlinkControl= null;
function visKortlinkControl(map) {
  if  (!kortlinkControl) { 
    kortlinkControl= new KortlinkControl();
    map.addControl(kortlinkControl);
  }
}
function fjernKortlinkControl(map) {
  if  (!kortlinkControl) { 
    map.removeControl(kortlinkControl);
    kortlinkControl= null;
  }
}