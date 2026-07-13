import { useState } from 'react'
import { blogPosts, BlogPost } from '../content/blog'
import './BlogWindow.css'

function renderInline(text: string) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g)

  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={index}>{part.slice(1, -1)}</code>
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index}>{part.slice(1, -1)}</em>
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch) {
      return (
        <a key={index} href={linkMatch[2]} target="_blank" rel="noreferrer">
          {linkMatch[1]}
        </a>
      )
    }

    return <span key={index}>{part}</span>
  })
}

function renderMarkdown(content: string) {
  const lines = content.split('\n')
  const blocks: JSX.Element[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i].trim()

    if (!line) {
      i += 1
      continue
    }

    if (line.startsWith('### ')) {
      blocks.push(
        <h3 key={`h3-${i}`} className="content-h3">
          {renderInline(line.slice(4))}
        </h3>,
      )
      i += 1
      continue
    }

    if (line.startsWith('## ')) {
      blocks.push(
        <h2 key={`h2-${i}`} className="content-h2">
          {renderInline(line.slice(3))}
        </h2>,
      )
      i += 1
      continue
    }

    if (line.startsWith('# ')) {
      blocks.push(
        <h1 key={`h1-${i}`} className="content-h1">
          {renderInline(line.slice(2))}
        </h1>,
      )
      i += 1
      continue
    }

    if (line === '---') {
      blocks.push(<hr key={`hr-${i}`} className="content-hr" />)
      i += 1
      continue
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''))
        i += 1
      }
      blocks.push(
        <ol key={`ol-${i}`} className="content-ol">
          {items.map((item, index) => (
            <li key={index}>{renderInline(item)}</li>
          ))}
        </ol>,
      )
      continue
    }

    if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2))
        i += 1
      }
      blocks.push(
        <ul key={`ul-${i}`} className="content-ul">
          {items.map((item, index) => (
            <li key={index}>{renderInline(item)}</li>
          ))}
        </ul>,
      )
      continue
    }

    blocks.push(
      <p key={`p-${i}`} className="content-p">
        {renderInline(line)}
      </p>,
    )
    i += 1
  }

  return blocks
}

export default function BlogWindow() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  if (selectedPost) {
    return (
      <div className="blog-window">
        <button className="blog-back-button" onClick={() => setSelectedPost(null)} type="button">
          &lt; all posts
        </button>

        <article className="blog-post">
          <header className="blog-post-header">
            <h1 className="blog-post-title">{selectedPost.title}</h1>
            <div className="blog-post-meta">
              <time className="blog-card-date">{selectedPost.date}</time>
              {selectedPost.tags.length > 0 && (
                <span className="blog-card-tags">{selectedPost.tags.join(' / ')}</span>
              )}
            </div>
          </header>

          <div className="blog-post-content">{renderMarkdown(selectedPost.content)}</div>
        </article>
      </div>
    )
  }

  return (
    <div className="blog-window">
      <div className="blog-intro">
        <h2>Essays</h2>
        <p>
          A small collection of notes and essays.
        </p>
      </div>

      <div className="blog-index">
        {blogPosts.map((post) => (
          <article key={post.id} className="blog-index-item">
            <button className="blog-index-title" onClick={() => setSelectedPost(post)} type="button">
              {post.title}
            </button>
            <div className="blog-index-meta">
              <time className="blog-card-date">{post.date}</time>
              {post.tags.length > 0 && <span className="blog-card-tags">{post.tags.join(' / ')}</span>}
            </div>
            <p className="blog-card-excerpt">{post.excerpt}</p>
          </article>
        ))}

        {blogPosts.length === 0 && (
          <p className="blog-empty">No essays yet.</p>
        )}
      </div>
    </div>
  )
}
