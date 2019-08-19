import * as util from 'dawa-util';


export function getDawaUrl() {
	let dawa= util.getQueryVariable('dawa');
	if (!dawa) {
	  dawa= 'https://dawa.aws.dk';
	}
	return dawa;
}

export function setSubdomain(url, subdomain) {
	return url.replace(/\/[A-Za-z0-9_\-]*\./,'\/'+subdomain+'.');
}


export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getKortforsyningstoken() {
	return 'd23aed4ea6f89420aae2fcf89b47e95b';
}