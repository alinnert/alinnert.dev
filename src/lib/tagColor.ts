const colors: Record<string, string> = {
  CSS: '#663399',
  Datenbanken: 'oklch(0.5 0.08 180)',
  Git: '#F05032',
  Go: '#00ADD8',
  HTML: '#E34F26',
  Java: 'oklch(0.55 0.2 50)',
  JavaScript: 'oklch(0.65 0.3 100)',
  Kotlin: '#7F52FF',
  'Node.js': '#5FA04E',
  PHP: '#777BB4',
  PostgreSQL: '#4169E1',
  Quarkus: '#4695EB',
  Spring: '#6DB33F',
  SQLite: 'oklch(0.5 0.1 237)',
  TypeScript: '#3178C6',
}

export function tagColorFromName(label: string): string | null {
  return colors[label] ?? null
}
