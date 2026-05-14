import Image from 'next/image'

interface Props {
  title: string
  subtitle?: string
  image?: string
  imageAlt?: string
  imagePosition?: string
}

export default function PageHero({ title, subtitle, image, imageAlt = '', imagePosition = 'center' }: Props) {
  return (
    <section className="relative pt-32 pb-20 flex items-center">
      {image && (
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: imagePosition }}
        />
      )}
      {image && <div className="absolute inset-0 bg-bark/65" />}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className={`font-display text-4xl md:text-5xl font-bold ${image ? 'text-parchment' : 'text-bark'}`}>
          {title}
        </h1>
        {subtitle && (
          <p className={`mt-4 text-lg max-w-2xl ${image ? 'text-parchment' : 'text-soil'}`}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
