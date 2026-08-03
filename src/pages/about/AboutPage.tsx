import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '@/store/languageStore';
import { Award, Flame, Fish, Sparkles, ChefHat } from 'lucide-react';
import { cn } from '@/utils/cn';
import heroBg from '../../../assets/3.jpeg';

export function AboutPage() {
  const { t } = useTranslation('common');
  const { dir, language } = useLanguageStore();

  const values = [
    {
      icon: Flame,
      title: t('about.quality'),
      description: t('about.qualityDesc'),
      gradient: 'from-orange-500/20 to-red-500/10',
      iconColor: 'text-orange-500',
      iconBg: 'bg-orange-500/10',
    },
    {
      icon: Fish,
      title: t('about.customerFocus'),
      description: t('about.customerFocusDesc'),
      gradient: 'from-cyan-500/20 to-blue-500/10',
      iconColor: 'text-cyan-500',
      iconBg: 'bg-cyan-500/10',
    },
    {
      icon: Award,
      title: t('about.integrity'),
      description: t('about.integrityDesc'),
      gradient: 'from-primary/20 to-yellow-500/10',
      iconColor: 'text-primary',
      iconBg: 'bg-primary/10',
    },
    {
      icon: Sparkles,
      title: t('about.innovation'),
      description: t('about.innovationDesc'),
      gradient: 'from-purple-500/20 to-pink-500/10',
      iconColor: 'text-purple-500',
      iconBg: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="animate-fade-in" dir={dir}>

      {/* ─── HERO BANNER ─── */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="TrioPizza kitchen"
            className="w-full h-full object-cover object-top"
          />
          {/* Dark cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          {/* Brand tint */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/10 mix-blend-overlay" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 sm:px-6 py-20">
          {/* Badge */}
          <div className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6',
            'bg-primary/20 border border-primary/40 backdrop-blur-sm',
            'text-primary text-sm font-semibold animate-fade-in-up'
          )}>
            <ChefHat className="w-4 h-4" />
            {language === 'ar' ? 'قصتنا' : 'Our Story'}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight animate-fade-in-up"
              style={{ animationDelay: '80ms', opacity: 0 }}>
            {language === 'ar' ? (
              <>
                عن{' '}
                <span style={{
                  background: 'linear-gradient(135deg, hsl(45,93%,47%) 0%, hsl(30,95%,55%) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  TrioPizza
                </span>
              </>
            ) : (
              <>
                About{' '}
                <span style={{
                  background: 'linear-gradient(135deg, hsl(45,93%,47%) 0%, hsl(30,95%,55%) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  TrioPizza
                </span>
              </>
            )}
          </h1>

          <p className="mt-5 text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
             style={{ animationDelay: '160ms', opacity: 0 }}>
            {t('about.storyText')}
          </p>

          {/* Stats row */}
          <div className={cn(
            'flex flex-wrap items-center justify-center gap-6 mt-10 animate-fade-in-up'
          )} style={{ animationDelay: '240ms', opacity: 0 }}>
            {[
              { value: '2018', label: language === 'ar' ? 'تأسست عام' : 'Est.' },
              { value: '4.9★', label: language === 'ar' ? 'تقييم العملاء' : 'Customer Rating' },
              { value: '100%', label: language === 'ar' ? 'مأكولات بحرية طازجة' : 'Fresh Seafood' },
              { value: language === 'ar' ? 'فرن حطب' : 'Fire Oven', label: language === 'ar' ? 'خبز تقليدي' : 'Traditional Bake' },
            ].map(({ value, label }) => (
              <div key={label} className={cn(
                'flex flex-col items-center px-6 py-4 rounded-2xl',
                'bg-white/10 border border-white/15 backdrop-blur-md',
                'min-w-[120px]'
              )}>
                <span className="text-2xl font-extrabold text-primary">{value}</span>
                <span className="text-xs text-gray-300 mt-1 text-center">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MISSION & VISION ─── */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            {/* Mission */}
            <div className="relative group">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/30 to-orange-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-card rounded-2xl p-8 border border-border h-full overflow-hidden">
                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
                <div className={cn(
                  'w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6',
                  'transition-transform duration-300 group-hover:scale-110'
                )}>
                  <Flame className="w-7 h-7 text-orange-500" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {t('about.mission')}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {t('about.missionText')}
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="relative group">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-card rounded-2xl p-8 border border-border h-full overflow-hidden">
                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full" />
                <div className={cn(
                  'w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6',
                  'transition-transform duration-300 group-hover:scale-110'
                )}>
                  <Fish className="w-7 h-7 text-cyan-500" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {t('about.vision')}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {t('about.visionText')}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── VALUES / WHY TRIOPIZZA ─── */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-14">
            <div className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4',
              'bg-primary/10 border border-primary/20',
              'text-primary text-sm font-semibold'
            )}>
              <Sparkles className="w-4 h-4" />
              {language === 'ar' ? 'ما يميزنا' : 'What Sets Us Apart'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              {t('about.values')}
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              {language === 'ar'
                ? 'كل شيء نقوم به مبني على هذه المبادئ الأساسية'
                : 'Everything we do is built on these core principles'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={cn(
                  'group relative bg-card rounded-2xl p-6 border border-border overflow-hidden',
                  'transition-all duration-300',
                  'hover:shadow-soft-lg hover:border-primary/20 hover:-translate-y-1.5',
                  'animate-fade-in-up text-center'
                )}
                style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
              >
                {/* Background gradient blob */}
                <div className={cn(
                  'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                  value.gradient
                )} />

                <div className="relative z-10">
                  <div className={cn(
                    'w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5',
                    'transition-transform duration-300 group-hover:scale-110',
                    value.iconBg
                  )}>
                    <value.icon className={cn('w-7 h-7', value.iconColor)} />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
