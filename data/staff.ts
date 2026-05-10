export interface StaffMember {
  name: string
  role: string
  bio?: string
  imageUrl?: string
  objectPosition?: string
  imageScale?: number
}

export const staff: StaffMember[] = [
  // Club roles
  {
    name: 'Noah',
    role: 'Dot Connector',
    bio: 'Help manage the behind the scenes stuff and make sure our club embodies the values we want to share.',
    imageUrl: '/staff/noah.png',
  },
  {
    name: 'Emilia Podesta',
    role: 'Dot Connector',
    bio: 'Help manage the behind the scenes stuff and make sure our club embodies the values we want to share.',
    imageUrl: '/staff/emilia-podesta.jpg',
  },
  {
    name: 'Ryan',
    role: 'Treasurer',
    bio: 'Manages club finances, tracks trip spending, handles the club card, and helps keep TUBC trips accessible and affordable for members.',
    imageUrl: '/staff/ryan.jpg',
  },
  {
    name: 'Summer Frazier',
    role: 'Potential Treasurer',
    bio: 'Handling the money and club card next year.',
    imageUrl: '/staff/summer-frazier.jpg',
    objectPosition: 'center 55%',
  },
  {
    name: 'Everett Harriss',
    role: 'Potential Treasurer',
    bio: 'Handling the money.',
    imageUrl: '/staff/everett-harriss.jpg',
  },
  {
    name: 'Abigail Lynch',
    role: 'Potential Treasurer',
    imageUrl: '/staff/abigail-lynch.jpg',
  },
  {
    name: 'Quinn Koch',
    role: 'Gear Lead',
    bio: 'I organize, acquire, distribute, and maintain backpacking and camping gear owned by TUBC.',
    imageUrl: '/staff/quinn-koch.jpg',
  },
  {
    name: 'Ellie Sellman',
    role: 'Gear Lead',
    bio: 'Organizing and distributing gear to ensure that trip participants and leads can access what they need.',
    imageUrl: '/staff/ellie-sellman.jpg',
  },
  // Social Media
  {
    name: 'Lucy Samuels',
    role: 'Social Media',
    bio: 'I co manage the Instagram (posting for socials, all of our pictures from trips, reaching out to sponsors) with Claire.',
    imageUrl: '/staff/lucy-samuels.jpg',
    objectPosition: 'center 55%',
  },
  {
    name: 'Claire Miller',
    role: 'Social Media',
    imageUrl: '/staff/claire-miller.jpg',
  },
  {
    name: 'Kristi Tomlinson',
    role: 'IKON Representative',
    imageUrl: '/staff/kristi-tomlinson.jpg',
  },
  {
    name: 'Georgiana Morris',
    role: 'IKON Pass Representative',
    bio: 'Lead trips to the great outdoors and help students acquire discounted IKON passes.',
    imageUrl: '/staff/georgiana-morris.jpg',
  },
  {
    name: 'Katherine Chen',
    role: 'Trip Lead / Social Chair',
    bio: 'Plan super awesome events for everyone.',
    imageUrl: '/staff/katherine-chen.png',
  },
  {
    name: 'Sofia Nyez',
    role: 'Social Planning / Newsletter',
    bio: 'I plan social events for our wonderful club, both for members & staff to cultivate our wonderful community. We have put on a Halloween fundrager, craft night, game night, and make-your-own granola social. My personal favorite was the beaded lizard crafting night, it was so awesome to see such a great turnout. In addition, I started a TUBC newsletter that I\'ve had members & staff contribute to, showcasing our journalistic & photography skills while showing off what our club has to offer. I also can be found moonlighting some merch designs... I <3 TUBC.',
    imageUrl: '/staff/sofia-nyez.jpg',
  },
  {
    name: 'Meg Houseworth',
    role: 'Socials / Trip Lead',
    bio: 'Plan fun events that allow our staff and general members to get to know each other better.',
    imageUrl: '/staff/meg-houseworth.jpg',
  },
  {
    name: 'Yash Goyal',
    role: 'Safety Officer',
    bio: 'Keeping members safe in the outdoors.',
    imageUrl: '/staff/yash-goyal.jpg',
  },

  // Staff Members / Trip Leads
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
    name: 'Oscar Bowring',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/oscar-bowring.jpg',
  },
  {
    name: 'Saskia Freedberg',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/saskia-freedberg.jpg',
  },
  {
    name: 'Katie Chang',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/katie-chang.jpg',
  },
  {
    name: 'Aleena Munshi',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/aleena-munshi.jpg',
  },
  {
    name: 'Angela Ke',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/angela-ke.jpg',
  },
  {
    name: 'Colin Soohoo',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/colin-soohoo.jpg',
  },
  {
    name: 'Dante Zanger',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/dante-zanger.jpg',
  },
  {
    name: 'Grace Gallego',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/grace-gallego.jpg',
  },
  {
    name: 'Jack Johns',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/jack-johns.jpg',
  },
  {
    name: 'Kira Dirghalli',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/kira-dirghalli.jpg',
  },
  {
    name: 'Lola McFarlane',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/lola-mcfarlane.jpg',
  },
  {
    name: 'Nour Rayess',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/nour-rayess.jpg',
  },
  {
    name: 'Sierra Anderson',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/sierra-anderson.jpg',
  },
  {
    name: 'Sofia Brown',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/sofia-brown.jpg',
  },
  {
    name: 'Sophia Woehl',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/sophia-woehl.jpg',
  },
  {
    name: 'Valerie Munerman',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/valerie-munerman.jpg',
  },
  {
    name: 'Will Orchard',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/will-orchard.jpg',
  },
  {
    name: 'Xander Pfistner',
    role: 'Staff Member / Trip Lead',
    imageUrl: '/staff/xander-pfistner.jpg',
  },
]

export const alumniTripLeads: StaffMember[] = [
  {
    name: 'Antonio Maldonado',
    role: 'Alumni Trip Lead',
    imageUrl: '/staff/antonio-maldonado.jpg',
  },
]
