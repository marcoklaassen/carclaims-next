/**
 * Trennt Adresse in Straße und Hausnummer
 * @param address - z. B. "Musterstraße 123a"
 */
export function parseAddress(address: string): {
  streetName: string;
  houseNumber: string;
} {
  const cleanedAddress = address.trim().replace(/,+$/, ""); //entfernt das Komma vom Autofill

  const match = cleanedAddress.match(/^(.+?)\s+(\d.*)$/);
  if (match) {
    // console.log("Addresse: " + match[1], match[2]);
    return {
      streetName: match[1],
      houseNumber: match[2],
    };
  }
  // console.log("Addresse ohne erkannte Hausnummer: " + address + "test") ;
  return {
    streetName: address.trim(),
    houseNumber: "",
  };
}
