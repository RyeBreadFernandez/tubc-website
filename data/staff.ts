export interface StaffMember {
  name: string
  role: string
  bio: string
  imageUrl?: string
}

export const staff: StaffMember[] = [
  {
    name: 'Noah',
    role: 'Co-President',
    bio: 'Leading the club and coordinating with UCLA to keep the adventure going for everyone.',
  },
  {
    name: 'Emilia',
    role: 'Co-President',
    bio: 'Supporting club operations and helping plan an amazing lineup of trips each quarter.',
  },
  {
    name: 'Ryan',
    role: 'Treasurer',
    bio: 'Keeping the books balanced so we can keep the gear stocked and the permits paid.',
  },
  {
    name: 'Secretary',
    role: 'Secretary',
    bio: 'Handling communications, meeting notes, and keeping everyone in the loop.',
  },
  {
    name: 'Gear Manager',
    role: 'Gear Manager',
    bio: 'Maintaining our rental gear inventory and helping members find the right kit for their trip.',
  },
  {
    name: 'Social Chair',
    role: 'Social Chair',
    bio: 'Organizing socials, post-trip hangouts, and keeping the community tight-knit.',
  },
  {
    name: 'Trip Coordinator',
    role: 'Trip Coordinator',
    bio: 'Planning and scheduling the trip calendar, wrangling permits, and supporting trip leaders.',
  },
]
