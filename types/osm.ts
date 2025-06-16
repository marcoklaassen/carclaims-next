export interface I_OSMAddress {
  house_number: string;
  road: string;
  neighbourhood: string;
  suburb: string;
  town: string;
  borough: string;
  postcode: string;
  country: string;
  country_code: string;
}

export interface I_OSMAddressDetails {
  place_id: number;
  osm_type: string;
  lat: string;
  lon: string;
  display_name: string;
  address: I_OSMAddress;
  boundingbox: string[];
}
