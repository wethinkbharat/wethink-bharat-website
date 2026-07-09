import Image from 'next/image'
import { urlFor } from '@/sanity/imageUrl'

interface Props {
  image: Record<string, unknown> | null | undefined
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  fill?: boolean
}

export function SanityImage({
  image,
  alt,
  width,
  height,
  className,
  priority,
  fill,
}: Props) {
  if (!image) {
    // Placeholder when image is absent — never break layout
    return (
      <div
        className={className}
        style={{
          background: 'rgba(222,192,120,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(222,192,120,0.3)',
          fontSize: '12px',
        }}
        aria-label={alt}
      />
    )
  }

  const src = urlFor(image).width(width).height(height).url()

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
        style={{ objectFit: 'cover' }}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  )
}
