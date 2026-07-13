export interface BlogPost {
  id: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  content: string
}

interface ParsedFrontmatter {
  title?: string
  date?: string
  tags?: string
  excerpt?: string
}

const postModules = import.meta.glob('./posts/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>

function slugFromPath(path: string): string {
  const fileName = path.split('/').pop() ?? ''
  return fileName.replace(/\.md$/, '')
}

function parseFrontmatter(raw: string): { meta: ParsedFrontmatter; content: string } {
  if (!raw.startsWith('---\n')) {
    return { meta: {}, content: raw.trim() }
  }

  const endIndex = raw.indexOf('\n---\n', 4)
  if (endIndex < 0) {
    return { meta: {}, content: raw.trim() }
  }

  const frontmatter = raw.slice(4, endIndex).trim()
  const content = raw.slice(endIndex + 5).trim()
  const meta: ParsedFrontmatter = {}

  frontmatter.split('\n').forEach((line) => {
    const [rawKey, ...rawValue] = line.split(':')
    if (!rawKey || rawValue.length === 0) {
      return
    }

    const key = rawKey.trim() as keyof ParsedFrontmatter
    const value = rawValue.join(':').trim().replace(/^["']|["']$/g, '')
    meta[key] = value
  })

  return { meta, content }
}

function parseTags(rawTags?: string): string[] {
  if (!rawTags) {
    return []
  }

  const normalized = rawTags.replace(/^\[|\]$/g, '')
  return normalized
    .split(',')
    .map((tag) => tag.trim().replace(/^["']|["']$/g, ''))
    .filter(Boolean)
}

function stripMarkdown(text: string): string {
  return text
    .replace(/^#+\s*/gm, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^[-*]\s+/gm, '')
    .trim()
}

function inferExcerpt(content: string): string {
  const firstParagraph = content
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line && !line.startsWith('#') && !line.startsWith('- ') && !line.startsWith('>'))

  return stripMarkdown(firstParagraph ?? content).slice(0, 180)
}

function parsePost(path: string, raw: string): BlogPost {
  const id = slugFromPath(path)
  const { meta, content } = parseFrontmatter(raw)

  return {
    id,
    title: meta.title || id.replace(/-/g, ' '),
    date: meta.date || '',
    tags: parseTags(meta.tags),
    excerpt: meta.excerpt || inferExcerpt(content),
    content,
  }
}

export const blogPosts: BlogPost[] = Object.entries(postModules)
  .map(([path, raw]) => parsePost(path, raw))
  .sort((a, b) => b.date.localeCompare(a.date))
