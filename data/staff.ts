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
]
