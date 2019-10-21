
export function getAdresseRolle(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 0:
		navn= "Fastsat til denne";
		break;
	case 1:
		navn= "Kun vejledende";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getAdressestatus(kode) {
	switch (kode) { 
	case 0:
		navn= "Har husnummer (adresse)";
		break;
	case 1:
		navn= "Markeret til at få husnummer (adresse)";
		break;
	case 2:
		navn= "Uden husnummer";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getAfloebsforhold(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "Fælleskloakeret: spildevand + tag- og overfladevand";
		break;
	case 2:
		navn= "Fælleskloakeret: spildevand + delvis tag- og overfladevand";
		break;
	case 3:
		navn= "Fælleskloakeret: spildevand";
		break;
	case 4:
		navn= "Fælleskloakeret: tag- og overfladevand";
		break;
	case 5:
		navn= "Separatkloakeret: spildevand + tag- og overfladevand";
		break;
	case 6:
		navn= "Separatkloakeret: spildevand + delvis tag- og overfladevand";
		break;
	case 7:
		navn= "Separatkloakeret: spildevand";
		break;
	case 8:
		navn= "Separatkloakeret: tag- og overfladevand";
		break;
	case 9:
		navn= "Spildevandskloakeret: Spildevand";
		break;
	case 10:
		navn= "Afløb til spildevandsforsyningens renseanlæg";
		break;
	case 11:
		navn= "Afløb til fællesprivat spildevandsanlæg";
		break;
	case 12:
		navn= "Afløb til fællesprivat kloakledning med tilslutning til spv. renseanlæg";
		break;
	case 20:
		navn= "Afløb til samletank";
		break;
	case 21:
		navn= "Afløb til samletank for toiletvand og mek. rensning af øvr. spildevand";
		break;
	case 29:
		navn= "Mekanisk rensning med nedsivningsanlæg med tilladelse";
		break;
	case 30:
		navn= "Mekanisk rensning med nedsivningsanlæg (tilladelse ikke påkrævet)";
		break;
	case 31:
		navn= "Mekanisk rensning med privat udledn. dir. til vandløb, sø eller hav";
		break;
	case 32:
		navn= "Mekanisk og biologisk rensning (ældre anlæg uden renseklasse)";
		break;
	case 70:
		navn= "Udledning uden rensning direkte til vandløb, søer eller havet";
		break;
	case 75:
		navn= "Blandet afløbsforhold på ejendommen (er specificeret på bygningen)";
		break;
	case 80:
		navn= "Anden type afløb";
		break;
	case 90:
		navn= "Ingen udledning";
		break;
	case 101:
		navn= "SOP: Minirenseanlæg med direkte udledning";
		break;
	case 102:
		navn= "SOP: Minirenseanlæg med udledning til markdræn";
		break;
	case 103:
		navn= "SOP: Minirenseanlæg med nedsivning i faskine";
		break;
	case 104:
		navn= "SOP: Nedsivning til sivedræn";
		break;
	case 105:
		navn= "SOP: Samletank";
		break;
	case 106:
		navn= "SOP: Pileanlæg med nedsivning (uden membran)";
		break;
	case 107:
		navn= "SOP: Pileanlæg uden udledning (med membran)";
		break;
	case 108:
		navn= "SOP: Beplantede filteranlæg med nedsivning i faskine";
		break;
	case 109:
		navn= "SOP: Sandfiltre med P-fældning i bundfældningstanken og direkte udledning";
		break;
	case 110:
		navn= "SOP: Sandfiltre med P-fældning i bundfældningstanken og udledning til markdræn";
		break;
	case 190:
		navn= "SOP: Andet";
		break;
	case 201:
		navn= "SO: Biologisk sandfilter med direkte udledning";
		break;
	case 202:
		navn= "SO: Biologisk sandfilter med udledning til markdræn";
		break;
	case 203:
		navn= "SO: Minirensanlæg med direkte udledning";
		break;
	case 204:
		navn= "SO: Minirenseanlæg med udledning til markdræn";
		break;
	case 205:
		navn= "SO: Beplantede filteranlæg med direkte udledning";
		break;
	case 206:
		navn= "SO: Beplantede filteranlæg med udledning til markdræn";
		break;
	case 290:
		navn= "SO: Andet";
		break;
	case 301:
		navn= "OP: Minirenseanlæg med direkte udledning";
		break;
	case 302:
		navn= "OP: Minirenseanlæg med udledning til markdræn";
		break;
	case 390:
		navn= "OP: Andet";
		break;
	case 401:
		navn= "O: Rodzoneanlæg med direkte udledning";
		break;
	case 402:
		navn= "O: Rodzoneanlæg med udledning til markdræn";
		break;
	case 403:
		navn= "O: Minirenseanlæg med direkte udledning";
		break;
	case 404:
		navn= "O: Minirenseanlæg med udledning til markdræn";
		break;
	case 490:
		navn= "O: Andet";
		break;
	case 501:
		navn= "Øvrige renseløsninger: Mekanisk med direkte udledning";
		break;
	case 502:
		navn= "Øvrige renseløsninger: Mekanisk med udledning til markdræn";
		break;
	case 503:
		navn= "Øvrige renseløsninger: Ældre nedsivningsanlæg med nedsivning til sivebrønd";
		break;
	case 504:
		navn= "Øvrige renseløsninger: Udledning til jordoverfladen";
		break;
	case 505:
		navn= "Øvrige renseløsninger: Urenset";
		break;
	case 590:
		navn= "Øvrige renseløsninger: Andet";
		break;
	case 601:
		navn= "Anden type afløb (større end 30 PE med egen udledning)";
		break;
	case 701:
		navn= "Intet afløb";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getAfvigendeEtager(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 0:
		navn= "Bygningen har ikke afvigende etager";
		break;
	case 10:
		navn= "Bygningen har afvigende etager";
		break;
	case 11:
		navn= "Bygningen indeholder hems";
		break;
	case 12:
		navn= "Bygningen indeholder dobbelt højt rum";
		break;
	case 13:
		navn= "Bygningen indeholder indskudt etage";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getArealtype(kode) {
	switch (kode) { 
	case 1:
		navn= "Type 1";
		break;
	case 2:
		navn= "Type 2";
		break;
	case 3:
		navn= "Type 3";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getArtskode(kode) {
	switch (kode) { 
	case 0:
		navn= "Vigtigste matrikelnummer på ejendommen (normalt med evt. bygning)";
		break;
	case 1:
		navn= "Andre matrikelnumre på ejendommen";
		break;
	case 2:
		navn= "Kode for ejerlejlighed";
		break;
	case 3:
		navn= "Bygning på matrikelnummer (på lejet grund)";
		break;
	case 4:
		navn= "Del af matrikelnummer (parcel) – [kan være fælleslod]";
		break;
	case 5:
		navn= "Umatrikuleret areal";
		break;
	case 6:
		navn= "Umatrikuleret havneareal";
		break;
	case 7:
		navn= "Umatrikuleret jernbaneareal";
		break;
	case 8:
		navn= "Bygning på umatrikuleret areal";
		break;
	case 9:
		navn= "Bygning på umatrikuleret havneareal";
		break;
	case 10:
		navn= "Bygning på umatrikuleret jernbaneareal";
		break;
	case 20:
		navn= "Andet afgivet areal, f. eks. lejet grund";
		break;
	case 21:
		navn= "Tilskyllet";
		break;
	case 22:
		navn= "Bortskyllet";
		break;
	case 23:
		navn= "Eksproprieret til";
		break;
	case 24:
		navn= "Eksproprieret fra";
		break;
	case 25:
		navn= "Dokumenteret arealafvigelse tillagt";
		break;
	case 26:
		navn= "Dokumenteret arealafvigelse afgivet";
		break;
	case 27:
		navn= "Tillagt ved jordfordeling";
		break;
	case 28:
		navn= "Afgivet ved jordfordeling";
		break;
	case 30:
		navn= "(Foreløbig) Vigtigste matrikelnummer på ejendommen (normalt med evt. bygning)";
		break;
	case 31:
		navn= "(Foreløbig) Andre matrikelnumre på ejendommen";
		break;
	case 32:
		navn= "(Foreløbig) Kode for ejerlejlighed";
		break;
	case 33:
		navn= "(Foreløbig) Bygning på matrikelnummer (på lejet grund)";
		break;
	case 34:
		navn= "(Foreløbig) Del af matrikelnummer (parcel)";
		break;
	case 35:
		navn= "(Foreløbig) Umatrikuleret areal";
		break;
	case 36:
		navn= "(Foreløbig) Umatrikuleret havneareal";
		break;
	case 37:
		navn= "(Foreløbig) Umatrikuleret jernbaneareal";
		break;
	case 38:
		navn= "(Foreløbig) Bygning på umatrikuleret havneareal";
		break;
	case 39:
		navn= "(Foreløbig) Bygning på umatrikuleret havneareal";
		break;
	case 40:
		navn= "(Foreløbig) Bygning på umatrikuleret jernbaneareal";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getAsbestholdigtMateriale(kode) {
	let navn= "";
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "Asbestholdigt ydervægsmateriale";
		break;
	case 2:
		navn= "Asbestholdigt tagdækningsmateriale";
		break;
	case 3:
		navn= "Asbestholdigt ydervægs- og tagdækningsmateriale";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getBadeforhold(kode) {
	let navn= '';
	switch (kode) { 
	case "C":
		navn= "Adgang til badeværelse";
		break;
	case "D":
		navn= "Hverken badeværelse eller adgang til badeværelse";
		break;
	case "V":
		navn= "Badeværelser i enheden";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getBBRMessageAarsagskode(kode) {
	switch (kode) { 
	case 20:
		navn= "Denne BBR-Meddelelse er udskrevet på grund af ejerskifte.";
		break;
	case 30:
		navn= "Denne BBR-Meddelelse er udskrevet efter rekvisition.";
		break;
	case 31:
		navn= "Denne BBR-Andelsboligudskrift er udskrevet på grund af rekvisition.";
		break;
	case 40:
		navn= "Denne BBR-Meddelelse er udskrevet på grund af afsluttet byggesag.";
		break;
	case 41:
		navn= "Denne BBR-Meddelelse er udskrevet på grund af indflytning.";
		break;
	case 45:
		navn= "Denne BBR-Meddelelse er udskrevet på grund af ændring uden byggesag.";
		break;
	case 46:
		navn= "Denne BBR-Meddelelse er udskrevet på grund af opdeling af lejligheder.";
		break;
	case 47:
		navn= "Denne BBR-Meddelelse er udskrevet på grund af sammenlægning af lejligheder.";
		break;
	case 48:
		navn= "Denne BBR-Meddelelse er udskrevet på grund af opdeling/ændret opdeling i ejerlejligheder.";
		break;
	case 50:
		navn= "Denne BBR-Meddelelse er udskrevet på grund af, at kommunen har foretaget rettelser af registreringen i BBR. ";
		break;
	case 51:
		navn= "De har til kommunen anmeldt et byggeri som ikke er færdigmeldt. Denne BBR-Meddelelse udskrives… ";
		break;
	case 70:
		navn= "Denne BBR-Meddelelse er udskrevet på grund af matrikulære ændringer.";
		break;
	case 80:
		navn= "Denne BBR-Meddelelse er udskrevet fordi ejer selv eller andre har rettet, slettet eller tilføjet… ";
		break;
	case 81:
		navn= "Denne BBR-Meddelelse er udskrevet fordi skatteforvaltningen har rettet, slettet eller tilføjet… ";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getBBRMessageNiveau(kode) {
	switch (kode) { 
	case 0:
		navn= "Ejendom";
		break;
	case 1:
		navn= "Grund";
		break;
	case 2:
		navn= "Bygning";
		break;
	case 3:
		navn= "Enhed";
		break;
	case 4:
		navn= "Teknisk Anlæg";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getBBRMessageType(kode) {
	switch (kode) { 
	case 0:
		navn= "BBR-Meddelelse";
		break;
	case 1:
		navn= "Registerudskrift";
		break;
	case 2:
		navn= "Andelsboligudskrift";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getBeregningsprincipForArealAfCarport(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "Carportareal er målt efter tagflade";
		break;
	case 2:
		navn= "Carportarealet er målt ½ meter inde på åbne sider";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getBoligtype(kode) {
	let navn= '';
	//kode= parseInt(kode);
	switch (kode) { 
	case "E":
		navn= "Andet (bl.a. institutioner og erhverv)";
		break;
	case '1':
		navn= "Egentlig beboelseslejlighed (boligenhed med eget køkken)";
		break;
	case '2':
		navn= "Blandet erhverv og bolig med eget køkken";
		break;
	case '3':
		navn= "Enkeltværelse (boligenhed med fast kogeinstallation, fælles køkken eller intet køkken).";
		break;
	case '4':
		navn= "Fællesbolig eller fælleshusholdning";
		break;
	case '5':
		navn= "Sommer-/fritidsbolig";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getBygAfloebsforhold(kode) {
	switch (kode) { 
	case 1:
		navn= "Fælleskloakeret: spildevand + tag- og overfladevand";
		break;
	case 2:
		navn= "Fælleskloakeret: spildevand + delvis tag- og overfladevand";
		break;
	case 3:
		navn= "Fælleskloakeret: spildevand";
		break;
	case 4:
		navn= "Fælleskloakeret: tag- og overfladevand";
		break;
	case 5:
		navn= "Separatkloakeret: spildevand + tag- og overfladevand";
		break;
	case 6:
		navn= "Separatkloakeret: spildevand + delvis tag- og overfladevand";
		break;
	case 7:
		navn= "Separatkloakeret: spildevand";
		break;
	case 8:
		navn= "Separatkloakeret: tag- og overfladevand";
		break;
	case 9:
		navn= "Spildevandskloakeret: Spildevand";
		break;
	case 10:
		navn= "Afløb til spildevandsforsyningens renseanlæg";
		break;
	case 11:
		navn= "Afløb til fællesprivat spildevandsanlæg";
		break;
	case 12:
		navn= "Afløb til fællesprivat kloakledning med tilslutning til spv. renseanlæg";
		break;
	case 20:
		navn= "Afløb til samletank";
		break;
	case 21:
		navn= "Afløb til samletank for toiletvand og mek. rensning af øvr. spildevand";
		break;
	case 29:
		navn= "Mekanisk rensning med nedsivningsanlæg med tilladelse";
		break;
	case 30:
		navn= "Mekanisk rensning med nedsivningsanlæg (tilladelse ikke påkrævet)";
		break;
	case 31:
		navn= "Mekanisk rensning med privat udledn. dir. til vandløb, sø eller hav";
		break;
	case 32:
		navn= "Mekanisk og biologisk rensning (ældre anlæg uden renseklasse)";
		break;
	case 70:
		navn= "Udledning uden rensning direkte til vandløb, søer eller havet";
		break;
	case 75:
		navn= "Blandet afløbsforhold på ejendommen (er specificeret på bygningen)";
		break;
	case 80:
		navn= "Anden type afløb";
		break;
	case 90:
		navn= "Ingen udledning";
		break;
	case 101:
		navn= "SOP: Minirenseanlæg med direkte udledning";
		break;
	case 102:
		navn= "SOP: Minirenseanlæg med udledning til markdræn";
		break;
	case 103:
		navn= "SOP: Minirenseanlæg med nedsivning i faskine";
		break;
	case 104:
		navn= "SOP: Nedsivning til sivedræn";
		break;
	case 105:
		navn= "SOP: Samletank";
		break;
	case 106:
		navn= "SOP: Pileanlæg med nedsivning (uden membran)";
		break;
	case 107:
		navn= "SOP: Pileanlæg uden udledning (med membran)";
		break;
	case 108:
		navn= "SOP: Beplantede filteranlæg med nedsivning i faskine";
		break;
	case 109:
		navn= "SOP: Sandfiltre med P-fældning i bundfældningstanken og direkte udledning";
		break;
	case 110:
		navn= "SOP: Sandfiltre med P-fældning i bundfældningstanken og udledning til markdræn";
		break;
	case 190:
		navn= "SOP: Andet";
		break;
	case 201:
		navn= "SO: Biologisk sandfilter med direkte udledning";
		break;
	case 202:
		navn= "SO: Biologisk sandfilter med udledning til markdræn";
		break;
	case 203:
		navn= "SO: Minirensanlæg med direkte udledning";
		break;
	case 204:
		navn= "SO: Minirenseanlæg med udledning til markdræn";
		break;
	case 205:
		navn= "SO: Beplantede filteranlæg med direkte udledning";
		break;
	case 206:
		navn= "SO: Beplantede filteranlæg med udledning til markdræn";
		break;
	case 290:
		navn= "SO: Andet";
		break;
	case 301:
		navn= "OP: Minirenseanlæg med direkte udledning";
		break;
	case 302:
		navn= "OP: Minirenseanlæg med udledning til markdræn";
		break;
	case 390:
		navn= "OP: Andet";
		break;
	case 401:
		navn= "O: Rodzoneanlæg med direkte udledning";
		break;
	case 402:
		navn= "O: Rodzoneanlæg med udledning til markdræn";
		break;
	case 403:
		navn= "O: Minirenseanlæg med direkte udledning";
		break;
	case 404:
		navn= "O: Minirenseanlæg med udledning til markdræn";
		break;
	case 490:
		navn= "O: Andet";
		break;
	case 501:
		navn= "Øvrige renseløsninger: Mekanisk med direkte udledning";
		break;
	case 502:
		navn= "Øvrige renseløsninger: Mekanisk med udledning til markdræn";
		break;
	case 503:
		navn= "Øvrige renseløsninger: Ældre nedsivningsanlæg med nedsivning til sivebrønd";
		break;
	case 504:
		navn= "Øvrige renseløsninger: Udledning til jordoverfladen";
		break;
	case 505:
		navn= "Øvrige renseløsninger: Urenset";
		break;
	case 590:
		navn= "Øvrige renseløsninger: Andet";
		break;
	case 601:
		navn= "Anden type afløb (større end 30 PE med egen udledning)";
		break;
	case 701:
		navn= "Intet afløb";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getBygAnvendelse(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 110:
		navn= "Stuehus til landbrugsejendom";
		break;
	case 120:
		navn= "Fritliggende enfamilieshus (parcelhus)";
		break;
	case 121:
		navn= "Sammenbygget enfamiliehus";
		break;
	case 130:
		navn= "(UDFASES) Række-, kæde-, eller dobbelthus (lodret adskillelse mellem enhederne).";
		break;
	case 131:
		navn= "Række- og kædehus";
		break;
	case 132:
		navn= "Dobbelthus";
		break;
	case 140:
		navn= "Etagebolig-bygning, flerfamiliehus eller to-familiehus";
		break;
	case 150:
		navn= "Kollegium";
		break;
	case 160:
		navn= "Boligbygning til døgninstitution";
		break;
	case 185:
		navn= "Anneks i tilknytning til helårsbolig.";
		break;
	case 190:
		navn= "Anden bygning til helårsbeboelse";
		break;
	case 210:
		navn= "(UDFASES) Bygning til erhvervsmæssig produktion vedrørende landbrug, gartneri, råstofudvinding o. lign ";
		break;
	case 211:
		navn= "Stald til svin";
		break;
	case 212:
		navn= "Stald til kvæg, får mv.";
		break;
	case 213:
		navn= "Stald til fjerkræ";
		break;
	case 214:
		navn= "Minkhal";
		break;
	case 215:
		navn= "Væksthus";
		break;
	case 216:
		navn= "Lade til foder, afgrøder mv.";
		break;
	case 217:
		navn= "Maskinhus, garage mv.";
		break;
	case 218:
		navn= "Lade til halm, hø mv.";
		break;
	case 219:
		navn= "Anden bygning til landbrug mv.";
		break;
	case 220:
		navn= "(UDFASES) Bygning til erhvervsmæssig produktion vedrørende industri, håndværk m.v. (fabrik, værksted o.lign.) ";
		break;
	case 221:
		navn= "Bygning til industri med integreret produktionsapparat";
		break;
	case 222:
		navn= "Bygning til industri uden integreret produktionsapparat";
		break;
	case 223:
		navn= "Værksted";
		break;
	case 229:
		navn= "Anden bygning til produktion";
		break;
	case 230:
		navn= "(UDFASES) El-, gas-, vand- eller varmeværk, forbrændingsanstalt m.v.";
		break;
	case 231:
		navn= "Bygning til energiproduktion";
		break;
	case 232:
		navn= "Bygning til forsyning- og energidistribution";
		break;
	case 233:
		navn= "Bygning til vandforsyning";
		break;
	case 234:
		navn= "Bygning til håndtering af affald og spildevand";
		break;
	case 239:
		navn= "Anden bygning til energiproduktion og -distribution";
		break;
	case 290:
		navn= "(UDFASES) Anden bygning til landbrug, industri etc.";
		break;
	case 310:
		navn= "(UDFASES) Transport- og garageanlæg (fragtmandshal, lufthavnsbygning, banegårdsbygning, parkeringshus). Garage med plads til et eller to køretøjer registreres med anvendelseskode 910 ";
		break;
	case 311:
		navn= "Bygning til jernbane- og busdrift";
		break;
	case 312:
		navn= "Bygning til luftfart";
		break;
	case 313:
		navn= "Bygning til parkering- og transportanlæg";
		break;
	case 314:
		navn= "Bygning til parkering af flere end to køretøjer i tilknytning til boliger";
		break;
	case 315:
		navn= "Havneanlæg";
		break;
	case 319:
		navn= "Andet transportanlæg";
		break;
	case 320:
		navn= "(UDFASES) Bygning til kontor, handel, lager, herunder offentlig administration";
		break;
	case 321:
		navn= "Bygning til kontor";
		break;
	case 322:
		navn= "Bygning til detailhandel";
		break;
	case 323:
		navn= "Bygning til lager";
		break;
	case 324:
		navn= "Butikscenter";
		break;
	case 325:
		navn= "Tankstation";
		break;
	case 329:
		navn= "Anden bygning til kontor, handel og lager";
		break;
	case 330:
		navn= "(UDFASES) Bygning til hotel, restaurant, vaskeri, frisør og anden servicevirksomhed";
		break;
	case 331:
		navn= "Hotel, kro eller konferencecenter med overnatning";
		break;
	case 332:
		navn= "Bed & breakfast mv.";
		break;
	case 333:
		navn= "Restaurant, café og konferencecenter uden overnatning";
		break;
	case 334:
		navn= "Privat servicevirksomhed som frisør, vaskeri, netcafé mv.";
		break;
	case 339:
		navn= "Anden bygning til serviceerhverv";
		break;
	case 390:
		navn= "(UDFASES) Anden bygning til transport, handel etc";
		break;
	case 410:
		navn= "(UDFASES) Bygning til biograf, teater, erhvervsmæssig udstilling, bibliotek, museum, kirke o. lign. ";
		break;
	case 411:
		navn= "Biograf, teater, koncertsted mv.";
		break;
	case 412:
		navn= "Museum";
		break;
	case 413:
		navn= "Bibliotek";
		break;
	case 414:
		navn= "Kirke eller anden bygning til trosudøvelse for statsanerkendte trossamfund";
		break;
	case 415:
		navn= "Forsamlingshus";
		break;
	case 416:
		navn= "Forlystelsespark";
		break;
	case 419:
		navn= "Anden bygning til kulturelle formål";
		break;
	case 420:
		navn= "(UDFASES) Bygning til undervisning og forskning (skole, gymnasium, forskningslabratorium o.lign.). ";
		break;
	case 421:
		navn= "Grundskole";
		break;
	case 422:
		navn= "Universitet";
		break;
	case 429:
		navn= "Anden bygning til undervisning og forskning";
		break;
	case 430:
		navn= "(UDFASES) Bygning til hospital, sygehjem, fødeklinik o. lign.";
		break;
	case 431:
		navn= "Hospital og sygehus";
		break;
	case 432:
		navn= "Hospice, behandlingshjem mv.";
		break;
	case 433:
		navn= "Sundhedscenter, lægehus, fødeklinik mv.";
		break;
	case 439:
		navn= "Anden bygning til sundhedsformål";
		break;
	case 440:
		navn= "(UDFASES) Bygning til daginstitution";
		break;
	case 441:
		navn= "Daginstitution";
		break;
	case 442:
		navn= "Servicefunktion på døgninstitution";
		break;
	case 443:
		navn= "Kaserne";
		break;
	case 444:
		navn= "Fængsel, arresthus mv.";
		break;
	case 449:
		navn= "Anden bygning til institutionsformål";
		break;
	case 490:
		navn= "(UDFASES) Bygning til anden institution, herunder kaserne, fængsel o. lign.";
		break;
	case 510:
		navn= "Sommerhus";
		break;
	case 520:
		navn= "(UDFASES) Bygning til feriekoloni, vandrehjem o.lign. bortset fra sommerhus";
		break;
	case 521:
		navn= "Feriecenter, center til campingplads mv.";
		break;
	case 522:
		navn= "Bygning med ferielejligheder til erhvervsmæssig udlejning";
		break;
	case 523:
		navn= "Bygning med ferielejligheder til eget brug";
		break;
	case 529:
		navn= "Anden bygning til ferieformål";
		break;
	case 530:
		navn= "(UDFASES) Bygning i forbindelse med idrætsudøvelse (klubhus, idrætshal, svømmehal o. lign.) ";
		break;
	case 531:
		navn= "Klubhus i forbindelse med fritid og idræt";
		break;
	case 532:
		navn= "Svømmehal";
		break;
	case 533:
		navn= "Idrætshal";
		break;
	case 534:
		navn= "Tribune i forbindelse med stadion";
		break;
	case 535:
		navn= "Rideskole";
		break;
	case 539:
		navn= "Anden bygning til idrætformål";
		break;
	case 540:
		navn= "Kolonihavehus";
		break;
	case 585:
		navn= "Anneks i tilknytning til fritids- og sommerhus";
		break;
	case 590:
		navn= "Anden bygning til fritidsformål";
		break;
	case 910:
		navn= "Garage (med plads til et eller to køretøjer)";
		break;
	case 920:
		navn= "Carport";
		break;
	case 930:
		navn= "Udhus";
		break;
	case 940:
		navn= "Drivhus";
		break;
	case 950:
		navn= "Fritliggende overdækning";
		break;
	case 960:
		navn= "Fritliggende udestue";
		break;
	case 970:
		navn= "Tiloversbleven landbrugsbygning";
		break;
	case 990:
		navn= "Faldefærdig bygning";
		break;
	case 999:
		navn= "Ukendt bygning";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getByggesagskode(kode) {
	switch (kode) { 
	case 1:
		navn= "BR - Tilladelsessag uden ibrugtagningstilladelse";
		break;
	case 2:
		navn= "BR - Anmeldelsessag (garager, carporte, udhuse og nedrivning)";
		break;
	case 3:
		navn= "BR - Tilladelsessag med ibrugtagningstilladelse";
		break;
	case 4:
		navn= "BR - Tilladelsessag landbrugsbygning";
		break;
	case 5:
		navn= "BR - Anmeldelsessag (øvrige)";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getByggeskadeforsikringsselskab(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 0:
		navn= "Ingen byggeskadeforsikring";
		break;
	case 1:
		navn= "Tryg";
		break;
	case 2:
		navn= "Topdanmark";
		break;
	case 4:
		navn= "Codan";
		break;
	case 5:
		navn= "If Forsikring";
		break;
	case 6:
		navn= "Alm. Brand";
		break;
	case 7:
		navn= "Danske Forsikring";
		break;
	case 8:
		navn= "Caplloyd A/S";
		break;
	case 10:
		navn= "Købstædernes Forsikring";
		break;
	case 11:
		navn= "ALKA";
		break;
	case 12:
		navn= "Frida Forsikring Agentur";
		break;
	case 13:
		navn= "NemForsikring";
		break;
	case 14:
		navn= "AXA";
		break;
	case 15:
		navn= "Husejernes Forsikring";
		break;
	case 16:
		navn= "Garbo";
		break;
	case 17:
		navn= "Marsh og McLennan Agency A/S";
		break;
	case 18:
		navn= "First Marine";
		break;
	case 99:
		navn= "Ingen forsikring på grund af dispensation";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getBygherreForhold(kode) {
	switch (kode) { 
	case 10:
		navn= "Privatpersoner eller interessentskab";
		break;
	case 20:
		navn= "Alment boligselskab";
		break;
	case 30:
		navn= "Aktie-, anpart- eller andet selskab (undtagen interessent­skab)";
		break;
	case 40:
		navn= "Forening, legat eller selvejende institution";
		break;
	case 41:
		navn= "Privat andelsboligforening";
		break;
	case 50:
		navn= "Den kommune, hvori ejendommen er beliggende";
		break;
	case 60:
		navn= "Anden primærkommune";
		break;
	case 70:
		navn= "Region";
		break;
	case 80:
		navn= "Staten";
		break;
	case 90:
		navn= "Andet, herunder moderejendomme for bebyggelser, der er op­delt i ejerlejligheder samt ejendomme, der ejes af flere ka­te­gorier af ejere ";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getBygningSortering(kode) {
	switch (kode) { 
	case 0:
		navn= "Bygnings nummer";
		break;
	case 1:
		navn= "Vejkode";
		break;
	case 2:
		navn= "Vejnavn";
		break;
	case 3:
		navn= "Husnummer";
		break;
	case 4:
		navn= "Postnummer";
		break;
	case 5:
		navn= "Postdistrikt";
		break;
	case 6:
		navn= "Anvendelseskode (samt som klartekst i tooltip)";
		break;
	case 9:
		navn= "Sagsnummer";
		break;
	case 10:
		navn= "Opførelsesår";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getBygSupplerendeVarme(kode) {
	switch (kode) { 
	case 0:
		navn= "Ikke oplyst";
		break;
	case 1:
		navn= "Varmepumpeanlæg";
		break;
	case 2:
		navn= "Ovne til fast brændsel (brændeovn o. lign.)";
		break;
	case 3:
		navn= "Ovne til flydende brændsel";
		break;
	case 4:
		navn= "Solpaneler";
		break;
	case 5:
		navn= "Pejs";
		break;
	case 6:
		navn= "Gasradiator";
		break;
	case 7:
		navn= "Elovne, elpaneler";
		break;
	case 10:
		navn= "Biogasanlæg";
		break;
	case 80:
		navn= "Andet";
		break;
	case 90:
		navn= "Bygningen har ingen supplerende varme";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getBygVandforsyning(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "Alment vandforsyningsanlæg (tidligere offentligt)";
		break;
	case 2:
		navn= "Privat, alment vandforsyningsanlæg";
		break;
	case 3:
		navn= "Enkeltindvindingsanlæg (egen boring til 1 eller 2 ejendomme)";
		break;
	case 4:
		navn= "Brønd";
		break;
	case 6:
		navn= "Ikke alment vandforsyningsanlæg (forsyner < 10 ejendomme)";
		break;
	case 7:
		navn= "Blandet vandforsyning";
		break;
	case 9:
		navn= "Ingen vandforsyning";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getBygVarmeinstallation(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "Fjernvarme/blokvarme (radiatorsystemer el. varmluftanlæg)";
		break;
	case 2:
		navn= "Centralvarme fra eget anlæg, et-kammer fyr";
		break;
	case 3:
		navn= "Ovne (kakkelovne, kamin, brændeovne o.l.)";
		break;
	case 5:
		navn= "Varmepumpe";
		break;
	case 6:
		navn= "Centralvarme med to fyringsenheder (fast og olie eller gas)";
		break;
	case 7:
		navn= "Elovne, elpaneler";
		break;
	case 8:
		navn= "Gasradiator";
		break;
	case 9:
		navn= "Ingen varmeinstallation";
		break;
	case 99:
		navn= "Blandet (Kræver specifikation på enhedsniveau)";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getDispensationFritagelseIftKollektivVarmeforsyning(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "Dispensation er tidsbegrænset";
		break;
	case 2:
		navn= "Dispensationen er ikke tidsbegrænset";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getDriftstatus(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "I drift";
		break;
	case 2:
		navn= "Ikke i drift";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getEjendomstype(kode) {
	switch (kode) { 
	case 1:
		navn= "Matrikuleret Areal";
		break;
	case 2:
		navn= "BPFG";
		break;
	case 3:
		navn= "Ejerlejlighed";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getEjerforholdskode(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 10:
		navn= "Privatpersoner eller interessentskab";
		break;
	case 20:
		navn= "Alment boligselskab";
		break;
	case 30:
		navn= "Aktie-, anpart- eller andet selskab (undtagen interessent­skab)";
		break;
	case 40:
		navn= "Forening, legat eller selvejende institution";
		break;
	case 41:
		navn= "Privat andelsboligforening";
		break;
	case 50:
		navn= "Den kommune, hvori ejendommen er beliggende";
		break;
	case 60:
		navn= "Anden primærkommune";
		break;
	case 70:
		navn= "Region";
		break;
	case 80:
		navn= "Staten";
		break;
	case 90:
		navn= "Andet, herunder moderejendomme for bebyggelser, der er opdelt i ejerlejligheder samt ejendomme, der ejes af flere kategorier af ejere ";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getElevator(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 0:
		navn= "Der er ikke elevator i opgangen/bygningen";
		break;
	case 1:
		navn= "Der findes person- eller vareelevator i opgangen/bygningen";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getEnergiforsyning(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "Gas fra værk";
		break;
	case 2:
		navn= "230 V el fra værk";
		break;
	case 3:
		navn= "400 V el fra værk";
		break;
	case 4:
		navn= "Både 230 V el og gas fra værk";
		break;
	case 5:
		navn= "Både 400 V el og gas fra værk";
		break;
	case 6:
		navn= "Hverken el eller gas fra værk";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getEnhAnvendelse(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 110:
		navn= "Stuehus til landbrugsejendom";
		break;
	case 120:
		navn= "Fritliggende enfamilieshus (parcelhus).";
		break;
	case 121:
		navn= "Sammenbygget enfamiliehus";
		break;
	case 130:
		navn= "(UDFASES) Række-, kæde- eller dobbelthus (lodret adskillelse mellem enhederne).";
		break;
	case 131:
		navn= "Række- og kædehus";
		break;
	case 132:
		navn= "Dobbelthus";
		break;
	case 140:
		navn= "Bolig i etageejendom, flerfamiliehus eller to-familiehus";
		break;
	case 150:
		navn= "Kollegiebolig";
		break;
	case 160:
		navn= "Bolig i døgninstitution";
		break;
	case 185:
		navn= "Anneks i tilknytning til helårsbolig";
		break;
	case 190:
		navn= "Anden enhed til helårsbeboelse";
		break;
	case 210:
		navn= "(UDFASES) Erhvervsmæssig produktion vedrørende landbrug, skovbrug, gartneri, råstofudvinding og lign. ";
		break;
	case 211:
		navn= "Stald til svin";
		break;
	case 212:
		navn= "Stald til kvæg, får mv.";
		break;
	case 213:
		navn= "Stald til fjerkræ";
		break;
	case 214:
		navn= "Minkhal";
		break;
	case 215:
		navn= "Væksthus";
		break;
	case 216:
		navn= "Lade til foder, afgrøder mv.";
		break;
	case 217:
		navn= "Maskinhus, garage mv.";
		break;
	case 218:
		navn= "Lade til halm, hø mv.";
		break;
	case 219:
		navn= "Anden enhed til landbrug mv.";
		break;
	case 220:
		navn= "(UDFASES) Erhvervsmæssig produktion vedrørende industri, håndværk m.v. (fabrik, værksted o. lign.) ";
		break;
	case 221:
		navn= "Enhed til industri med integreret produktionsapparat";
		break;
	case 222:
		navn= "Enhed til industri uden integreret produktionsapparat";
		break;
	case 223:
		navn= "Værksted";
		break;
	case 229:
		navn= "Anden enhed til produktion";
		break;
	case 230:
		navn= "(UDFASES) El-, gas-, vand- eller varmeværk, forbrændingsanstalt o. lign.";
		break;
	case 231:
		navn= "Enhed til energiproduktion";
		break;
	case 232:
		navn= "Enhed til forsyning- og energidistribution";
		break;
	case 233:
		navn= "Enhed til vandforsyning";
		break;
	case 234:
		navn= "Enhed til håndtering af affald og spildevand";
		break;
	case 239:
		navn= "Anden enhed til energiproduktion og -distribution";
		break;
	case 290:
		navn= "(UDFASES) Anden enhed til produktion og lager i forbindelse med landbrug, industri o. lign. ";
		break;
	case 310:
		navn= "(UDFASES) Transport- og garageanlæg (fragtmandshal, lufthavnsbygning,banegårdsbygning o. lign.) ";
		break;
	case 311:
		navn= "Enhed til jernbane- og busdrift";
		break;
	case 312:
		navn= "Enhed til luftfart";
		break;
	case 313:
		navn= "Enhed til parkerings- og transportanlæg";
		break;
	case 314:
		navn= "Enhed til parkering af flere end to køretøjer i tilknytning til boliger";
		break;
	case 315:
		navn= "Havneanlæg";
		break;
	case 319:
		navn= "Andet transportanlæg";
		break;
	case 320:
		navn= "(UDFASES) Engroshandel og lager.";
		break;
	case 321:
		navn= "Enhed til kontor";
		break;
	case 322:
		navn= "Enhed til detailhandel";
		break;
	case 323:
		navn= "Enhed til lager";
		break;
	case 324:
		navn= "Butikscenter";
		break;
	case 325:
		navn= "Tankstation";
		break;
	case 329:
		navn= "Anden enhed til kontor, handel og lager";
		break;
	case 330:
		navn= "(UDFASES) Detailhandel m.v.";
		break;
	case 331:
		navn= "Hotel, kro eller konferencecenter med overnatning";
		break;
	case 332:
		navn= "Bed & breakfast mv.";
		break;
	case 333:
		navn= "Restaurant, café og konferencecenter uden overnatning";
		break;
	case 334:
		navn= "Privat servicevirksomhed som frisør, vaskeri, netcafé mv.";
		break;
	case 339:
		navn= "Anden enhed til serviceerhverv";
		break;
	case 340:
		navn= "(UDFASES) Pengeinstitut, forsikringsvirksomhed m.v.";
		break;
	case 350:
		navn= "(UDFASES) Kontor og liberale erhverv bortset fra offentlig administration (kontorer for advokater, rådgivende ingeniører, klinikker o.lign.) ";
		break;
	case 360:
		navn= "(UDFASES) Offentlig administration.";
		break;
	case 370:
		navn= "(UDFASES) Hotel, restauration, vaskeri, frisør og anden servicevirksomhed.";
		break;
	case 390:
		navn= "(UDFASES) Anden enhed til handel, transport etc.";
		break;
	case 410:
		navn= "(UDFASES) Biograf, teater, erhvervsmæssig udstilling m.v.";
		break;
	case 411:
		navn= "Biograf, teater, koncertsted mv.";
		break;
	case 412:
		navn= "Museum";
		break;
	case 413:
		navn= "Bibliotek";
		break;
	case 414:
		navn= "Kirke eller anden enhed til trosudøvelse for statsanerkendte trossamfund";
		break;
	case 415:
		navn= "Forsamlingshus";
		break;
	case 416:
		navn= "Forlystelsespark";
		break;
	case 419:
		navn= "Anden enhed til kulturelle formål";
		break;
	case 420:
		navn= "(UDFASES) Bibliotek, museum, kirke o. lign.";
		break;
	case 421:
		navn= "Grundskole";
		break;
	case 422:
		navn= "Universitet";
		break;
	case 429:
		navn= "Anden enhed til undervisning og forskning";
		break;
	case 430:
		navn= "(UDFASES) Undervisning og forskning (skole, gymnasium, forskningslaboratorium).";
		break;
	case 431:
		navn= "Hospital og sygehus";
		break;
	case 432:
		navn= "Hospice, behandlingshjem mv.";
		break;
	case 433:
		navn= "Sundhedscenter, lægehus, fødeklinik mv.";
		break;
	case 439:
		navn= "Anden enhed til sundhedsformål";
		break;
	case 440:
		navn= "(UDFASES) Hospital, fødeklinik o. lign.";
		break;
	case 441:
		navn= "Daginstitution";
		break;
	case 442:
		navn= "Servicefunktion på døgninstitution";
		break;
	case 443:
		navn= "Kaserne";
		break;
	case 444:
		navn= "Fængsel, arresthus mv.";
		break;
	case 449:
		navn= "Anden enhed til institutionsformål";
		break;
	case 450:
		navn= "(UDFASES) Daginstitution.";
		break;
	case 490:
		navn= "(UDFASES) Anden institution, herunder kaserne, fængsel m.v.";
		break;
	case 510:
		navn= "Sommerhus.";
		break;
	case 520:
		navn= "(UDFASES) Enhed til feriekoloni, vandrehjem o.lign. bortset fra sommerhus";
		break;
	case 521:
		navn= "Feriecenter, center til campingplads mv.";
		break;
	case 522:
		navn= "Ferielejlighed til erhvervsmæssig udlejning";
		break;
	case 523:
		navn= "Ferielejlighed til eget brug";
		break;
	case 529:
		navn= "Anden enhed til ferieformål";
		break;
	case 530:
		navn= "(UDFASES) Enhed i forbindelse med idrætsudøvelse (klubhus, idrætshal, svømmehal o. lign.). ";
		break;
	case 531:
		navn= "Klubhus i forbindelse med fritid- og idræt";
		break;
	case 532:
		navn= "Svømmehal";
		break;
	case 533:
		navn= "Idrætshal";
		break;
	case 534:
		navn= "Tribune i forbindelse med stadion";
		break;
	case 535:
		navn= "Rideskole";
		break;
	case 539:
		navn= "Anden enhed til idrætsformål";
		break;
	case 540:
		navn= "Kolonihavehus";
		break;
	case 585:
		navn= "Anneks i tilknytning til fritids- og sommerhus";
		break;
	case 590:
		navn= "Anden enhed til fritidsformål";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getEnhedHvorSkalEnhedVises(kode) {
	switch (kode) { 
	case 0:
		navn= "Vis Enheder under Opgange";
		break;
	case 1:
		navn= "Vis Enheder under Etager";
		break;
	case 2:
		navn= "Vis Enheder under både Opgange og Etager";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getEnhedSortering(kode) {
	switch (kode) { 
	case 0:
		navn= "Bygnings nummer";
		break;
	case 1:
		navn= "Vejkode";
		break;
	case 2:
		navn= "Vejnavn";
		break;
	case 3:
		navn= "Husnummer";
		break;
	case 4:
		navn= "Etage";
		break;
	case 5:
		navn= "Side/dør";
		break;
	case 6:
		navn= "Postnummer";
		break;
	case 7:
		navn= "Postdistrikt";
		break;
	case 8:
		navn= "Anvendelseskode (samt som klartekst i tooltip)";
		break;
	case 10:
		navn= "Sagsnummer";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getEnhSupplerendeVarme(kode) {
	switch (kode) { 
	case 0:
		navn= "Ikke oplyst";
		break;
	case 1:
		navn= "Varmepumpeanlæg";
		break;
	case 2:
		navn= "Ovne til fast brændsel (brændeovn o. lign.)";
		break;
	case 3:
		navn= "Ovne til flydende brændsel";
		break;
	case 4:
		navn= "Solpaneler";
		break;
	case 5:
		navn= "Pejs";
		break;
	case 6:
		navn= "Gasradiator";
		break;
	case 7:
		navn= "Elovne, elpaneler";
		break;
	case 10:
		navn= "Biogasanlæg";
		break;
	case 80:
		navn= "Andet";
		break;
	case 90:
		navn= "Bygningen har ingen supplerende varme";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getEnhVarmeinstallation(kode) {
	switch (kode) { 
	case 1:
		navn= "Fjernvarme/blokvarme (radiatorsystemer el. varmluftanlæg)";
		break;
	case 2:
		navn= "Centralvarme fra eget anlæg, et-kammer fyr";
		break;
	case 3:
		navn= "Ovne (kakkelovne, kamin, brændeovne o.l.)";
		break;
	case 5:
		navn= "Varmepumpe";
		break;
	case 6:
		navn= "Centralvarme med to fyringsenheder (fast og olie eller gas)";
		break;
	case 7:
		navn= "Elovne, elpaneler";
		break;
	case 8:
		navn= "Gasradiator";
		break;
	case 9:
		navn= "Ingen varmeinstallation";
		break;
	case 99:
		navn= "Blandet (Kræver specifikation på enhedsniveau)";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getEtageSortering(kode) {
	switch (kode) { 
	case 0:
		navn= "Etagebetegnelse";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getEtageType(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 0:
		navn= "Ikke tagetage";
		break;
	case 1:
		navn= "Tagetage";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getFordelingsnoegle(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "Manuel fordeling";
		break;
	case 2:
		navn= "Ligelig fordeling";
		break;
	case 3:
		navn= "Institutions fordeling";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getForretningsHaendelse(kode) {
	switch (kode) { 
	case "BUH":
		navn= "Bygning uden Husnummer";
		break;
	case "BYG":
		navn= "Bygning";
		break;
	case "ENH":
		navn= "Enhed";
		break;
	case "GRU":
		navn= "Grund";
		break;
	case "SAG":
		navn= "BBR-sag";
		break;
	case "TEK":
		navn= "Teknisk Anlæg";
		break;
	case "TUH":
		navn= "Teknisk Anlæg uden Husnummer";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getForretningsOmraade(kode) {
	switch (kode) { 
	case "BBR":
		navn= "54.15.05.05";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getForretningsProcess(kode) {
	switch (kode) { 
	case 0:
		navn= "Ikke angivet";
		break;
	case 1:
		navn= "Oprettet grundet nybyggeri";
		break;
	case 2:
		navn= "Opdateret grundet til/ombygning";
		break;
	case 3:
		navn= "Opdateret grundet nedrivning";
		break;
	case 4:
		navn= "Fejlrettelse af faktiske fejlregistreringer og udeladelser";
		break;
	case 5:
		navn= "Faktisk udført ændring uden byggesagsbehandling";
		break;
	case 6:
		navn= "Opdeling af enheder";
		break;
	case 7:
		navn= "Sammenlægning af enheder";
		break;
	case 8:
		navn= "Opdateret som følge af digital indberetning fra borger mm.";
		break;
	case 9:
		navn= "Opdateret som følge af digital indberetning fra SKAT";
		break;
	case 10:
		navn= "Anmeldelsessag";
		break;
	case 11:
		navn= "Tilladelsessag";
		break;
	case 12:
		navn= "Opdateret grundet ændring i grunddataregister: Matriklen";
		break;
	case 13:
		navn= "Opdateret grundet ændring i grunddataregister: DAR";
		break;
	case 14:
		navn= "Opdateret grundet ændring i grunddataregister: Ejerfortegnelsen";
		break;
	case 15:
		navn= "Opdateret grundet ændring i grunddataregister: Ejendomsbeliggenhedsregisteret";
		break;
	case 16:
		navn= "Automatisk lukning af anmeldelsessag";
		break;
	case 17:
		navn= "Flytning af underliggende elementer på matrikel (Matrikulær ændring)";
		break;
	case 18:
		navn= "Fordelingsareal af fordelingsareal";
		break;
	case 19:
		navn= "Opdateret grundet ændret Sikkerhedsklassificering";
		break;
	case 20:
		navn= "Fremdatering af indflytning";
		break;
	case 21:
		navn= "Opdatering af indberetning";
		break;
	case 22:
		navn= "ESR Event Processering";
		break;
	case 23:
		navn= "AWS Event Processering";
		break;
	case 24:
		navn= "Indberetnings services";
		break;
	case 25:
		navn= "SKATServices";
		break;
	case 26:
		navn= "EnergiindberetningProcessering";
		break;
	case 27:
		navn= "EJDbATilknytningHusnummerService";
		break;
	case 28:
		navn= "BPFG Tilknyttet gennem Ajorføring hos MU";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getForretningsProcessUI(kode) {
	switch (kode) { 
	case 4:
		navn= "Fejlrettelse af faktiske fejlregistreringer og udeladelser";
		break;
	case 5:
		navn= "Faktisk udført ændring uden byggesagsbehandling";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getForretningsProcessUIBygningEnhed(kode) {
	switch (kode) { 
	case 4:
		navn= "Fejlrettelse af faktiske fejlregistreringer og udeladelser";
		break;
	case 5:
		navn= "Faktisk udført ændring uden byggesagsbehandling";
		break;
	case 6:
		navn= "Opdeling af enheder";
		break;
	case 7:
		navn= "Sammenlægning af enheder";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getFredning(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "Bygningen fredet iht. bygningsfredningsloven";
		break;
	case 2:
		navn= "Som 1, men med tinglyste bevaringsbestemmelser jf. lovens §15";
		break;
	case 3:
		navn= "Tinglyst bevaringsdeklaration, men bygningen ikke fredet";
		break;
	case 4:
		navn= "På bygningens middelalderlige bygningsdele er der tinglyst fredningsbestemmelser";
		break;
	case 5:
		navn= "Bygningen indeholder middelalderlige bygningsdele";
		break;
	case 6:
		navn= "Bygningen og dens umiddelbare omgivelser fredet iht. bygningsfredningsloven";
		break;
	case 7:
		navn= "Som 6, men med tinglyst bevaringsdeklaration";
		break;
	case 8:
		navn= "Bygningen bevaringsværdig";
		break;
	case 9:
		navn= "Bygningen medtaget i registrant, bevaringsplan mm.";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getGodkendtTomBolig(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 0:
		navn= "Krav om persontilmelding";
		break;
	case 100:
		navn= "Bolig uden krav om persontilmelding";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getGruAfloebsforhold(kode) {
	switch (kode) { 
	case 1:
		navn= "Fælleskloakeret: spildevand + tag- og overfladevand";
		break;
	case 2:
		navn= "Fælleskloakeret: spildevand + delvis tag- og overfladevand";
		break;
	case 3:
		navn= "Fælleskloakeret: spildevand";
		break;
	case 4:
		navn= "Fælleskloakeret: tag- og overfladevand";
		break;
	case 5:
		navn= "Separatkloakeret: spildevand + tag- og overfladevand";
		break;
	case 6:
		navn= "Separatkloakeret: spildevand + delvis tag- og overfladevand";
		break;
	case 7:
		navn= "Separatkloakeret: spildevand";
		break;
	case 8:
		navn= "Separatkloakeret: tag- og overfladevand";
		break;
	case 9:
		navn= "Spildevandskloakeret: Spildevand";
		break;
	case 10:
		navn= "Afløb til spildevandsforsyningens renseanlæg";
		break;
	case 11:
		navn= "Afløb til fællesprivat spildevandsanlæg";
		break;
	case 12:
		navn= "Afløb til fællesprivat kloakledning med tilslutning til spv. renseanlæg";
		break;
	case 20:
		navn= "Afløb til samletank";
		break;
	case 21:
		navn= "Afløb til samletank for toiletvand og mek. rensning af øvr. spildevand";
		break;
	case 29:
		navn= "Mekanisk rensning med nedsivningsanlæg med tilladelse";
		break;
	case 30:
		navn= "Mekanisk rensning med nedsivningsanlæg (tilladelse ikke påkrævet)";
		break;
	case 31:
		navn= "Mekanisk rensning med privat udledn. dir. til vandløb, sø eller hav";
		break;
	case 32:
		navn= "Mekanisk og biologisk rensning (ældre anlæg uden renseklasse)";
		break;
	case 70:
		navn= "Udledning uden rensning direkte til vandløb, søer eller havet";
		break;
	case 75:
		navn= "Blandet afløbsforhold på ejendommen (er specificeret på bygningen)";
		break;
	case 80:
		navn= "Anden type afløb";
		break;
	case 90:
		navn= "Ingen udledning";
		break;
	case 101:
		navn= "SOP: Minirenseanlæg med direkte udledning";
		break;
	case 102:
		navn= "SOP: Minirenseanlæg med udledning til markdræn";
		break;
	case 103:
		navn= "SOP: Minirenseanlæg med nedsivning i faskine";
		break;
	case 104:
		navn= "SOP: Nedsivning til sivedræn";
		break;
	case 105:
		navn= "SOP: Samletank";
		break;
	case 106:
		navn= "SOP: Pileanlæg med nedsivning (uden membran)";
		break;
	case 107:
		navn= "SOP: Pileanlæg uden udledning (med membran)";
		break;
	case 108:
		navn= "SOP: Beplantede filteranlæg med nedsivning i faskine";
		break;
	case 109:
		navn= "SOP: Sandfiltre med P-fældning i bundfældningstanken og direkte udledning";
		break;
	case 110:
		navn= "SOP: Sandfiltre med P-fældning i bundfældningstanken og udledning til markdræn";
		break;
	case 190:
		navn= "SOP: Andet";
		break;
	case 201:
		navn= "SO: Biologisk sandfilter med direkte udledning";
		break;
	case 202:
		navn= "SO: Biologisk sandfilter med udledning til markdræn";
		break;
	case 203:
		navn= "SO: Minirensanlæg med direkte udledning";
		break;
	case 204:
		navn= "SO: Minirenseanlæg med udledning til markdræn";
		break;
	case 205:
		navn= "SO: Beplantede filteranlæg med direkte udledning";
		break;
	case 206:
		navn= "SO: Beplantede filteranlæg med udledning til markdræn";
		break;
	case 290:
		navn= "SO: Andet";
		break;
	case 301:
		navn= "OP: Minirenseanlæg med direkte udledning";
		break;
	case 302:
		navn= "OP: Minirenseanlæg med udledning til markdræn";
		break;
	case 390:
		navn= "OP: Andet";
		break;
	case 401:
		navn= "O: Rodzoneanlæg med direkte udledning";
		break;
	case 402:
		navn= "O: Rodzoneanlæg med udledning til markdræn";
		break;
	case 403:
		navn= "O: Minirenseanlæg med direkte udledning";
		break;
	case 404:
		navn= "O: Minirenseanlæg med udledning til markdræn";
		break;
	case 490:
		navn= "O: Andet";
		break;
	case 501:
		navn= "Øvrige renseløsninger: Mekanisk med direkte udledning";
		break;
	case 502:
		navn= "Øvrige renseløsninger: Mekanisk med udledning til markdræn";
		break;
	case 503:
		navn= "Øvrige renseløsninger: Ældre nedsivningsanlæg med nedsivning til sivebrønd";
		break;
	case 504:
		navn= "Øvrige renseløsninger: Udledning til jordoverfladen";
		break;
	case 505:
		navn= "Øvrige renseløsninger: Urenset";
		break;
	case 590:
		navn= "Øvrige renseløsninger: Andet";
		break;
	case 601:
		navn= "Anden type afløb (større end 30 PE med egen udledning)";
		break;
	case 701:
		navn= "Intet afløb";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getGrundSortering(kode) {
	switch (kode) { 
	case 1:
		navn= "Vejkode";
		break;
	case 2:
		navn= "Vejnavn";
		break;
	case 3:
		navn= "Husnummer";
		break;
	case 4:
		navn= "Postnummer";
		break;
	case 5:
		navn= "Postdistrikt";
		break;
	case 6:
		navn= "Ejerforholdskode (samt som klartekst i tooltip)";
		break;
	case 7:
		navn= "Sagsnummer";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getGrundViewType(kode) {
	switch (kode) { 
	case 0:
		navn= "Stamdata";
		break;
	case 1:
		navn= "Grundoplysninger";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getGruVandforsyning(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "Alment vandforsyningsanlæg (tidligere offentligt)";
		break;
	case 2:
		navn= "Privat, alment vandforsyningsanlæg";
		break;
	case 3:
		navn= "Enkeltindvindingsanlæg (egen boring til 1 eller 2 ejendomme)";
		break;
	case 4:
		navn= "Brønd";
		break;
	case 6:
		navn= "Ikke alment vandforsyningsanlæg (forsyner < 10 ejendomme)";
		break;
	case 7:
		navn= "Blandet vandforsyning";
		break;
	case 9:
		navn= "Ingen vandforsyning";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getGulvbelaegning(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "Beton";
		break;
	case 2:
		navn= "Andet";
		break;
	case 3:
		navn= "Ingen";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getHenvendelserDirekteIndberetning(kode) {
	switch (kode) { 
	case 0:
		navn= "Ingen";
		break;
	case 1:
		navn= "Få";
		break;
	case 2:
		navn= "Mange";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getHusnummerRolle(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 0:
		navn= "Fastsat til denne";
		break;
	case 1:
		navn= "Kun vejledende";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getHusnummerType(kode) {
	switch (kode) { 
	case 2:
		navn= "Lige husnr.";
		break;
	case 3:
		navn= "Ulige husnr.";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getIndberetningRolle(kode) {
	switch (kode) { 
	case 0:
		navn= "Alle";
		break;
	case 1:
		navn= "BBR Erhvervsservice SKAT";
		break;
	case 2:
		navn= "Ejer";
		break;
	case 3:
		navn= "Repræsentant for ejer";
		break;
	case 4:
		navn= "Lejer";
		break;
	case 5:
		navn= "Administrator";
		break;
	case 6:
		navn= "Callcenter medarbejder";
		break;
	case 7:
		navn= "Andet";
		break;
	case 8:
		navn= "Landinspektør";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getIndhold(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 10:
		navn= "Mineralske olieprodukter (Olietankbekendtgørelsens §6, stk. 1 nr. 13)";
		break;
	case 11:
		navn= "Fuelolie (”tung fuelolie” - kræver opvarmning)";
		break;
	case 12:
		navn= "Fyringsgasolie";
		break;
	case 13:
		navn= "Autogasolie (Dieselolie)";
		break;
	case 14:
		navn= "Benzin";
		break;
	case 20:
		navn= "Biobrændstoffer (Organiske olieprodukter som f.eks. rapsolie, bioethanol m.v.)";
		break;
	case 30:
		navn= "Affaldsprodukter";
		break;
	case 31:
		navn= "Oliebaserede affaldsprodukter (Spildolie)";
		break;
	case 40:
		navn= "Gylle";
		break;
	case 50:
		navn= "Ajle, ensilagesaft, mælkerumsvand eller møddingvand";
		break;
	case 60:
		navn= "Øvrige stoffer, produkter og materialer der kan forurene grundvand, jord og undergrund (§ 19) ";
		break;
	case 70:
		navn= "Korn";
		break;
	case 99:
		navn= "Andet (f.eks. foderstoffer m.v)";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getKilde(kode) {
	switch (kode) { 
	case 0:
		navn= "Alle";
		break;
	case 1:
		navn= "Ret BBR";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getKildeTilKoordinatsaet(kode) {
	let navn= '';
	switch (kode) { 
	case "E":
		navn= "Ejer";
		break;
	case "K":
		navn= "Kommune";
		break;
	case "L":
		navn= "Landinspektør";
		break;
	case "M":
		navn= "Maskinelt dannet";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getKildeTilOplysninger(kode) {
	let navn= "";
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "Oplyst af ejer (eller dennes repræsentant)";
		break;
	case 2:
		navn= "Oplyst af teknisk forvaltning";
		break;
	case 3:
		navn= "Oplyst af andre (lukket for indberetning)";
		break;
	case 4:
		navn= "Maskinelt oprettet";
		break;
	case 5:
		navn= "Oplyst og kontrolleret af teknisk forvaltning";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getKlassifikation(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 1110:
		navn= "Tank (Produkt på væskeform)";
		break;
	case 1120:
		navn= "Silo (Produkt på fast form)";
		break;
	case 1130:
		navn= "Gasbeholder (Produkt på gasform)";
		break;
	case 1140:
		navn= "Affaldsbeholder";
		break;
	case 1210:
		navn= "Vindmølle (elproducerende)";
		break;
	case 1220:
		navn= "Slanger til jordvarme";
		break;
	case 1230:
		navn= "Solvarme-/ solcelleanlæg";
		break;
	case 1240:
		navn= "Nødstrømsforsyningsanlæg";
		break;
	case 1250:
		navn= "Transformerstation";
		break;
	case 1260:
		navn= "Elskab";
		break;
	case 1265:
		navn= "Naturgasfyr";
		break;
	case 1270:
		navn= "Andet energiproducerende eller - distribuerende anlæg";
		break;
	case 1275:
		navn= "Halmfyr";
		break;
	case 1280:
		navn= "Biogasanlæg";
		break;
	case 1310:
		navn= "Vandtårn";
		break;
	case 1320:
		navn= "Pumpestation";
		break;
	case 1330:
		navn= "Swimmingpool";
		break;
	case 1340:
		navn= "Private rensningsanlæg f.eks. pileanlæg, nedsivningsanlæg";
		break;
	case 1350:
		navn= "Offentlige rensningsanlæg";
		break;
	case 1360:
		navn= "Regnvandsanlæg";
		break;
	case 1905:
		navn= "Legeplads";
		break;
	case 1910:
		navn= "Teknikhus";
		break;
	case 1915:
		navn= "Døgnpostboks";
		break;
	case 1920:
		navn= "Køleanlæg (herunder aircondition)";
		break;
	case 1925:
		navn= "Kunstværk (springvand, mindesmærker m.v.)";
		break;
	case 1930:
		navn= "Sirene / mast med sirene";
		break;
	case 1935:
		navn= "Skilt";
		break;
	case 1940:
		navn= "Antenne / mast fx tv, radio- og telekommunikation";
		break;
	case 1945:
		navn= "Dambrug";
		break;
	case 1950:
		navn= "Møddingsanlæg";
		break;
	case 1955:
		navn= "Andet teknisk anlæg";
		break;
	case 1960:
		navn= "Ensilageanlæg";
		break;
	case 1965:
		navn= "Planlager";
		break;
	case 1970:
		navn= "Fortidsminde, historisk ruin";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getKodeForMereEndEnLejlighed(kode) {
	switch (kode) { 
	case "E":
		navn= "En enhed";
		break;
	case "M":
		navn= "Mere end 1 enhed";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getKoekkenforhold(kode) {
	let navn= '';
	switch (kode) { 
	case "E":
		navn= "Eget køkken (med afløb og kogeinstallation)";
		break;
	case "F":
		navn= "Adgang til fælles køkken";
		break;
	case "G":
		navn= "Fast kogeinstallation i værelse eller på gang";
		break;
	case "H":
		navn= "Ingen fast kogeinstallation";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getKommuneFelterNiveau(kode) {
	switch (kode) { 
	case 0:
		navn= "Grund";
		break;
	case 1:
		navn= "Bygning";
		break;
	case 2:
		navn= "Opgang";
		break;
	case 3:
		navn= "Etage";
		break;
	case 4:
		navn= "Enhed";
		break;
	case 5:
		navn= "Teknisk Anlæg";
		break;
	case 6:
		navn= "Fordelingsareal";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getKommunekode(kode) {
	switch (kode) { 
	case 101:
		navn= "Københavns Kommune";
		break;
	case 147:
		navn= "Frederiksberg Kommune";
		break;
	case 151:
		navn= "Ballerup Kommune";
		break;
	case 153:
		navn= "Brøndby Kommune";
		break;
	case 155:
		navn= "Dragør Kommune";
		break;
	case 157:
		navn= "Gentofte Kommune";
		break;
	case 159:
		navn= "Gladsaxe Kommune";
		break;
	case 161:
		navn= "Glostrup Kommune";
		break;
	case 163:
		navn= "Herlev Kommune";
		break;
	case 165:
		navn= "Albertslund Kommune";
		break;
	case 167:
		navn= "Hvidovre Kommune";
		break;
	case 169:
		navn= "Høje Taastrup Kommune";
		break;
	case 173:
		navn= "Lyngby-Taarbæk Kommune";
		break;
	case 175:
		navn= "Rødovre Kommune";
		break;
	case 183:
		navn= "Ishøj Kommune";
		break;
	case 185:
		navn= "Tårnby Kommune";
		break;
	case 187:
		navn= "Vallensbæk Kommune";
		break;
	case 190:
		navn= "Furesø Kommune";
		break;
	case 201:
		navn= "Allerød Kommune";
		break;
	case 210:
		navn= "Fredensborg Kommune";
		break;
	case 217:
		navn= "Helsingør Kommune";
		break;
	case 219:
		navn= "Hillerød Kommune";
		break;
	case 223:
		navn= "Hørsholm Kommune";
		break;
	case 230:
		navn= "Rudersdal Kommune";
		break;
	case 240:
		navn= "Egedal Kommune";
		break;
	case 250:
		navn= "Frederikssund Kommune";
		break;
	case 253:
		navn= "Greve Kommune";
		break;
	case 259:
		navn= "Køge Kommune";
		break;
	case 260:
		navn= "Halsnæs Kommune";
		break;
	case 265:
		navn= "Roskilde Kommune";
		break;
	case 269:
		navn= "Solrød Kommune";
		break;
	case 270:
		navn= "Gribskov Kommune";
		break;
	case 306:
		navn= "Odsherred Kommune";
		break;
	case 316:
		navn= "Holbæk Kommune";
		break;
	case 320:
		navn= "Faxe Kommune";
		break;
	case 326:
		navn= "Kalundborg Kommune";
		break;
	case 329:
		navn= "Ringsted Kommune";
		break;
	case 330:
		navn= "Slagelse Kommune";
		break;
	case 336:
		navn= "Stevns Kommune";
		break;
	case 340:
		navn= "Sorø Kommune";
		break;
	case 350:
		navn= "Lejre Kommune";
		break;
	case 360:
		navn= "Lolland Kommune";
		break;
	case 370:
		navn= "Næstved Kommune";
		break;
	case 376:
		navn= "Guldborgsund Kommune";
		break;
	case 390:
		navn= "Vordingborg Kommune";
		break;
	case 400:
		navn= "Bornholms Regionskommune";
		break;
	case 410:
		navn= "Middelfart Kommune";
		break;
	case 420:
		navn= "Assens Kommune";
		break;
	case 430:
		navn= "Faaborg-Midtfyn Kommune";
		break;
	case 440:
		navn= "Kerteminde Kommune";
		break;
	case 450:
		navn= "Nyborg Kommune";
		break;
	case 461:
		navn= "Odense Kommune";
		break;
	case 479:
		navn= "Svendborg Kommune";
		break;
	case 480:
		navn= "Nordfyns Kommune";
		break;
	case 482:
		navn= "Langeland Kommune";
		break;
	case 492:
		navn= "Ærø Kommune";
		break;
	case 510:
		navn= "Haderslev Kommune";
		break;
	case 530:
		navn= "Billund Kommune";
		break;
	case 540:
		navn= "Sønderborg Kommune";
		break;
	case 550:
		navn= "Tønder Kommune";
		break;
	case 561:
		navn= "Esbjerg Kommune";
		break;
	case 563:
		navn= "Fanø Kommune";
		break;
	case 573:
		navn= "Varde Kommune";
		break;
	case 575:
		navn= "Vejen Kommune";
		break;
	case 580:
		navn= "Aabenraa Kommune";
		break;
	case 607:
		navn= "Fredericia Kommune";
		break;
	case 615:
		navn= "Horsens Kommune";
		break;
	case 621:
		navn= "Kolding Kommune";
		break;
	case 630:
		navn= "Vejle Kommune";
		break;
	case 657:
		navn= "Herning Kommune";
		break;
	case 661:
		navn= "Holstebro Kommune";
		break;
	case 665:
		navn= "Lemvig Kommune";
		break;
	case 671:
		navn= "Struer Kommune";
		break;
	case 706:
		navn= "Syddjurs Kommune";
		break;
	case 707:
		navn= "Norddjurs Kommune";
		break;
	case 710:
		navn= "Favrskov Kommune";
		break;
	case 727:
		navn= "Odder Kommune";
		break;
	case 730:
		navn= "Randers Kommune";
		break;
	case 740:
		navn= "Silkeborg Kommune";
		break;
	case 741:
		navn= "Samsø Kommune";
		break;
	case 746:
		navn= "Skanderborg Kommune";
		break;
	case 751:
		navn= "Aarhus Kommune";
		break;
	case 756:
		navn= "Ikast-Brande Kommune";
		break;
	case 760:
		navn= "Ringkøbing-Skjern Kommune";
		break;
	case 766:
		navn= "Hedensted Kommune";
		break;
	case 773:
		navn= "Morsø Kommune";
		break;
	case 779:
		navn= "Skive Kommune";
		break;
	case 787:
		navn= "Thisted Kommune";
		break;
	case 791:
		navn= "Viborg Kommune";
		break;
	case 810:
		navn= "Brønderslev Kommune";
		break;
	case 813:
		navn= "Frederikshavn Kommune";
		break;
	case 820:
		navn= "Vesthimmerlands Kommune";
		break;
	case 825:
		navn= "Læsø Kommune";
		break;
	case 840:
		navn= "Rebild Kommune";
		break;
	case 846:
		navn= "Mariagerfjord Kommune";
		break;
	case 849:
		navn= "Jammerbugt Kommune";
		break;
	case 851:
		navn= "Aalborg Kommune";
		break;
	case 860:
		navn= "Hjørring Kommune";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getKondemneretBoligenhed(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 0:
		navn= "Ikke kondemneret boligenhed";
		break;
	case 1:
		navn= "Kondemneret boligenhed";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getKonstruktion(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "Åben konstruktion";
		break;
	case 2:
		navn= "Lukket konstruktion";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getKonstruktionsforhold(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "Bygningen har jernbetonskelet";
		break;
	case 2:
		navn= "Bygningen har ikke jernbetonskelet";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getKoordinatsystem(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "System 34";
		break;
	case 2:
		navn= "System 45";
		break;
	case 3:
		navn= "KP2000 (System 2000)";
		break;
	case 4:
		navn= "UTM ED50";
		break;
	case 5:
		navn= "UTM Euref89 (WGS 84)";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getKvalitetAfKoordinatsaet(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "Sikker geokodning";
		break;
	case 2:
		navn= "Næsten sikker";
		break;
	case 3:
		navn= "Usikker geokodning";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getLivscyklus(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "Start";
		break;
	case 2:
		navn= "Projekteret";
		break;
	case 3:
		navn= "Under opførsel";
		break;
	case 4:
		navn= "Sagsgrund";
		break;
	case 5:
		navn= "Oprettet";
		break;
	case 6:
		navn= "Opført";
		break;
	case 7:
		navn= "Gældende";
		break;
	case 8:
		navn= "Godkendt";
		break;
	case 9:
		navn= "Afsluttet";
		break;
	case 10:
		navn= "Slettet";
		break;
	case 11:
		navn= "Fejlregistreret";
		break;
	case 12:
		navn= "Midlertidig Afsluttet";
		break;
	case 13:
		navn= "Delvis Afsluttet";
		break;
	case 14:
		navn= "Henlagt";
		break;
	case 15:
		navn= "Modtaget";
		break;
	case 16:
		navn= "UnderBehandling";
		break;
	case 17:
		navn= "Afvist";
		break;
	case 18:
		navn= "Udført";
		break;
	case 19:
		navn= "Foreløbig";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getLovligAnvendelse(kode) {
	let navn= '';
	switch (kode) { 
	case "A":
		navn= "Gammelt helårshus eller ikke-personlig disp. til helårsbeboelse";
		break;
	case "B":
		navn= "Personlig, tidsbegrænset dispensation til helårsbeboelse";
		break;
	case "C":
		navn= "Personlig, ikke-tidsbegrænset dispensation til helårsbeboelse";
		break;
	case "D":
		navn= "Personlig, ikke-tidsbegrænset ret til helårsbeboelse for pensionister";
		break;
	case "E":
		navn= "Dispensation til afvikling af ulovlig helårsbeboelse";
		break;
	case "I":
		navn= "Ikke relevant for denne enhed";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getMateriale(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "Plast";
		break;
	case 2:
		navn= "Stål";
		break;
	case 3:
		navn= "Plasttank med udvendig stålvæg";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getMedlemsskabAfSplidevandforsyning(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 0:
		navn= "Ikke oplyst";
		break;
	case 1:
		navn= "Ikke medlemskab af spildevandsforsyning";
		break;
	case 2:
		navn= "Medlemskab af spildevandsforsyning";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getMidlertidigOprettelseEllerFuldfoersel(kode) {
	switch (kode) { 
	case 0:
		navn= "Bygningen er ikke midlertidig oprettet";
		break;
	case 1:
		navn= "Bygningen er midlertidig oprettet, nybyggeri";
		break;
	case 2:
		navn= "Bygningen er midlertidig fuldført, nybyggeri";
		break;
	case 3:
		navn= "Bygningen er midlertidig oprettet, om-/tilbygning";
		break;
	case 4:
		navn= "Bygningen er midlertidig fuldført, om-/tilbygning";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getNiveau(kode) {
	switch (kode) { 
	case "UMAT":
		navn= "Umatrikuleret";
		break;
	case "ALL":
		navn= "Alle";
		break;
	case "BYG":
		navn= "Bygning";
		break;
	case "EJD":
		navn= "Ejendom";
		break;
	case "ENH":
		navn= "Enhed";
		break;
	case "GRU":
		navn= "Grund";
		break;
	case "SAG":
		navn= "Byggesag";
		break;
	case "TEK":
		navn= "Teknisk Anlæg";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getNiveauType(kode) {
	switch (kode) { 
	case 1:
		navn= "Grund";
		break;
	case 2:
		navn= "Bygning";
		break;
	case 3:
		navn= "TekniskAnlaeg";
		break;
	case 4:
		navn= "Etage";
		break;
	case 5:
		navn= "Opgang";
		break;
	case 6:
		navn= "Enhed";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getOffentligStoette(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 0:
		navn= "Ingen offentlig støtte";
		break;
	case 10:
		navn= "Almen familiebolig";
		break;
	case 15:
		navn= "Støttet privat udlejningsbolig";
		break;
	case 20:
		navn= "Støttet privat andelsbolig";
		break;
	case 25:
		navn= "Almen ungdomsbolig";
		break;
	case 30:
		navn= "Støttet privat ungdomsbolig";
		break;
	case 40:
		navn= "Almen ældrebolig";
		break;
	case 42:
		navn= "Almen plejebolig";
		break;
	case 80:
		navn= "Serviceareal";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getOmfattetAfByggeskadeforsikring(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 0:
		navn= "Bygningen er ikke omfattet af byggeskadeforsikring";
		break;
	case 10:
		navn= "Bygningen er omfattet af byggeskadeforsikring";
		break;
	case 11:
		navn= "Bygningen er opført som selvbyg";
		break;
	case 12:
		navn= "Udlejningsejendom";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getOpgangSortering(kode) {
	switch (kode) { 
	case 0:
		navn= "Vejkode";
		break;
	case 1:
		navn= "Vejnavn";
		break;
	case 2:
		navn= "Husnummer";
		break;
	case 3:
		navn= "Postnummer";
		break;
	case 4:
		navn= "Postdistrikt";
		break;
	case 5:
		navn= "Sagsnummer";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getOpvarmningsmiddel(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "Elektricitet";
		break;
	case 2:
		navn= "Gasværksgas";
		break;
	case 3:
		navn= "Flydende brændsel (olie, petroleum, flaskegas)";
		break;
	case 4:
		navn= "Fast brændsel (kul, koks, brænde mm.)";
		break;
	case 6:
		navn= "Halm";
		break;
	case 7:
		navn= "Naturgas";
		break;
	case 9:
		navn= "Andet";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getOversvoemmelsesselvrisiko(kode) {
	let navn= '';
	kode=parseInt(kode);
	switch (kode) { 
	case 0:
		navn= "Ingen udbetalt erstatning fra Stormrådet";
		break;
	case 1:
		navn= "Bygningens selvrisiko er forhøjet til trin 1";
		break;
	case 2:
		navn= "Bygningens selvrisiko er forhøjet til trin 2";
		break;
	case 3:
		navn= "Stormrådet har registreret udbetalt erstatning fra stormflod (siden 2012) og oversvømmelse fra søer og vandløb (siden 2010). Læs mere om stormflods- og oversvømmelsesordningerne på www.stormraadet.dk ";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getPaaSoeTerritorie(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 0:
		navn= "Ikke på søterritorie";
		break;
	case 1:
		navn= "På søterritorie";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getPlacering(kode) {
	switch (kode) { 
	case 0:
		navn= "Ukendt";
		break;
	case 1:
		navn= "Nedgravet/underjordisk";
		break;
	case 2:
		navn= "Over terræn, udendørs";
		break;
	case 3:
		navn= "Indendørs";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getPlaceringAfCursor(kode) {
	switch (kode) { 
	case 0:
		navn= "Vejkode";
		break;
	case 1:
		navn= "Vejnavn";
		break;
	case 2:
		navn= "Matrikel";
		break;
	case 4:
		navn= "Ejendomsnummer";
		break;
	case 5:
		navn= "BFE";
		break;
	case 6:
		navn= "Kviksøgning";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getRensningspaabud(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 0:
		navn= "Ikke oplyst";
		break;
	case 1:
		navn= "Rensning ok. Intet påbud";
		break;
	case 2:
		navn= "Rensning skal forbedres til SOP";
		break;
	case 3:
		navn= "Rensning skal forbedres til SO";
		break;
	case 4:
		navn= "Rensning skal forbedres til OP";
		break;
	case 5:
		navn= "Rensning skal forbedres til O";
		break;
	case 6:
		navn= "Skal tilsluttes spildevandsforsyningsselskab";
		break;
	case 7:
		navn= "Skal tilsluttes separatkloakering";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getSagsniveau(kode) {
	switch (kode) { 
	case 1:
		navn= "Grund";
		break;
	case 2:
		navn= "Bygning";
		break;
	case 3:
		navn= "TekniskAnlaeg";
		break;
	case 4:
		navn= "Etage";
		break;
	case 5:
		navn= "Opgang";
		break;
	case 6:
		navn= "Enhed";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getSagstype(kode) {
	switch (kode) { 
	case 0:
		navn= "Sag på grund";
		break;
	case 1:
		navn= "Nybyggeri";
		break;
	case 2:
		navn= "Til/ombygning";
		break;
	case 31:
		navn= "Nedrivning (delvis)";
		break;
	case 32:
		navn= "Nedrivning (hel)";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getSikkerhedsklassifikation(kode) {
	switch (kode) { 
	case 0:
		navn= "Er ikke omfattet af sikkerhedshensyn, jfr. afsnit 7";
		break;
	case 1:
		navn= "Er beskyttet";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getSloejfning(kode) {
	switch (kode) { 
	case 1:
		navn= "Tanken er afblændet";
		break;
	case 2:
		navn= "Tanken er tømt og afblændet";
		break;
	case 3:
		navn= "Tanken er tømt, afblændet og opfyldt";
		break;
	case 4:
		navn= "Tanken er tømt, afblændet og påfyldningsstuds samt udluftningsrør afmonteret";
		break;
	case 10:
		navn= "Jordvarmeslangerne er sløjfet/taget ud af drift";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getStandardSoegniveau(kode) {
	switch (kode) { 
	case 0:
		navn= "Alle";
		break;
	case 1:
		navn= "Grund";
		break;
	case 2:
		navn= "Bygning";
		break;
	case 3:
		navn= "Enhed";
		break;
	case 4:
		navn= "Teknisk Anlæg";
		break;
	case 5:
		navn= "Byggesag";
		break;
	case 6:
		navn= "Ejendom";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getStartside(kode) {
	switch (kode) { 
	case 0:
		navn= "Bygning & bolig";
		break;
	case 1:
		navn= "Indbakke";
		break;
	case 2:
		navn= "Hændelseslog";
		break;
	case 3:
		navn= "Rapport";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getStoerrelsesklasse(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "Under 6.000 l";
		break;
	case 2:
		navn= "6.000 l - 100.000 l";
		break;
	case 3:
		navn= "Over 100.000 l";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getSupplerendeAnvendelseskode(kode) {
	switch (kode) { 
	case 210:
		navn= "Bygning til erhvervsmæssig produktion vedrørende landbrug, gartneri, råstofudvinding o. lign ";
		break;
	case 220:
		navn= "Bygning til erhvervsmæssig produktion vedrørende industri, håndværk m.v.";
		break;
	case 230:
		navn= "El-, gas-, vand- eller varmeværk, forbrændingsanstalt m.v.";
		break;
	case 290:
		navn= "Anden bygning til landbrug, industri etc.";
		break;
	case 310:
		navn= "Transport- og garageanlæg (fragtmandshal, lufthavnsbygning, banegårdsbygning, parkeringshus). Garage med plads til et eller to køretøjer registreres med anvendelseskode 910 ";
		break;
	case 320:
		navn= "Bygning til kontor, handel, lager, herunder offentlig administration";
		break;
	case 330:
		navn= "Bygning til hotel, restaurant, vaskeri, frisør og anden servicevirksomhed";
		break;
	case 390:
		navn= "Anden bygning til transport, handel etc";
		break;
	case 410:
		navn= "Bygning til biograf, teater, erhvervsmæssig udstilling, bibliotek, museum, kirke o. lign. ";
		break;
	case 420:
		navn= "Bygning til undervisning og forskning.";
		break;
	case 430:
		navn= "Bygning til hospital, sygehjem, fødeklinik o. lign.";
		break;
	case 440:
		navn= "Bygning til daginstitution";
		break;
	case 490:
		navn= "Bygning til anden institution, herunder kaserne, fængsel o. lign.";
		break;
	case 520:
		navn= "Bygning til ferieformål m.v., bortset fra sommerhus (feriekoloni, vandrehjem o. lign.)";
		break;
	case 530:
		navn= "Bygning i forbindelse med idrætsudøvelse (klubhus, idrætshal, svømmehal o. lign.)";
		break;
	case 590:
		navn= "Anden bygning til fritidsformål";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getSupplerendeIndvendigKorrosionsbeskyttelse(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "Glasfiberbelægning";
		break;
	case 2:
		navn= "Organisk belægning";
		break;
	case 3:
		navn= "Anoder";
		break;
	case 4:
		navn= "zinkstøvmaling";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getSupplerendeOplysningerOmKoordinatsaet(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 11:
		navn= "Koordinatsæt ligger i bygningen/anlægget (over jorden)";
		break;
	case 12:
		navn= "Koordinatsæt ligger i bygningen/anlægget (under jorden)";
		break;
	case 21:
		navn= "Koordinatsæt ligger i bygningen/anlægget (over jorden)";
		break;
	case 22:
		navn= "Koordinatsæt ligger i bygningen/anlægget (under jorden)";
		break;
	case 31:
		navn= "Koordinatsæt ligger på matriklen";
		break;
	case 32:
		navn= "Ukendt";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getSupplerendeVarme(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 0:
		navn= "Ikke oplyst";
		break;
	case 1:
		navn= "Varmepumpeanlæg";
		break;
	case 2:
		navn= "Ovne til fast brændsel (brændeovn o. lign.)";
		break;
	case 3:
		navn= "Ovne til flydende brændsel";
		break;
	case 4:
		navn= "Solpaneler";
		break;
	case 5:
		navn= "Pejs";
		break;
	case 6:
		navn= "Gasradiator";
		break;
	case 7:
		navn= "Elovne, elpaneler";
		break;
	case 10:
		navn= "Biogasanlæg";
		break;
	case 80:
		navn= "Andet";
		break;
	case 90:
		navn= "Bygningen har ingen supplerende varme";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getTagdaekningsmateriale(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "Built-up";
		break;
	case 2:
		navn= "Tagpap (med taghældning)";
		break;
	case 3:
		navn= "Fibercement, herunder asbest (bølge- eller skifer-eternit)";
		break;
	case 4:
		navn= "Cementsten";
		break;
	case 5:
		navn= "Tegl";
		break;
	case 6:
		navn= "Metalplader (bølgeblik, aluminium, o.lign.)";
		break;
	case 7:
		navn= "Stråtag";
		break;
	case 10:
		navn= "Fibercement (asbestfri)";
		break;
	case 11:
		navn= "PVC";
		break;
	case 12:
		navn= "Glas";
		break;
	case 20:
		navn= "Grønne tage";
		break;
	case 80:
		navn= "Ingen";
		break;
	case 90:
		navn= "Andet materiale";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getTekniskAnlaegBygningSortering(kode) {
	switch (kode) { 
	case 0:
		navn= "Teknisk anlægs nummer";
		break;
	case 1:
		navn= "Vejkode";
		break;
	case 2:
		navn= "Vejnavn";
		break;
	case 3:
		navn= "Husnummer";
		break;
	case 4:
		navn= "Postnummer";
		break;
	case 5:
		navn= "Postdistrikt";
		break;
	case 6:
		navn= "Klassifikation (samt som klartekst i tool tip)";
		break;
	case 9:
		navn= "Sagsnummer";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getTekniskAnlaegEnhedSortering(kode) {
	switch (kode) { 
	case 0:
		navn= "Teknisk anlægs nummer";
		break;
	case 1:
		navn= "Klassifikation (samt som klartekst i tool tip)";
		break;
	case 4:
		navn= "Sagsnummer";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getTekniskAnlaegMatrikelSortering(kode) {
	switch (kode) { 
	case 0:
		navn= "Teknisk anlægs nummer";
		break;
	case 1:
		navn= "Vejkode";
		break;
	case 2:
		navn= "Vejnavn";
		break;
	case 3:
		navn= "Husnummer";
		break;
	case 4:
		navn= "Postnummer";
		break;
	case 5:
		navn= "Postdistrikt";
		break;
	case 6:
		navn= "Klassifikation (samt som klartekst i tool tip)";
		break;
	case 9:
		navn= "Sagsnummer";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getTilladelsesart(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "Upersonlig tilladelse uden tidsbegrænsning";
		break;
	case 2:
		navn= "Personlig tilladelse uden tidsbegrænsning";
		break;
	case 3:
		navn= "Upersonlig tilladelse med tidsbegrænsing";
		break;
	case 4:
		navn= "Personlig tilladelse med tidsbegrænsing";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getTilladelseTilAlternativBortskaffelseEllerAfledning(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 0:
		navn= "Ikke oplyst";
		break;
	case 1:
		navn= "Tilladelse meddelt";
		break;
	case 2:
		navn= "Tilladelse bortfaldet";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getTilladelseTilUdtraeden(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 0:
		navn= "Ikke oplyst";
		break;
	case 1:
		navn= "Tilladelse meddelt";
		break;
	case 2:
		navn= "Tilladelse bortfaldet";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getToiletforhold(kode) {
	let navn= '';
	switch (kode) { 
	case "A":
		navn= "Vandskyllende toilet udenfor enheden";
		break;
	case "B":
		navn= "Anden type toilet udenfor enheden eller intet toilet i forbindelse med enheden";
		break;
	case "T":
		navn= "Vandskyllende toiletter i bolig- eller erhvervsenheden";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getTypeAfVaegge(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "Enkeltvægget";
		break;
	case 2:
		navn= "Dobbeltvægget";
		break;
	case 3:
		navn= "Dobbeltvægget med overvågning";
		break;
	case 4:
		navn= "Overjordisk anlæg, hele anlægget er tilgængeligt for udvendig visuel inspektion";
		break;
	case 5:
		navn= "Tanke som er installeret før 1970, udvendig korrosionsbeskyttet bitumenbelægning";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getUdledningstilladelse(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 0:
		navn= "Ikke oplyst";
		break;
	case 1:
		navn= "Udledningstilladelse mangler";
		break;
	case 2:
		navn= "Renseanlæg etableret før 1974, derfor ikke behov for tilladelse";
		break;
	case 3:
		navn= "Udledningstilladelse til enkeltprivat renseanlæg";
		break;
	case 4:
		navn= "Udledningstilladelse til fællesprivat renseanlæg";
		break;
	case 5:
		navn= "Der foreligger ingen kendt tilladelse";
		break;
	case 6:
		navn= "Der foreligger tilladelse";
		break;
	case 7:
		navn= "Tilladelsesforhold er oplyst på bygningsniveau";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getUdlejningsforhold(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "Udlejet";
		break;
	case 2:
		navn= "Benyttet af ejeren";
		break;
	case 3:
		navn= "Ikke benyttet";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getUdskrivningsmatrikel(kode) {
	switch (kode) { 
	case "J":
		navn= "Ja";
		break;
	case "M":
		navn= "Midlertidig";
		break;
	case "N":
		navn= "Nej";
		break;
	case "X":
		navn= "Slettet";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getVandforsyning(kode) {
	switch (kode) { 
	case 1:
		navn= "Alment vandforsyningsanlæg (tidligere offentligt)";
		break;
	case 2:
		navn= "Privat, alment vandforsyningsanlæg";
		break;
	case 3:
		navn= "Enkeltindvindingsanlæg (egen boring til 1 eller 2 ejendomme)";
		break;
	case 4:
		navn= "Brønd";
		break;
	case 6:
		navn= "Ikke alment vandforsyningsanlæg (forsyner < 10 ejendomme)";
		break;
	case 7:
		navn= "Blandet vandforsyning";
		break;
	case 9:
		navn= "Ingen vandforsyning";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getVarmeinstallation(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "Fjernvarme/blokvarme (radiatorsystemer el. varmluftanlæg)";
		break;
	case 2:
		navn= "Centralvarme fra eget anlæg, et-kammer fyr";
		break;
	case 3:
		navn= "Ovne (kakkelovne, kamin, brændeovne o.l.)";
		break;
	case 5:
		navn= "Varmepumpe";
		break;
	case 6:
		navn= "Centralvarme med to fyringsenheder (fast og olie eller gas)";
		break;
	case 7:
		navn= "Elovne, elpaneler";
		break;
	case 8:
		navn= "Gasradiator";
		break;
	case 9:
		navn= "Ingen varmeinstallation";
		break;
	case 99:
		navn= "Blandet (Kræver specifikation på enhedsniveau)";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}

export function getYdervaeggenesMateriale(kode) {
	let navn= '';
	kode= parseInt(kode);
	switch (kode) { 
	case 1:
		navn= "Mursten (tegl, kalksten, cementsten)";
		break;
	case 2:
		navn= "Letbeton (lette bloksten, gasbeton)";
		break;
	case 3:
		navn= "Plader af fibercement, herunder asbest (eternit el. lign.)";
		break;
	case 4:
		navn= "Bindingsværk (med udvendigt synligt træværk)";
		break;
	case 5:
		navn= "Træbeklædning";
		break;
	case 6:
		navn= "Betonelementer (etagehøje betonelementer)";
		break;
	case 8:
		navn= "Metalplader";
		break;
	case 10:
		navn= "Plader af fibercement (asbestfri)";
		break;
	case 11:
		navn= "PVC";
		break;
	case 12:
		navn= "Glas";
		break;
	case 80:
		navn= "Ingen";
		break;
	case 90:
		navn= "Andet materiale";
		break;
	default:
		navn= "Ukendt kode";
	}
	return navn;
}
