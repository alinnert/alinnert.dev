type BadgeData = { color: string; icon?: string }

const badgesData: Record<string, BadgeData> = {
  CSS: { color: '#663399', icon: 'simple-icons:css' },
  Datenbanken: { color: 'oklch(0.5 0.08 180)', icon: 'ion:server-outline' },
  Git: { color: '#F05032', icon: 'simple-icons:git' },
  Go: { color: '#00ADD8', icon: 'simple-icons:go' },
  HTML: { color: '#E34F26', icon: 'simple-icons:html5' },
  Java: { color: 'oklch(0.55 0.2 50)' },
  JavaScript: { color: 'oklch(0.65 0.3 100)', icon: 'simple-icons:javascript' },
  Kotlin: { color: '#7F52FF', icon: 'simple-icons:kotlin' },
  'Node.js': { color: '#5FA04E', icon: 'simple-icons:nodedotjs' },
  PHP: { color: '#777BB4', icon: 'simple-icons:php' },
  PostgreSQL: { color: '#4169E1', icon: 'simple-icons:postgresql' },
  Quarkus: { color: '#4695EB', icon: 'simple-icons:quarkus' },
  Spring: { color: '#6DB33F', icon: 'simple-icons:spring' },
  SQLite: { color: 'oklch(0.5 0.1 237)', icon: 'simple-icons:sqlite' },
  TypeScript: { color: '#3178C6', icon: 'simple-icons:typescript' },
  React: { color: '#61DAFB', icon: 'simple-icons:react' },
  Vue: { color: '#4FC08D', icon: 'simple-icons:vuedotjs' },
  Redux: { color: '#764ABC', icon: 'simple-icons:redux' },
  TailwindCSS: { color: '#06B6D4', icon: 'simple-icons:tailwindcss' },
}

export function tagColorFromName(label: string): string | null {
  return badgesData[label].color ?? null
}

export function tagIconFromName(label: string): string | null {
  return badgesData[label].icon ?? null
}
