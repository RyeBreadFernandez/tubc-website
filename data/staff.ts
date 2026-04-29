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
    bio: 'First got hooked on the Sierra after a TUBC trip to Cottonwood Lakes sophomore year and never really came back. Now runs the club, wrangles the permits, and is probably texting someone about next quarter\'s trip schedule right now.',
  },
  {
    name: 'Emilia',
    role: 'Co-President',
    bio: 'Joined TUBC with zero camping experience and somehow ended up leading Whitney Portal trips. Obsessed with trip logistics, knows every gear rental policy by heart, and will absolutely talk your ear off about ultralight sleep systems.',
  },
  {
    name: 'Ryan',
    role: 'Treasurer',
    bio: 'Keeps the budget tight so trip fees stay low and the gear closet stays stocked. Favorite route is the Tahoe Rim Trail. Has opinions about bear canisters.',
  },
]
