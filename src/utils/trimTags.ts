export function trimTags(tags: string): string {
  return tags
    .split(';')
    .filter((tag) => tag.trim() !== '')
    .map((tag) => tag.trim())
    .join(';')
}
