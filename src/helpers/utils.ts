export function createRandomString(size: number = 100): string {
  const chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890'
  return Array(size)
    .fill(null)
    .map(i => chars[Math.floor(Math.random() * chars.length)])
    .join('')
}
