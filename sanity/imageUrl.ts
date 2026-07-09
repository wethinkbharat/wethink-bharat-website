import imageUrlBuilder from '@sanity/image-url'
import { getClientInstance } from './client'

export function urlFor(source: Parameters<ReturnType<typeof imageUrlBuilder>['image']>[0]) {
  return imageUrlBuilder(getClientInstance()).image(source)
}
