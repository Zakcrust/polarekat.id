import Link from 'next/link'
import { clients, products, portfolioItems, blogPosts } from '@/lib/data'
import BlogCard from '@/components/BlogCard'
import PortfolioCard from '@/components/PortfolioCard'

export default function HomePage() {
  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <section className="bg-navy px-[5%] pt-20 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[480px]">
        <div className="animate-fade-up">
          <span className="inline-block bg-gold/15 text-gold text-xs font-semibold px-3 py-1 rounded-full border border-gold/30 mb-5">
            ✦ #1 Cutting Sticker di Bandung
          </span>
          <h1 className="text-white text-4xl lg:text-[42px] leading-[1.2] font-bold mb-4">
            Sticker Berkualitas untuk <em className="text-gold not-italic">Branding Bisnis</em> Anda
          </h1>
          <p className="text-white/60 text-[15px] leading-relaxed mb-8 max-w-md">
            Polarekat.id menyediakan layanan cutting sticker profesional dengan material premium untuk kebutuhan branding dan dekorasi bisnis Anda di Bandung.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/produk"
              className="bg-gold text-navy font-bold px-6 py-3 rounded-lg text-sm btn-transition hover:bg-yellow-300 hover-glow-gold"
            >
              Lihat Produk
            </Link>
            <Link
              href="/portofolio"
              className="text-white font-semibold px-6 py-3 rounded-lg text-sm border border-white/30 btn-transition hover:border-white/60 hover:bg-white/5"
            >
              Portofolio Kami
            </Link>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="hidden lg:flex items-center justify-center animate-fade-in">
          <div className="bg-navy-mid rounded-[20px] overflow-hidden h-80 w-full relative border border-white/10">
            <img src="/images/cutting-sticker.webp" alt="Cutting Sticker Profesional" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-navy/85 text-white text-[11px] font-semibold px-3.5 py-1.5 rounded-full tracking-wider backdrop-blur-sm">
              PREMIUM CUTTING STICKER
            </span>
          </div>
        </div>
      </section>

      {/* ═══════ CLIENTS ═══════ */}
      <section className="bg-white py-10 px-[5%]">
        <p className="text-center text-[13px] font-semibold text-gray-400 uppercase tracking-widest mb-6">
          Dipercaya oleh Brand Ternama
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {clients.map((client) => (
            <span
              key={client}
              className="bg-gray-bg px-5 py-2.5 rounded-lg text-[13px] font-semibold text-gray-400 border border-gray-200 hover:border-gold hover:text-navy transition-all duration-200"
            >
              {client}
            </span>
          ))}
        </div>
      </section>

      {/* ═══════ PRODUCTS ═══════ */}
      <section className="py-20 px-[5%] bg-white">
        <h2 className="text-center text-4xl font-bold text-navy mb-2">Produk Kami</h2>
        <p className="text-center text-gray-400 text-[15px] mb-14 max-w-md mx-auto">
          Solusi lengkap cutting sticker untuk segala kebutuhan branding bisnis Anda.
        </p>

        {products.map((product, idx) => {
          const isReverse = idx % 2 === 1
          return (
            <div
              key={product.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 ${isReverse ? 'lg:[direction:rtl]' : ''}`}
            >
              <div className={isReverse ? 'lg:[direction:ltr]' : ''}>
                {/* Product image */}
                <div className="bg-navy rounded-[20px] h-72 overflow-hidden relative">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full gradient-gold flex items-center justify-center text-sm font-bold text-navy">P</div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
                </div>
              </div>
              <div className={isReverse ? 'lg:[direction:ltr]' : ''}>
                <span className="inline-block bg-indigo-50 text-indigo-600 text-[11px] font-bold px-2.5 py-1 rounded uppercase tracking-widest mb-3">
                  {product.tagline}
                </span>
                <h3 className="text-2xl font-bold mb-3 leading-tight">{product.name}</h3>
                <p className="text-gray-400 text-[15px] leading-relaxed mb-5">{product.description}</p>
                <div className="space-y-1.5">
                  {product.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-[13px] text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </section>

      {/* ═══════ PORTFOLIO PREVIEW ═══════ */}
      <section className="bg-navy py-20 px-[5%]">
        <h2 className="text-center text-4xl font-bold text-white mb-2">Portofolio</h2>
        <p className="text-center text-white/50 text-[15px] mb-10 max-w-md mx-auto">
          Hasil karya terbaik kami untuk klien di seluruh Indonesia.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {portfolioItems.slice(0, 3).map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>
        <div className="text-center">
          <p className="text-white/60 text-sm mb-4">Lihat lebih banyak hasil karya kami</p>
          <Link
            href="/portofolio"
            className="inline-block bg-gold text-navy font-bold text-sm px-6 py-3 rounded-lg btn-transition hover:bg-yellow-300 hover-glow-gold"
          >
            Lihat Semua Portofolio
          </Link>
        </div>
      </section>

      {/* ═══════ BLOG PREVIEW ═══════ */}
      <section className="bg-gray-bg py-20 px-[5%]">
        <h2 className="text-center text-4xl font-bold text-navy mb-2">Blog & Artikel</h2>
        <p className="text-center text-gray-400 text-[15px] mb-10 max-w-md mx-auto">
          Tips, tutorial, dan inspirasi seputar dunia cutting sticker.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogPosts.filter(p => p.status === 'published').slice(0, 6).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* ═══════ CONTACT ═══════ */}
      <section id="contact" className="bg-white py-20 px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-5 leading-tight">
              Hubungi Kami untuk <span className="text-gradient-gold">Konsultasi Gratis</span>
            </h2>

            <div className="space-y-3.5 mb-6">
              {[
                { icon: '📞', label: '+62 812-3456-7890' },
                { icon: '✉️', label: 'hello@polarekat.id' },
                { icon: '📍', label: 'Bandung, Jawa Barat, Indonesia' },
              ].map((detail) => (
                <div key={detail.label} className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="w-9 h-9 bg-navy rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">{detail.icon}</span>
                  </div>
                  {detail.label}
                </div>
              ))}
            </div>

            <div className="flex gap-2.5">
              {[
                { label: 'Instagram', handle: '@polarekat.id' },
                { label: 'WhatsApp', handle: '+62 812-3456-7890' },
                { label: 'Tokopedia', handle: 'polarekat' },
              ].map((s) => (
                <span
                  key={s.label}
                  className="bg-navy text-white text-xs font-semibold px-3.5 py-2 rounded-lg hover:bg-gold hover:text-navy transition-colors duration-200 cursor-pointer"
                >
                  {s.label}
                </span>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="bg-navy rounded-3xl h-72 w-full flex items-center justify-center relative overflow-hidden">
              <div className="w-28 h-28 rounded-full border-4 border-white/15 flex items-center justify-center animate-pulse-gold">
                <span className="text-4xl">📞</span>
              </div>
              <div className="absolute top-6 right-8 w-10 h-10 rounded-full bg-gold/20 animate-float" style={{ animationDelay: '0.5s' }} />
              <div className="absolute bottom-8 left-10 w-6 h-6 rounded-full bg-gold/15 animate-float" style={{ animationDelay: '1.5s' }} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
