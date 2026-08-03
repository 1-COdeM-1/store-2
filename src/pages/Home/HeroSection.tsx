import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ChevronDown, Star, Clock, Flame } from 'lucide-react';
import { useLanguageStore } from '@/store/languageStore';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';
import heroBg from '../../../assets/3.jpeg';

export function HeroSection() {
  const { t } = useTranslation('common');
  const { language, dir } = useLanguageStore();
  const navigate = useNavigate();
  const categoriesRef = useRef<HTMLDivElement>(null);

  const isRTL = dir === 'rtl';

  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section
        className={cn(
          'relative min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-4.5rem)]',
          'flex items-center overflow-hidden',
          /* Light mode: clean warm cream base */
          'bg-[#fdf8f0]',
          /* Dark mode: near-black */
          'dark:bg-[#0f0d0a]'
        )}
        dir={dir}
      >
        {/* ─── Decorative blobs (light) ─── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden dark:hidden">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute -bottom-24 right-0 w-[500px] h-[500px] rounded-full bg-amber-300/30 blur-[100px]" />
        </div>

        {/* ─── Decorative blobs (dark) ─── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden hidden dark:block">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-primary/15 blur-[140px]" />
          <div className="absolute -bottom-24 right-0 w-[500px] h-[500px] rounded-full bg-orange-900/30 blur-[120px]" />
        </div>

        {/* ─── GRID LAYOUT ─── */}
        <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-20">
          <div
            className={cn(
              'grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center',
              isRTL ? 'lg:flex-row-reverse' : ''
            )}
          >
            {/* ════════════════════════
                LEFT — Text Content
            ════════════════════════ */}
            <div
              className={cn(
                'flex flex-col gap-6',
                isRTL ? 'items-end text-right lg:order-2' : 'items-start text-left lg:order-1'
              )}
            >
              {/* Badge */}
              <div
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2 rounded-full',
                  'bg-primary/15 border border-primary/30',
                  'text-primary text-sm font-semibold',
                  'animate-fade-in-up'
                )}
              >
                <Flame className="w-4 h-4 fill-primary" />
                {t('newArrivals')}
              </div>

              {/* Headline */}
              <h1
                className={cn(
                  'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08]',
                  /* Always dark text in light mode, always white in dark */
                  'text-gray-900 dark:text-white',
                  'animate-fade-in-up'
                )}
                style={{ animationDelay: '80ms', opacity: 0 }}
              >
                {language === 'ar' ? (
                  <>
                    اكتشف منتجات
                    <span
                      className="block mt-2"
                      style={{
                        background: 'linear-gradient(135deg, hsl(45,93%,47%) 0%, hsl(30,95%,55%) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      متميزة وفاخرة
                    </span>
                  </>
                ) : (
                  <>
                    Discover
                    <span
                      className="block mt-2"
                      style={{
                        background: 'linear-gradient(135deg, hsl(45,93%,47%) 0%, hsl(30,95%,55%) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Premium Quality
                    </span>
                  </>
                )}
              </h1>

              {/* Description */}
              <p
                className={cn(
                  'text-base sm:text-lg leading-relaxed max-w-md',
                  'text-gray-600 dark:text-gray-300',
                  'animate-fade-in-up'
                )}
                style={{ animationDelay: '160ms', opacity: 0 }}
              >
                {t('hero.description')}
              </p>

              {/* Trust chips */}
              <div
                className={cn(
                  'flex flex-wrap gap-3',
                  'animate-fade-in-up'
                )}
                style={{ animationDelay: '220ms', opacity: 0 }}
              >
                {[
                  { icon: Star, label: language === 'ar' ? '٤.٩ تقييم' : '4.9 Rating' },
                  { icon: Clock, label: language === 'ar' ? 'توصيل سريع' : 'Fast Delivery' },
                  { icon: Flame, label: language === 'ar' ? 'طازج دائماً' : 'Always Fresh' },
                ].map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className={cn(
                      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium',
                      'bg-white/70 dark:bg-white/8 border border-gray-200/80 dark:border-white/10',
                      'text-gray-700 dark:text-gray-300',
                      'backdrop-blur-sm'
                    )}
                  >
                    <Icon className="w-3.5 h-3.5 text-primary" />
                    {label}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div
                className={cn(
                  'flex flex-col sm:flex-row items-start gap-3 mt-2',
                  'animate-fade-in-up'
                )}
                style={{ animationDelay: '300ms', opacity: 0 }}
              >
                <Button
                  size="lg"
                  onClick={() => navigate('/shop')}
                  className={cn(
                    'h-13 px-8 text-base font-bold rounded-2xl',
                    'bg-primary hover:bg-primary/90 text-black',
                    'shadow-[0_8px_30px_rgba(231,173,8,0.35)] hover:shadow-[0_12px_40px_rgba(231,173,8,0.5)]',
                    'transition-all duration-300 hover:-translate-y-1 active:translate-y-0'
                  )}
                >
                  {t('hero.ctaShop')}
                  <ArrowRight
                    className={cn('w-5 h-5', isRTL ? 'mr-2 rotate-180' : 'ml-2')}
                  />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={scrollToCategories}
                  className={cn(
                    'h-13 px-8 text-base font-semibold rounded-2xl',
                    'border-gray-300 dark:border-white/20',
                    'text-gray-800 dark:text-white',
                    'hover:bg-gray-100 dark:hover:bg-white/10',
                    'transition-all duration-300'
                  )}
                >
                  {t('hero.ctaCategories')}
                </Button>
              </div>
            </div>

            {/* ════════════════════════
                RIGHT — Image Showcase
            ════════════════════════ */}
            <div
              className={cn(
                'relative animate-fade-in-up',
                isRTL ? 'lg:order-1' : 'lg:order-2'
              )}
              style={{ animationDelay: '100ms', opacity: 0 }}
            >
              {/* Outer glow ring */}
              <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-primary/40 via-orange-400/20 to-primary/10 blur-2xl opacity-60 dark:opacity-80 animate-float" />

              {/* Image card */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-[0_32px_80px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_32px_80px_-12px_rgba(0,0,0,0.6)]">
                <img
                  src={heroBg}
                  alt="Trio Restaurant food showcase"
                  className="w-full aspect-[4/3] object-cover object-top"
                />

                {/* Bottom gradient scrim — only for the image card */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Floating badge on image */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span
                    className={cn(
                      'inline-flex items-center gap-2 px-4 py-2 rounded-xl',
                      'bg-black/55 backdrop-blur-md border border-white/15',
                      'text-white text-sm font-semibold'
                    )}
                  >
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    {language === 'ar' ? 'متوفر الآن' : 'Available Now'}
                  </span>

                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 px-4 py-2 rounded-xl',
                      'bg-primary backdrop-blur-md',
                      'text-black text-sm font-bold'
                    )}
                  >
                    <Star className="w-3.5 h-3.5 fill-black" />
                    4.9
                  </span>
                </div>
              </div>

              {/* Decorative corner circles */}
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-primary/20 dark:bg-primary/30 blur-xl" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-orange-400/20 dark:bg-orange-400/20 blur-2xl" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToCategories}
          className="absolute z-10 bottom-6 left-1/2 -translate-x-1/2 text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors duration-200 animate-bounce"
          aria-label="Scroll to categories"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </section>

      {/* Anchor for scroll */}
      <div ref={categoriesRef} />
    </>
  );
}
