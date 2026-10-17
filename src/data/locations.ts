export interface CampusLocation {
  id: string;
  name: string;
  category: 'campus' | 'area';
  universityId?: string;
  universityName: string;
  state: string;
}

export const MOCK_CAMPUS_LOCATIONS: CampusLocation[] = [
  // Official Private University Campuses
  {
    id: 'loc-covenant-main',
    name: 'Covenant University, Ota (Canaanland)',
    category: 'campus',
    universityId: 'covenant',
    universityName: 'Covenant University',
    state: 'Ogun State'
  },
  {
    id: 'loc-babcock-main',
    name: 'Babcock University, Ilishan-Remo (Main Campus)',
    category: 'campus',
    universityId: 'babcock',
    universityName: 'Babcock University',
    state: 'Ogun State'
  },
  {
    id: 'loc-abuad-main',
    name: 'Afe Babalola University (ABUAD), Ado-Ekiti',
    category: 'campus',
    universityId: 'abuad',
    universityName: 'ABUAD',
    state: 'Ekiti State'
  },
  {
    id: 'loc-pau-main',
    name: 'Pan-Atlantic University (PAU), Ibeju-Lekki',
    category: 'campus',
    universityId: 'pau',
    universityName: 'Pan-Atlantic University',
    state: 'Lagos State'
  },
  {
    id: 'loc-bowen-main',
    name: 'Bowen University, Iwo (Main Campus)',
    category: 'campus',
    universityId: 'bowen',
    universityName: 'Bowen University',
    state: 'Osun State'
  },
  {
    id: 'loc-nile-main',
    name: 'Nile University of Nigeria, Abuja (Jabi Campus)',
    category: 'campus',
    universityId: 'nile',
    universityName: 'Nile University',
    state: 'FCT Abuja'
  },
  {
    id: 'loc-baze-main',
    name: 'Baze University, Abuja (Jabi District)',
    category: 'campus',
    universityId: 'baze',
    universityName: 'Baze University',
    state: 'FCT Abuja'
  },
  {
    id: 'loc-redeemers-main',
    name: "Redeemer's University (RUN), Ede",
    category: 'campus',
    universityId: 'redeemers',
    universityName: "Redeemer's University",
    state: 'Osun State'
  },
  {
    id: 'loc-aun-main',
    name: 'American University of Nigeria (AUN), Yola',
    category: 'campus',
    universityId: 'aun',
    universityName: 'American University of Nigeria',
    state: 'Adamawa State'
  },
  {
    id: 'loc-leadcity-main',
    name: 'Lead City University, Ibadan (Toll Gate Campus)',
    category: 'campus',
    universityId: 'leadcity',
    universityName: 'Lead City University',
    state: 'Oyo State'
  },
  {
    id: 'loc-veritas-main',
    name: 'Veritas University, Bwari, Abuja',
    category: 'campus',
    universityId: 'veritas',
    universityName: 'Veritas University',
    state: 'FCT Abuja'
  },
  {
    id: 'loc-bells-main',
    name: 'Bells University of Technology, Ota',
    category: 'campus',
    universityId: 'bells',
    universityName: 'Bells University of Technology',
    state: 'Ogun State'
  },
  {
    id: 'loc-caleb-main',
    name: 'Caleb University, Imota, Lagos',
    category: 'campus',
    universityId: 'caleb',
    universityName: 'Caleb University',
    state: 'Lagos State'
  },
  {
    id: 'loc-landmark-main',
    name: 'Landmark University, Omu-Aran',
    category: 'campus',
    universityId: 'landmark',
    universityName: 'Landmark University',
    state: 'Kwara State'
  },

  // Surrounding Private Varsity Student Areas (No exact street address or live GPS)
  {
    id: 'loc-hebron-hub',
    name: 'Hebron Tech Quarter, Ota',
    category: 'area',
    universityId: 'covenant',
    universityName: 'Covenant University Area',
    state: 'Ogun State'
  },
  {
    id: 'loc-ilishan-junction',
    name: 'Ilishan Junction Student Village',
    category: 'area',
    universityId: 'babcock',
    universityName: 'Babcock Area',
    state: 'Ogun State'
  },
  {
    id: 'loc-abuad-inn-zone',
    name: 'ABUAD Talent City & Inn Area',
    category: 'area',
    universityId: 'abuad',
    universityName: 'ABUAD Area',
    state: 'Ekiti State'
  },
  {
    id: 'loc-eleko-pau-gate',
    name: 'Eleko Gateway Student Hub, Lekki',
    category: 'area',
    universityId: 'pau',
    universityName: 'PAU Area',
    state: 'Lagos State'
  },
  {
    id: 'loc-jabi-lake-quarter',
    name: 'Jabi Lake Student Commons, Abuja',
    category: 'area',
    universityId: 'nile',
    universityName: 'Nile / Baze Area',
    state: 'FCT Abuja'
  },
  {
    id: 'loc-ede-varsity-zone',
    name: 'Ede Scholar Residences',
    category: 'area',
    universityId: 'redeemers',
    universityName: "Redeemer's Area",
    state: 'Osun State'
  },
  {
    id: 'loc-iwo-student-square',
    name: 'Bowen Varsity Gate Square, Iwo',
    category: 'area',
    universityId: 'bowen',
    universityName: 'Bowen Area',
    state: 'Osun State'
  }
];

export const DEFAULT_RECENT_LOCATIONS = [
  'Covenant University, Ota (Canaanland)',
  'Babcock University, Ilishan-Remo (Main Campus)',
  'Pan-Atlantic University (PAU), Ibeju-Lekki',
  'Afe Babalola University (ABUAD), Ado-Ekiti'
];
