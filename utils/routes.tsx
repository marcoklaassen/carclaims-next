export const formRoutes = [
    { id: 'disclaimer', name: 'Belehrung', path: '/frida-carclaims/disclaimer' },
    { id: 'accidentinfo', name: 'Angaben zum Unfallort', path: '/frida-carclaims/accidentinfo' },
    { id: 'accidentlocation', name: 'Angaben zum Unfallort', path: '/frida-carclaims/accidentlocation' },

    { id: 'insuranceholder-a', name: 'Angaben zum Versicherungsnehmer A', path: '/frida-carclaims/insuranceholder-a/personalinfo' },
    { id: 'insuranceholder-a', name: 'Angaben zum Versicherungsnehmer A', path: '/frida-carclaims/insuranceholder-a/vehicleinfo' },

    { id: 'driverinfo', name: 'Angaben zum Fahrzeuglenker A (Verursacher)', path: '/frida-carclaims/driverinfo' },
    { id: 'damagelocation', name: 'Angaben zum Fahrzeuglenker A (Verursacher)', path: '/frida-carclaims/damagelocation' },
    { id: 'damagedescription', name: 'Angaben zum Fahrzeuglenker A (Verursacher)', path: '/frida-carclaims/damagedescription' },

    { id: 'insuranceholder-b', name: 'Angaben zum Versicherungsnehmer B', path: '/frida-carclaims/insuranceholder-b/personalinfo' },
    { id: 'insuranceholder-b', name: 'Angaben zum Versicherungsnehmer B', path: '/frida-carclaims/insuranceholder-b/vehicleinfo' },

    { id: 'injuredpersons', name: 'Angaben zu verletzten Personen', path: '/frida-carclaims/injuredpersons' },

    { id: 'miscellanousdamages', name: 'Angaben zu anderen Sachschäden', path: '/frida-carclaims/miscellaneousdamages' },

    { id: 'witnesses', name: 'Angaben zu Zeugen', path: '/frida-carclaims/witnesses' }
  ];

export function getRouteIndex(currentPath: string) {
  const route = formRoutes.findIndex((route) => route.path === currentPath);
  return route >= 0 ? route : 0;
}

export function getNextRoute(currentPath: string) {
  const currentIndex = getRouteIndex(currentPath);
  return currentIndex < formRoutes.length - 1
    ? formRoutes[currentIndex + 1].path
    : null;
}

export function getPreviousRoute(currentStep: number){
  const previousRoute = currentStep > 0 ? formRoutes[currentStep - 1].path : '';
  console.log("Step to previous route:" + previousRoute);
  return previousRoute;
};