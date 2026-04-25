import { getAllPosts } from '@/lib/actions/posts'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'
import { format } from 'date-fns'
import { Post } from '@/types'

/* Server Component — no client JS needed */
export default async function DashboardPage() {
  const posts = await getAllPosts()

  return (
    <div className='space-y-8'>
      {/* ── Page header ───────────────────────────────────────────────── */}
      <div className='flex flex-wrap items-start justify-between gap-4'>
        <div>
          <h1 className='font-heading text-2xl font-bold text-text md:text-3xl'>
            Manage Posts
          </h1>
          <p className='mt-1 text-sm text-text-muted'>
            {posts.length} {posts.length === 1 ? 'article' : 'articles'} in your
            library.
          </p>
        </div>
        <Link href='/create' className='btn-primary'>
          + New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* ── Desktop table (md+) ──────────────────────────────────── */}
          <div
            className='hidden md:block overflow-hidden rounded-xl border
                        border-border bg-surface shadow-card'
          >
            <div className='overflow-x-auto'>
              <table className='w-full text-left'>
                <thead>
                  <tr className='border-b border-border bg-surface-tinted'>
                    {['Title', 'Date', 'Likes', 'Status', ''].map((h) => (
                      <th
                        key={h}
                        scope='col'
                        className={`px-6 py-4 text-[11px] font-bold uppercase
                                   tracking-widest text-text-subtle
                                   ${h === 'Likes' ? 'hidden lg:table-cell' : ''}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='divide-y divide-border'>
                  {posts.map((post) => (
                    <tr
                      key={post.id}
                      className='group transition-colors hover:bg-surface-tinted/60'
                    >
                      {/* Title + slug */}
                      <td className='px-6 py-4'>
                        <p
                          className='font-semibold text-text text-sm
                                     group-hover:text-primary-600 transition-colors'
                        >
                          {post.title}
                        </p>
                        <p className='mt-0.5 font-mono text-xs text-text-subtle'>
                          /{post.slug}
                        </p>
                      </td>

                      {/* Date — Caveat handwritten */}
                      <td className='px-6 py-4 font-handwritten text-base text-text-muted whitespace-nowrap'>
                        {format(new Date(post.created_at), 'MMM d, yyyy')}
                      </td>

                      {/* Likes — hidden at md (table first appears), shown at lg+ */}
                      <td className='hidden px-6 py-4 text-center lg:table-cell'>
                        <span className='inline-flex items-center gap-1 text-xs text-text-muted'>
                          <span aria-hidden='true'>♥</span>
                          {post.likes_count}
                        </span>
                      </td>

                      {/* Status badge */}
                      <td className='px-6 py-4'>
                        <StatusBadge published={post.is_published} />
                      </td>

                      {/* Actions — pencil + trash icon buttons */}
                      <td className='px-6 py-4'>
                        <div className='flex items-center justify-end gap-1'>
                          <Link
                            href={`/edit/${post.id}`}
                            title='Edit post'
                            aria-label={`Edit: ${post.title}`}
                            className='inline-flex h-11 w-11 items-center justify-center
                                       rounded text-text-subtle hover:bg-primary-50
                                       hover:text-primary-600 transition-colors'
                          >
                            <span aria-hidden='true'>✏</span>
                          </Link>
                          <DeleteButton id={post.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Mobile card list (< md) ───────────────────────────────── */}
          <ul role='list' aria-label='Posts' className='space-y-3 md:hidden'>
            {posts.map((post) => (
              <li
                key={post.id}
                className='rounded-lg border border-border bg-surface
                           p-4 shadow-card space-y-3'
              >
                {/* Title row */}
                <div className='flex items-start justify-between gap-3'>
                  <div className='min-w-0'>
                    <p className='truncate text-sm font-semibold text-text'>
                      {post.title}
                    </p>
                    <p className='mt-0.5 font-mono text-xs text-text-subtle'>
                      /{post.slug}
                    </p>
                  </div>
                  <StatusBadge published={post.is_published} />
                </div>

                {/* Meta row */}
                <div className='flex items-center justify-between text-xs text-text-muted'>
                  <span className='font-handwritten text-sm'>
                    {format(new Date(post.created_at), 'MMM d, yyyy')}
                  </span>
                  <span className='flex items-center gap-1'>
                    <span aria-hidden='true'>♥</span> {post.likes_count}
                  </span>
                </div>

                {/* Action row */}
                <div className='flex items-center justify-end gap-2 border-t border-border pt-3'>
                  <Link
                    href={`/edit/${post.id}`}
                    className='btn-outline py-1.5 px-3 text-xs'
                  >
                    ✏ Edit
                  </Link>
                  <DeleteButton id={post.id} />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

/* ── Status badge ─────────────────────────────────────────────────────── */
function StatusBadge({ published }: { published: boolean }) {
  if (published) {
    return (
      <span
        className='inline-flex items-center gap-1.5 rounded-full border
                   border-success-200 bg-success-50 px-2.5 py-1 text-[10px]
                   font-bold uppercase tracking-wider text-success-600'
      >
        <span className='h-1.5 w-1.5 rounded-full bg-success-500 animate-pulse' />
        Live
      </span>
    )
  }
  return (
    <span
      className='inline-flex items-center gap-1.5 rounded-full border
                 border-warning-200 bg-warning-50 px-2.5 py-1 text-[10px]
                 font-bold uppercase tracking-wider text-warning-600'
    >
      <span className='h-1.5 w-1.5 rounded-full bg-warning-500' />
      Draft
    </span>
  )
}

/* ── Empty state ──────────────────────────────────────────────────────── */
function EmptyState() {
  return (
    <div className='rounded-xl border border-border bg-surface p-16 text-center'>
      <div
        className='mx-auto mb-4 flex h-16 w-16 items-center justify-center
                   rounded-2xl border border-border bg-surface-tinted'
      >
        <span className='text-2xl' aria-hidden='true'>
          ✍️
        </span>
      </div>
      <p className='mb-4 font-medium text-text-muted'>Your library is empty.</p>
      <Link href='/create' className='btn-primary'>
        Create your first post
      </Link>
    </div>
  )
}
