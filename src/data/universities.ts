export interface PrivateUniversity {
  id: string;
  name: string;
  shortName: string;
  short_name: string; // compatibility alias
  state: string;
  city: string;
  type: 'private';
}

/**
 * EXCLUSIVE PRIVATE UNIVERSITIES LIST
 * Univyx is strictly for students from verified private universities.
 * Keep all schools in this single editable data file.
 */
export const PRIVATE_UNIVERSITIES: PrivateUniversity[] = [
  { id: 'babcock', name: 'Babcock University', shortName: 'Babcock', short_name: 'Babcock', state: 'Ogun State', city: 'Ilishan-Remo', type: 'private' },
  { id: 'bells', name: 'Bells University of Technology', shortName: 'Bells', short_name: 'Bells', state: 'Ogun State', city: 'Ota', type: 'private' },
  { id: 'caleb', name: 'Caleb University', shortName: 'Caleb', short_name: 'Caleb', state: 'Lagos State', city: 'Imota', type: 'private' },
  { id: 'covenant', name: 'Covenant University', shortName: 'CU', short_name: 'CU', state: 'Ogun State', city: 'Ota', type: 'private' },
  { id: 'abuad', name: 'Afe Babalola University (ABUAD)', shortName: 'ABUAD', short_name: 'ABUAD', state: 'Ekiti State', city: 'Ado-Ekiti', type: 'private' },
  { id: 'redeemers', name: "Redeemer's University", shortName: 'RUN', short_name: 'RUN', state: 'Osun State', city: 'Ede', type: 'private' },
  { id: 'landmark', name: 'Landmark University', shortName: 'Landmark', short_name: 'Landmark', state: 'Kwara State', city: 'Omu-Aran', type: 'private' },
  { id: 'bowen', name: 'Bowen University', shortName: 'Bowen', short_name: 'Bowen', state: 'Osun State', city: 'Iwo', type: 'private' },
  { id: 'pau', name: 'Pan-Atlantic University', shortName: 'PAU', short_name: 'PAU', state: 'Lagos State', city: 'Ibeju-Lekki', type: 'private' },
  { id: 'aun', name: 'American University of Nigeria', shortName: 'AUN', short_name: 'AUN', state: 'Adamawa State', city: 'Yola', type: 'private' },
  { id: 'leadcity', name: 'Lead City University', shortName: 'Lead City', short_name: 'Lead City', state: 'Oyo State', city: 'Ibadan', type: 'private' },
  { id: 'crawford', name: 'Crawford University', shortName: 'Crawford', short_name: 'Crawford', state: 'Ogun State', city: 'Igbesa', type: 'private' },
  { id: 'crescent', name: 'Crescent University', shortName: 'Crescent', short_name: 'Crescent', state: 'Ogun State', city: 'Abeokuta', type: 'private' },
  { id: 'mountaintop', name: 'Mountain Top University', shortName: 'MTU', short_name: 'MTU', state: 'Ogun State', city: 'Makogi Oba', type: 'private' },
  { id: 'veritas', name: 'Veritas University', shortName: 'Veritas', short_name: 'Veritas', state: 'FCT Abuja', city: 'Bwari', type: 'private' },
  { id: 'baze', name: 'Baze University', shortName: 'Baze', short_name: 'Baze', state: 'FCT Abuja', city: 'Jabi', type: 'private' },
  { id: 'nile', name: 'Nile University of Nigeria', shortName: 'Nile', short_name: 'Nile', state: 'FCT Abuja', city: 'Jabi', type: 'private' },
  { id: 'madonna', name: 'Madonna University', shortName: 'Madonna', short_name: 'Madonna', state: 'Rivers State', city: 'Elele', type: 'private' },
  { id: 'achievers', name: 'Achievers University', shortName: 'Achievers', short_name: 'Achievers', state: 'Ondo State', city: 'Owo', type: 'private' },
  { id: 'augustine', name: 'Augustine University', shortName: 'AUI', short_name: 'AUI', state: 'Lagos State', city: 'Ilara-Epe', type: 'private' },
  { id: 'elizade', name: 'Elizade University', shortName: 'Elizade', short_name: 'Elizade', state: 'Ondo State', city: 'Ilara-Mokin', type: 'private' },
  { id: 'fountain', name: 'Fountain University', shortName: 'Fountain', short_name: 'Fountain', state: 'Osun State', city: 'Osogbo', type: 'private' },
  { id: 'godfrey', name: 'Godfrey Okoye University', shortName: 'GOUNI', short_name: 'GOUNI', state: 'Enugu State', city: 'Ugwuomu-Nike', type: 'private' },
  { id: 'hallmark', name: 'Hallmark University', shortName: 'Hallmark', short_name: 'Hallmark', state: 'Ogun State', city: 'Ijebu-Itele', type: 'private' },
  { id: 'jabu', name: 'Joseph Ayo Babalola University', shortName: 'JABU', short_name: 'JABU', state: 'Osun State', city: 'Ikeji-Arakeji', type: 'private' },
  { id: 'wesley', name: 'Wesley University', shortName: 'Wesley', short_name: 'Wesley', state: 'Ondo State', city: 'Ondo', type: 'private' },
  { id: 'kings', name: 'Kings University', shortName: 'Kings', short_name: 'Kings', state: 'Osun State', city: 'Odeomu', type: 'private' },
  { id: 'chrisland', name: 'Chrisland University', shortName: 'Chrisland', short_name: 'Chrisland', state: 'Ogun State', city: 'Abeokuta', type: 'private' }
];
