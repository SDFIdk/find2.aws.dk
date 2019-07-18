import * as util from 'dawa-util';


export function getDawaUrl() {
	let dawa= util.getQueryVariable('dawa');
	if (!dawa) {
	  dawa= 'https://dawa-test.aws.dk';
	}
	return dawa;
}
