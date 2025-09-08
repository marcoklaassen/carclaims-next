export const formRoutes = [
  { id: 'disclaimer', name: 'Belehrung', path: '/frida-carclaims/disclaimer' },
  { id: 'accidentinfo', name: 'Angaben zum Unfallort', path: '/frida-carclaims/accidentinfo' },
  { id: 'accidentlocation', name: 'Angaben zum Unfallort', path: '/frida-carclaims/accidentlocation' },

  { id: 'personalinfo', name: 'Angaben zum Versicherungsnehmer', path: '/frida-carclaims/personalinfo/a' },
  { id: 'vehicleinfo', name: 'Angaben zum Versicherungsnehmer', path: '/frida-carclaims/vehicleinfo/a' },

  { id: 'driverinfo', name: 'Angaben zum Fahrer (Versicherungsnehmer)', path: '/frida-carclaims/driverinfo/a' },
  { id: 'damagelocation', name: 'Angaben zum Fahrer (Versicherungsnehmer)', path: '/frida-carclaims/damagelocation/a' },
  { id: 'damagedescription', name: 'Angaben zum Fahrer (Versicherungsnehmer)', path: '/frida-carclaims/damagedescription/a' },

  { id: 'personalinfo', name: 'Angaben zum Geschädigten', path: '/frida-carclaims/personalinfo/b' },
  { id: 'vehicleinfo', name: 'Angaben zum Geschädigten', path: '/frida-carclaims/vehicleinfo/b' },

  { id: 'driverinfo', name: 'Angaben zum Fahrer (Geschädigter)', path: '/frida-carclaims/driverinfo/b' },
  { id: 'damagelocation', name: 'Angaben zum Fahrer (Geschädigter)', path: '/frida-carclaims/damagelocation/b' },
  { id: 'damagedescription', name: 'Angaben zum Fahrer (Geschädigter)', path: '/frida-carclaims/damagedescription/b' },

  { id: 'injuredpersons', name: 'Angaben zu verletzten Personen', path: '/frida-carclaims/injuredpersons' },

  { id: 'miscellanousdamages', name: 'Angaben zu anderen Sachschäden', path: '/frida-carclaims/miscellaneousdamages' },

  { id: 'witnesses', name: 'Angaben zu Zeugen', path: '/frida-carclaims/witnesses' },
  { id: 'summary', name: 'Zusammenfassung', path: '/frida-carclaims/summary' },
  { id: 'success', name: 'Übertragung erfolgreich', path: '/frida-carclaims/success' }
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

export function getPreviousRoute(currentStep: number) {
  const previousRoute = currentStep > 0 ? formRoutes[currentStep - 1].path : '';
  return previousRoute;
};