'use client'
// Safe portable text renderer — no dangerouslySetInnerHTML
import type { PortableTextBlock } from '@portabletext/types'

interface PortableTextChild {
  _key: string
  _type: string
  text: string
  marks: string[]
}

interface Props {
  blocks: PortableTextBlock[]
  className?: string
  style?: React.CSSProperties
}

export function PortableTextRenderer({ blocks, className, style }: Props) {
  if (!blocks?.length) return null

  return (
    <div className={className} style={style}>
      {blocks.map((block, i) => {
        if (block._type !== 'block') return null

        const style = (block.style as string | undefined) ?? 'normal'
        const children = (block.children as PortableTextChild[] | undefined) ?? []

        const renderChildren = () =>
          children.map((child) => {
            let content: React.ReactNode = child.text

            if (child.marks?.includes('strong')) {
              content = <strong key={`${child._key}-strong`}>{content}</strong>
            }
            if (child.marks?.includes('em')) {
              content = <em key={`${child._key}-em`}>{content}</em>
            }
            if (child.marks?.includes('gold')) {
              content = (
                <span key={`${child._key}-gold`} className="text-gold">
                  {content}
                </span>
              )
            }

            return content
          })

        const key = (block._key as string | undefined) ?? String(i)

        if (style === 'h2') {
          return (
            <h2 key={key} className="mb-4 last:mb-0">
              {renderChildren()}
            </h2>
          )
        }

        if (style === 'h3') {
          return (
            <h3 key={key} className="mb-4 last:mb-0">
              {renderChildren()}
            </h3>
          )
        }

        return (
          <p key={key} className="mb-4 last:mb-0">
            {renderChildren()}
          </p>
        )
      })}
    </div>
  )
}
