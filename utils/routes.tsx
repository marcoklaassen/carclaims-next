export const formRoutes = [
  { id: 'disclaimer', name: 'Belehrung', path: '/disclaimer' },
  { id: 'accidentinfo', name: 'Angaben zum Unfallort', path: '/accidentinfo' },
  { id: 'accidentlocation', name: 'Angaben zum Unfallort', path: '/accidentlocation' },

  { id: 'personalinfo', name: 'Angaben zum Versicherungsnehmer', path: '/personalinfo/a' },
  { id: 'vehicleinfo', name: 'Angaben zum Versicherungsnehmer', path: '/vehicleinfo/a' },

  { id: 'driverinfo', name: 'Angaben zum Fahrer (Versicherungsnehmer)', path: '/driverinfo/a' },
  { id: 'damagelocation', name: 'Angaben zum Fahrer (Versicherungsnehmer)', path: '/damagelocation/a' },
  { id: 'damagedescription', name: 'Angaben zum Fahrer (Versicherungsnehmer)', path: '/damagedescription/a' },

  { id: 'personalinfo', name: 'Angaben zum Geschädigten', path: '/personalinfo/b' },
  { id: 'vehicleinfo', name: 'Angaben zum Geschädigten', path: '/vehicleinfo/b' },

  { id: 'driverinfo', name: 'Angaben zum Fahrer (Geschädigter)', path: '/driverinfo/b' },
  { id: 'damagelocation', name: 'Angaben zum Fahrer (Geschädigter)', path: '/damagelocation/b' },
  { id: 'damagedescription', name: 'Angaben zum Fahrer (Geschädigter)', path: '/damagedescription/b' },

  { id: 'injuredpersons', name: 'Angaben zu verletzten Personen', path: '/injuredpersons' },

  { id: 'miscellanousdamages', name: 'Angaben zu anderen Sachschäden', path: '/miscellaneousdamages' },

  { id: 'witnesses', name: 'Angaben zu Zeugen', path: '/witnesses' },
  { id: 'summary', name: 'Zusammenfassung', path: '/summary' },
  { id: 'success', name: 'Übertragung erfolgreich', path: '/success' }
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