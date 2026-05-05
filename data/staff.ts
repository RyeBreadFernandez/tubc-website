export interface StaffMember {
  name: string
  role: string
  bio?: string
  imageUrl?: string
  objectPosition?: string
  imageScale?: number
}

export const staff: StaffMember[] = [
  // Dot Connector
  {
    name: 'Noah',
    role: 'Dot Connector',
    bio: 'Keeps the wheels turning behind the scenes — wrangling logistics, connecting officers, and making sure nothing falls through the cracks.',
    imageUrl: '/staff/noah.png',
  },
  {
    name: 'Emilia Podesta',
    role: 'Dot Connector',
    bio: 'Keeps the wheels turning behind the scenes — wrangling logistics, connecting officers, and making sure nothing falls through the cracks.',
    imageUrl: '/staff/emilia-podesta.jpg',
  },
  // Finance
  {
    name: 'Ryan',
    role: 'Finance',
    bio: 'Writes grants and manages the club card so trip costs stay low. If your trip subsidy came through, this is why.',
    imageUrl: '/staff/ryan.jpg',
  },
  // Gear Lead
  {
    name: 'Quinn Koch',
    role: 'Gear Lead',
    bio: 'Runs the club gear stash — tents, packs, sleep systems. If you need to borrow something before a trip, Quinn is the person to ask.',
    imageUrl: '/staff/quinn-koch.jpg',
  },
  // TODO: drop ellie-sellman.jpg into public/staff/ before deploying
  {
    name: 'Ellie Sellman',
    role: 'Gear Lead',
    bio: 'Organizing and distributing gear to ensure that trip participants and leads can access what they need',
    imageUrl: '/staff/ellie-sellman.jpg',
  },
  // Social Media
  {
    name: 'Lucy Samuels',
    role: 'Social Media',
    bio: 'Handles the Instagram — trip photos, sponsor outreach, and making sure the feed actually looks like the Sierra and not a stock photo site.',
    imageUrl: '/staff/lucy-samuels.jpg',
    objectPosition: 'center 55%',
  },
  // Ikon Representative
  {
    name: 'Kristi Tomlinson',
    role: 'Ikon Representative',
    imageUrl: '/staff/kristi-tomlinson.jpg',
  },
  // TODO: drop georgiana-morris.jpg into public/staff/ before deploying
  {
    name: 'Georgiana Morris',
    role: 'IKON Pass Representative',
    bio: 'Lead trips to the great outdoors and help students acquire discounted IKON passes.',
    imageUrl: '/staff/georgiana-morris.jpg',
  },
  // Staff Members / Trip Leads
  {
    name: 'Summer Frazier',
    role: 'Finance',
    bio: 'Manages the club card and keeps spending on track so we can keep subsidizing trips.',
    imageUrl: '/staff/summer-frazier.jpg',
    objectPosition: 'center 55%',
  },
  {
    name: 'Maris Durant-Bender',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/maris-durant-bender.jpg',
  },
  {
    name: 'Sloane Beeli',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/sloane-beeli.jpg',
  },
  {
    name: 'Yaas Motamedinia',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/yaas-motamedinia.jpg',
    objectPosition: 'center 70%',
  },
  {
    name: 'Anna Stuart',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/anna-stuart.jpg',
  },
  {
    name: 'Dahlia Shapiro',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/dahlia-shapiro.png',
    objectPosition: '25% center',
  },
  {
    name: 'Tallis Arnold',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/tallis-arnold.jpg',
  },
  {
    name: 'Jacob Bobrowsky',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/jacob-bobrowsky.jpg',
    objectPosition: '15% center',
  },
  {
    name: 'Laurel Anderson',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/laurel-anderson.jpg',
  },
  {
    name: 'Kendyl Gilbert',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/kendyl-gilbert.jpg',
  },
  {
    name: 'Everett Harriss',
    role: 'Finance',
    bio: 'Tracks club finances and helps make sure grant money actually gets to the trips that need it.',
    imageUrl: '/staff/everett-harriss.jpg',
  },
  {
    name: 'Abigail Lynch',
    role: 'Finance',
    imageUrl: '/staff/abigail-lynch.jpg',
  },
  {
    name: 'Oscar Bowring',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/oscar-bowring.jpg',
  },
  {
    name: 'Katherine Chen',
    role: 'Trip Lead / Social Chair',
    bio: 'Plans the off-trail stuff — socials, events, anything that happens when we\'re not on a mountain.',
    imageUrl: '/staff/katherine-chen.png',
  },
  {
    name: 'Sofia Nyez',
    role: 'Social Planning / Newsletter',
    bio: 'Started the TUBC newsletter and runs the social calendar. Halloween fundraisers, craft nights, make-your-own granola — all Sofia.',
    imageUrl: '/staff/sofia-nyez.jpg',
  },
  {
    name: 'Meg Houseworth',
    role: 'Socials / Trip Lead',
    bio: 'Organizes events that get members and staff in the same room — without a permit requirement.',
    imageUrl: '/staff/meg-houseworth.jpg',
  },
  {
    name: 'Yash Goyal',
    role: 'Safety Officer',
    bio: 'Makes sure trip leads are trained, first aid kits are stocked, and our risk management actually holds up in the field.',
    imageUrl: '/staff/yash-goyal.jpg',
  },
  {
    name: 'Saskia Freedberg',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/saskia-freedberg.jpg',
  },
  // TODO: drop katie-chang.jpg into public/staff/ before deploying
  {
    name: 'Katie Chang',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/katie-chang.jpg',
  },
]
