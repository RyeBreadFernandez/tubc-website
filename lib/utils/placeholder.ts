const PHOTOS = [
  'photo-1464822759023-fed622ff2c3b', // mountain landscape
  'photo-1551632811-561732d1e306', // hiking trail
  'photo-1506905925346-21bda4d32df4', // alpine lake
  'photo-1527489377706-5bf97e608852', // campfire
  'photo-1501854140801-50d01698950b', // sierra nevada
  'photo-1476611317561-60117649dd94', // foggy trail
  'photo-1439853949212-36089fb60f47', // mountain sunset
  'photo-1445307806294-bff7f67ff225', // forest path
]

export function getMountainPlaceholder(seed: string, width = 800, height = 600): string {
  const index = seed.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % PHOTOS.length
  return `https://images.unsplash.com/${PHOTOS[index]}?auto=format&fit=crop&w=${width}&h=${height}&q=80`
}
