import type { Tag } from '@/types'

export function formatTags(tags: string): Tag[] {
  return tags
    .split(';')
    .filter((tag) => tag.trim() !== '')
    .map((tag) => ({ text: tag.trim() }))
}
