'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  isLoggedIn,
  getPostById,
  savePost,
  generateId,
  generateSlug,
  readFileAsDataURL,
  saveImage,
} from '@/lib/store'
import type { BlogPost } from '@/lib/data'

const toolbarButtons = ['B', 'I', 'U', 'H1', 'H2', 'H3', 'List', 'Link', 'Image', 'Quote']

function WritePageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('id')
  const bodyRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const contentImageRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [category, setCategory] = useState('')
  const [slug, setSlug] = useState('')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDesc, setMetaDesc] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [saveMessage, setSaveMessage] = useState('')
  const [mounted, setMounted] = useState(false)
  const [postId, setPostId] = useState('')

  useEffect(() => {
    setMounted(true)
    if (!isLoggedIn()) {
      router.push('/login')
      return
    }

    // Load existing post if editing
    if (editId) {
      const post = getPostById(editId)
      if (post) {
        setPostId(post.id)
        setTitle(post.title)
        setBody(post.body)
        setStatus(post.status)
        setCategory(post.category)
        setSlug(post.slug)
        setMetaTitle(post.metaTitle)
        setMetaDesc(post.metaDescription)
        setTags(post.tags)
        setCoverImage(post.coverImage)
      }
    } else {
      setPostId(generateId())
    }
  }, [editId, router])

  const showMessage = (msg: string) => {
    setSaveMessage(msg)
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const buildPost = (postStatus: 'draft' | 'published'): BlogPost => {
    const now = new Date().toISOString().split('T')[0]
    return {
      id: postId,
      title: title || 'Untitled',
      slug: slug || generateSlug(title || 'untitled'),
      body,
      category,
      tags,
      coverImage,
      metaTitle: metaTitle || title,
      metaDescription: metaDesc || title,
      status: postStatus,
      createdAt: editId ? (getPostById(editId)?.createdAt || now) : now,
      publishedAt: postStatus === 'published' ? now : '',
      excerpt: body.slice(0, 150).replace(/[#*_\n]/g, '').trim() || title,
    }
  }

  const handleSaveDraft = () => {
    if (!title.trim()) {
      showMessage('⚠️ Judul tidak boleh kosong')
      return
    }
    const post = buildPost('draft')
    savePost(post)
    showMessage('✅ Draft berhasil disimpan!')
  }

  const handlePublish = () => {
    if (!title.trim()) {
      showMessage('⚠️ Judul tidak boleh kosong')
      return
    }
    if (!category) {
      showMessage('⚠️ Pilih kategori terlebih dahulu')
      return
    }
    const post = buildPost('published')
    savePost(post)
    showMessage('✅ Post berhasil dipublish!')
    setTimeout(() => router.push('/admin'), 1000)
  }

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      showMessage('⚠️ File terlalu besar (max 5MB)')
      return
    }
    const dataUrl = await readFileAsDataURL(file)
    setCoverImage(dataUrl)
    // Also save to gallery
    saveImage({
      id: generateId(),
      name: file.name,
      data: dataUrl,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString(),
    })
    showMessage('✅ Cover image berhasil diupload!')
  }

  const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      showMessage('⚠️ File terlalu besar (max 5MB)')
      return
    }
    const dataUrl = await readFileAsDataURL(file)
    // Save to gallery
    saveImage({
      id: generateId(),
      name: file.name,
      data: dataUrl,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString(),
    })
    // Insert markdown image at cursor position in body
    const textarea = bodyRef.current
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const imgMarkdown = `\n![${file.name}](${dataUrl})\n`
      const newBody = body.slice(0, start) + imgMarkdown + body.slice(end)
      setBody(newBody)
    } else {
      setBody(body + `\n![${file.name}](${dataUrl})\n`)
    }
    showMessage('✅ Gambar berhasil disisipkan!')
    // Reset file input
    if (contentImageRef.current) contentImageRef.current.value = ''
  }

  const handleToolbar = (action: string) => {
    const textarea = bodyRef.current
    if (!textarea) return
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = body.slice(start, end)

    let insert = ''
    switch (action) {
      case 'B': insert = `**${selected || 'bold text'}**`; break
      case 'I': insert = `*${selected || 'italic text'}*`; break
      case 'U': insert = `<u>${selected || 'underline text'}</u>`; break
      case 'H1': insert = `\n# ${selected || 'Heading 1'}\n`; break
      case 'H2': insert = `\n## ${selected || 'Heading 2'}\n`; break
      case 'H3': insert = `\n### ${selected || 'Heading 3'}\n`; break
      case 'List': insert = `\n- ${selected || 'List item'}\n`; break
      case 'Link': insert = `[${selected || 'link text'}](url)`; break
      case 'Image':
        // Trigger file upload
        contentImageRef.current?.click()
        return
      case 'Quote': insert = `\n> ${selected || 'Quote text'}\n`; break
    }

    const newBody = body.slice(0, start) + insert + body.slice(end)
    setBody(newBody)
    // Re-focus textarea
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + insert.length, start + insert.length)
    }, 0)
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  // Auto-generate slug from title
  useEffect(() => {
    if (!editId && title) {
      setSlug(generateSlug(title))
    }
  }, [title, editId])

  if (!mounted) return null

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-admin">
      {/* Admin Nav */}
      <div className="bg-navy px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/images/logo.png" alt="Polarekat.id" className="w-7 h-7 rounded object-contain bg-white p-0.5" />
          <h1 className="text-white text-[15px] font-bold">
            {editId ? 'Edit Post' : 'Tulis Post Baru'}
          </h1>
        </div>
        <Link
          href="/admin"
          className="text-white/60 text-sm hover:text-white transition-colors duration-200"
        >
          ← Dashboard
        </Link>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleCoverUpload}
      />
      <input
        ref={contentImageRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleContentImageUpload}
      />

      {/* Write Body */}
      <div className="p-8">
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-navy">Editor</h2>
            {saveMessage && (
              <span className="text-sm font-medium animate-fade-in bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                {saveMessage}
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSaveDraft}
              className="bg-white text-navy font-semibold text-sm px-5 py-2 rounded-lg border border-gray-200 btn-transition hover:bg-gray-50"
            >
              💾 Save Draft
            </button>
            <button
              onClick={handlePublish}
              className="bg-gold text-navy font-bold text-sm px-5 py-2 rounded-lg btn-transition hover:bg-yellow-300 hover-glow-gold"
            >
              🚀 Publish
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          {/* Main Editor */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 px-4 py-2.5 border-b border-gray-200">
              {toolbarButtons.map((btn) => (
                <button
                  key={btn}
                  onClick={() => handleToolbar(btn)}
                  className="px-2.5 py-1 rounded text-[12px] font-bold text-gray-400 border border-gray-200 hover:bg-gray-100 hover:text-navy transition-colors duration-150 cursor-pointer"
                >
                  {btn}
                </button>
              ))}
            </div>

            {/* Title */}
            <input
              type="text"
              placeholder="Judul artikel..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-none px-5 pt-5 pb-2 text-[28px] font-bold text-navy outline-none bg-transparent placeholder:text-gray-300"
            />

            {/* Body */}
            <textarea
              ref={bodyRef}
              placeholder="Tulis konten artikel di sini... (Mendukung Markdown)"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full border-none px-5 py-4 text-[15px] text-navy outline-none resize-none bg-transparent min-h-[380px] leading-relaxed placeholder:text-gray-300"
            />
          </div>

          {/* Settings Panel */}
          <div className="space-y-4">
            {/* Post Settings */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h4 className="text-[13px] font-bold text-navy uppercase tracking-wider mb-3">Post Settings</h4>

              <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide mb-1 block">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                className="w-full border border-gray-200 rounded-lg px-2.5 py-2 text-[13px] text-navy outline-none mb-3 bg-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>

              <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide mb-1 block">
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-2.5 py-2 text-[13px] text-navy outline-none mb-3 bg-white"
              >
                <option value="">Pilih Kategori</option>
                <option value="Tutorial">Tutorial</option>
                <option value="Tips & Trik">Tips & Trik</option>
                <option value="DIY">DIY</option>
                <option value="Inspirasi">Inspirasi</option>
                <option value="Bisnis">Bisnis</option>
              </select>

              <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide mb-1 block">
                URL Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="url-slug-artikel"
                className="w-full border border-gray-200 rounded-lg px-2.5 py-2 text-[13px] text-navy outline-none bg-white"
              />
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h4 className="text-[13px] font-bold text-navy uppercase tracking-wider mb-3">Featured Image</h4>
              {coverImage ? (
                <div className="relative group">
                  <img
                    src={coverImage}
                    alt="Cover"
                    className="w-full h-36 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setCoverImage('')}
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-gold transition-colors duration-200"
                >
                  <span className="text-3xl mb-2 block">📷</span>
                  <p className="text-gray-400 text-xs">
                    Drag & drop gambar atau klik untuk upload
                  </p>
                  <p className="text-gray-300 text-[10px] mt-1">JPG, PNG, WebP · max 5MB</p>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h4 className="text-[13px] font-bold text-navy uppercase tracking-wider mb-3">Tags</h4>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-navy text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="text-white/60 hover:text-white ml-0.5 text-[10px]"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Tambah tag..."
                  className="flex-1 border border-gray-200 rounded-lg px-2.5 py-1.5 text-[13px] text-navy outline-none bg-white"
                />
                <button
                  onClick={addTag}
                  className="bg-gray-100 text-navy text-xs font-bold px-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* SEO */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h4 className="text-[13px] font-bold text-navy uppercase tracking-wider mb-3">SEO</h4>

              <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide mb-1 block">
                Meta Title
              </label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Title untuk SEO..."
                className="w-full border border-gray-200 rounded-lg px-2.5 py-2 text-[13px] text-navy outline-none mb-3 bg-white"
              />

              <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide mb-1 block">
                Meta Description
              </label>
              <textarea
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                placeholder="Deskripsi singkat untuk mesin pencari..."
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-2.5 py-2 text-[13px] text-navy outline-none resize-none bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WritePage() {
  return (
    <Suspense fallback={null}>
      <WritePageInner />
    </Suspense>
  )
}
