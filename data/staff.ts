export interface StaffMember {
  name: string
  role: string
  bio: string
  imageUrl?: string
  objectPosition?: string
  imageScale?: number
}

export const staff: StaffMember[] = [
  // Dot Connector
  {
    name: 'Noah',
    role: 'Dot Connector',
    bio: 'Help manage the behind the scenes stuff and make sure our club embodies the values we want to share!',
    imageUrl: '/staff/noah.png',
  },
  {
    name: 'Emilia Podesta',
    role: 'Dot Connector',
    bio: 'Help manage the behind the scenes stuff and make sure our club embodies the values we want to share!',
    imageUrl: '/staff/emilia-podesta.jpg',
  },
  // Treasurer
  {
    name: 'Ryan',
    role: 'Treasurer',
    bio: 'Breaking down financial walls in the outdoors! Making sure club funds are in accordance and grant writing to keep trip costs down.',
    imageUrl: '/staff/ryan.jpg',
  },
  // Gear Lead
  {
    name: 'Quinn Koch',
    role: 'Gear Lead',
    bio: 'I organize, acquire, distribute, and maintain backpacking and camping gear owned by TUBC.',
    imageUrl: '/staff/quinn-koch.jpg',
  },
  // Social Media
  {
    name: 'Lucy Samuels',
    role: 'Social Media',
    bio: 'I co manage the Instagram (posting for socials, all of our pictures from trips, reaching out to sponsors) with Claire!',
    imageUrl: '/staff/lucy-samuels.jpg',
    objectPosition: 'center 55%',
  },
  // Ikon Representative
  {
    name: 'Kristi Tomlinson',
    role: 'Ikon Representative',
    bio: 'Staff Member / Trip Lead',
    imageUrl: '/staff/kristi-tomlinson.jpg',
  },
  // Staff Members / Trip Leads
  {
    name: 'Summer Frazier',
    role: 'Potential Treasurer',
    bio: 'Handling the money and club card next year',
    imageUrl: '/staff/summer-frazier.jpg',
    objectPosition: 'center 40%',
    imageScale: 1.15,
  },
  {
    name: 'Maris Durant-Bender',
    role: 'Staff Member / Trip Lead',
    bio: 'Staff Member / Trip Lead',
    imageUrl: '/staff/maris-durant-bender.jpg',
  },
  {
    name: 'Sloane Beeli',
    role: 'Staff Member / Trip Lead',
    bio: 'Staff Member / Trip Lead',
    imageUrl: '/staff/sloane-beeli.jpg',
  },
  {
    name: 'Yaas Motamedinia',
    role: 'Staff Member / Trip Lead',
    bio: 'Staff Member / Trip Lead',
    imageUrl: '/staff/yaas-motamedinia.jpg',
    objectPosition: 'center 70%',
  },
  {
    name: 'Anna Stuart',
    role: 'Staff Member / Trip Lead',
    bio: 'Staff Member / Trip Lead',
    imageUrl: '/staff/anna-stuart.jpg',
  },
  {
    name: 'Dahlia Shapiro',
    role: 'Staff Member / Trip Lead',
    bio: 'Staff Member / Trip Lead',
    imageUrl: '/staff/dahlia-shapiro.png',
    objectPosition: '25% center',
  },
  {
    name: 'Tallis Arnold',
    role: 'Staff Member / Trip Lead',
    bio: 'Staff Member / Trip Lead',
    imageUrl: '/staff/tallis-arnold.jpg',
  },
  {
    name: 'Jacob Bobrowsky',
    role: 'Staff Member / Trip Lead',
    bio: 'Staff Member / Trip Lead',
    imageUrl: '/staff/jacob-bobrowsky.jpg',
    objectPosition: '15% center',
  },
  {
    name: 'Laurel Anderson',
    role: 'Staff Member / Trip Lead',
    bio: 'Staff Member / Trip Lead',
    imageUrl: '/staff/laurel-anderson.jpg',
  },
  {
    name: 'Kendyl Gilbert',
    role: 'Staff Member / Trip Lead',
    bio: 'Staff Member / Trip Lead',
    imageUrl: '/staff/kendyl-gilbert.jpg',
  },
]
