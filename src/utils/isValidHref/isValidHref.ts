export function isValidHref(href: string) {
  return /^https?:\/\//.test(href)
}
