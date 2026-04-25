'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
// highlight.js dark theme — code blocks use our linen-900 bg from prose-pre:*
import 'highlight.js/styles/github-dark.css'

/* ──────────────────────────────────────────────────────────────────────────
   MarkdownRenderer
   Thin wrapper around react-markdown. All typography styling is handled by
   the `prose` classes on the parent <section> in the post page — no
   duplicate class application here.
   ────────────────────────────────────────────────────────────────────────── */
export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    /*
     * The wrapping <div> intentionally has no prose classes — the parent
     * <section> in app/(public)/blog/[slug]/page.tsx owns all prose-*
     * modifiers. This keeps MarkdownRenderer composable and side-effect-free.
     */
    <div>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeSlug]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
