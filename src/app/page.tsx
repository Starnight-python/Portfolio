'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Bot,
  ChevronDown,
  Code2,
  Cpu,
  Megaphone,
  Send,
  Shield,
  Sparkles,
  Terminal,
} from 'lucide-react'

/* ── data ─────────────────────────────────────────────── */

const TELEGRAM_URL = 'https://t.me/starnighted'
const TELEGRAM_CHANNEL_URL = 'https://t.me/starnight_official'
const TIKTOK_URL = 'https://tiktok.com/@starnight117'

const TYPE_PHRASES = [
  'начинающий пентестер',
  'веб-разработчик',
  'житель Debian 13',
  'создаю Capri AI',
]

const DEBIAN_ART = [
  '        _,met$$$$$gg.',
  '     ,g$$$$$$$$$$$$$$$P.',
  '   ,g$$P""       """Y$$.".',
  '  ,$$P\'              `$$$.',
  ' \'$$P       ,ggs.     `$$b:',
  ' `d$$\'     ,$P"\'   .    $$$',
  '  $$P      d$\'     ,    $$P',
  '  $$:      $$.   -    ,d$$\'',
  '  $$;      Y$b._   _,d$P\'',
  '  Y$$.    `.`"Y$$$$P"\'',
  '  `$$b      "-.__',
  '   `Y$$',
  '    `Y$$.',
  '      `$$b.',
  '        `Y$$b.',
  '           `"Y$b._',
  '               `"""',
].join('\n')

const NEOFETCH_LINES: Array<[string, string]> = [
  ['OS', 'Debian GNU/Linux 13 (Trixie) x86_64'],
  ['DE', 'KDE Plasma 6'],
  ['WM', 'KWin'],
  ['Shell', 'bash'],
  ['Terminal', 'konsole'],
  ['Theme', 'Black · White · Red'],
  ['Focus', 'pentest · web-dev'],
  ['Uptime', '24/7 в терминале'],
  ['Status', 'в постоянном обучении'],
]

const TICKER = [
  'osint',
  'nmap',
  'next.js',
  'typescript',
  'debian 13',
  'kde plasma 6',
  'burp suite',
  'tailwind css',
  'capri ai',
  'bash',
  'kali linux',
  'git',
]

const SKILL_GROUPS = [
  {
    icon: Shield,
    title: 'Пентестинг',
    badge: 'расту каждый день',
    items: [
      'osint и сбор информации',
      'nmap — сканирование сетей',
      'owasp top 10',
      'burp suite',
      'kali linux',
    ],
  },
  {
    icon: Code2,
    title: 'Веб-разработка',
    badge: 'основное направление',
    items: [
      'html · css · js',
      'react / next.js',
      'typescript',
      'tailwind css',
      'адаптивная вёрстка',
      'деплой на vercel',
    ],
  },
  {
    icon: Cpu,
    title: 'Система и окружение',
    badge: 'родной дом',
    items: [
      'debian 13 (trixie)',
      'kde plasma 6',
      'bash · git',
      'кастомизация рабочего стола',
      'всё через терминал',
    ],
  },
]

const SKILL_BARS = [
  { label: 'linux / debian', level: 78 },
  { label: 'web-разработка', level: 72 },
  { label: 'osint', level: 55 },
  { label: 'пентестинг', level: 42 },
]

const PROJECTS = [
  {
    id: '01',
    name: 'ружьё курта',
    url: 'https://gun-kurt.vercel.app/',
    host: 'gun-kurt.vercel.app',
    desc: 'Промо-сайт меланхоличного рэп-проекта из Ставрополя: образы глубины и океана, релизы, свежие треки и ссылки на все площадки.',
    tags: ['промо-сайт', 'музыка', 'релизы'],
  },
  {
    id: '02',
    name: 'p1rogen',
    url: 'https://p1rogen.vercel.app/',
    host: 'p1rogen.vercel.app',
    desc: 'Страница артиста p1rogen — «дневник, а не образ». Дискография из 14 релизов и больше 32 тысяч слушателей в Яндекс Музыке.',
    tags: ['промо-сайт', 'дискография', 'стриминг'],
  },
  {
    id: '03',
    name: 'BLOODMILK',
    url: 'https://bloodmilk.vercel.app',
    host: 'bloodmilk.vercel.app',
    desc: 'Официальная страница nu-metal проекта: грязные гитары и давящий бит. Синглы 2025 попали в плейлисты «Метал: открытия» и «Стихии метала».',
    tags: ['промо-сайт', 'nu-metal', 'тёмная эстетика'],
  },
]

const CAPRI_CHAT = [
  { from: 'user', text: 'Capri, ты кто вообще такая?' },
  {
    from: 'capri',
    text: 'Я — Capri. Цифровой напарник из Найт-Сити. Пока в разработке, но характер уже на месте.',
  },
  { from: 'user', text: 'и когда релиз?' },
  { from: 'capri', text: 'компилирую личность… скоро.' },
]

const NAV_LINKS = [
  { href: '#about', label: 'о мне' },
  { href: '#skills', label: 'навыки' },
  { href: '#projects', label: 'проекты' },
  { href: '#capri', label: 'capri' },
  { href: '#contact', label: 'контакты' },
]

/* ── helpers ──────────────────────────────────────────── */

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeader({ cmd, title, sub }: { cmd: string; title: string; sub?: string }) {
  return (
    <FadeUp className="mb-10 sm:mb-14">
      <p className="font-mono text-sm text-blood">
        {'>'} {cmd}
      </p>
      <h2 className="mt-2 font-mono text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      {sub ? <p className="mt-3 max-w-xl text-sm text-white/55 sm:text-base">{sub}</p> : null}
    </FadeUp>
  )
}

function TerminalWindow({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-white/10 bg-[#0a0a0c]/90 ${className ?? ''}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-blood" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-2 font-mono text-xs text-white/40">{title}</span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  )
}

function useTypewriter(phrases: string[], typeMs = 65, holdMs = 1700, deleteMs = 28) {
  const [text, setText] = useState('')
  const [idx, setIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[idx % phrases.length]
    let t: ReturnType<typeof setTimeout>

    if (!deleting) {
      if (text.length < current.length) {
        t = setTimeout(() => setText(current.slice(0, text.length + 1)), typeMs)
      } else {
        t = setTimeout(() => setDeleting(true), holdMs)
      }
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteMs)
      } else {
        t = setTimeout(() => {
          setDeleting(false)
          setIdx((i) => (i + 1) % phrases.length)
        }, typeMs)
      }
    }
    return () => clearTimeout(t)
  }, [text, deleting, idx, phrases, typeMs, holdMs, deleteMs])

  return text
}

/* ── background fx ────────────────────────────────────── */

function BackgroundFX() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <div className="bg-grid absolute inset-0" />
        <div
          className="absolute inset-x-0 top-0 h-[480px]"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 50% -12%, rgba(255,30,45,0.16), transparent 70%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[360px]"
          style={{
            background:
              'radial-gradient(ellipse 55% 60% at 50% 115%, rgba(255,30,45,0.08), transparent 70%)',
          }}
        />
      </div>
      <div className="scanlines" aria-hidden="true" />
    </>
  )
}

/* ── navbar ───────────────────────────────────────────── */

function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#hero"
          className="font-mono text-sm text-white/90 transition-colors hover:text-white"
          aria-label="starnight — наверх"
        >
          ~/<span className="text-blood">starnight</span>
          <span className="text-blood">$</span>
        </a>

        <nav className="hidden items-center gap-6 font-mono text-xs text-white/60 md:flex" aria-label="Основная навигация">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-blood">
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 items-center rounded-md border border-blood/50 px-3.5 font-mono text-xs text-blood transition-colors hover:bg-blood hover:text-white"
        >
          связаться
        </a>
      </div>
    </header>
  )
}

/* ── hero ─────────────────────────────────────────────── */

function Hero() {
  const typed = useTypewriter(TYPE_PHRASES)

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
    >
      <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-28 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="font-mono text-xs text-white/45 sm:text-sm">
            <span className="text-blood">~/portfolio $</span> init starnight --mode=dark
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="glitch mt-5 font-mono text-[13vw] font-bold leading-none tracking-tight text-white text-glow sm:text-7xl lg:text-8xl"
          data-text="STARNIGHT"
        >
          STARNIGHT
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
          className="mt-6 font-mono text-base text-white/85 sm:text-xl"
        >
          <span className="text-blood">&gt;_</span> {typed}
          <span className="caret" />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
          className="mt-5 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base"
        >
          Ломаю, чтобы понять, как это работает. Собираю сайты, которые не стыдно
          показать. Живу в Debian 13 с KDE Plasma 6 — и тестирую на прочность
          всё, до чего дотягиваюсь.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-blood px-6 font-mono text-sm font-semibold text-white transition-all hover:bg-blood-deep hover:shadow-[0_0_28px_-6px_rgba(255,30,45,0.6)]"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            написать в telegram
          </a>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-md border border-white/15 bg-white/[0.03] px-6 font-mono text-sm text-white/85 transition-colors hover:border-blood/60 hover:text-white"
          >
            <TikTokIcon className="h-4 w-4" />
            tiktok
          </a>
          <a
            href="#projects"
            className="inline-flex h-11 items-center gap-2 rounded-md px-4 font-mono text-sm text-white/60 transition-colors hover:text-blood"
          >
            мои проекты ↓
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-14 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {[
            { value: '03', label: 'промо-сайта на vercel' },
            { value: '100%', label: 'debian 13 · kde plasma 6' },
            { value: 'v0.1', label: 'capri ai — в разработке' },
          ].map((s) => (
            <div key={s.label} className="border-l-2 border-blood/70 pl-4">
              <div className="font-mono text-2xl font-bold text-white">{s.value}</div>
              <div className="mt-1 font-mono text-[11px] leading-snug text-white/45">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/35 transition-colors hover:text-blood"
        aria-label="Прокрутить вниз"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  )
}

/* ── ticker ───────────────────────────────────────────── */

function Ticker() {
  const items = [...TICKER, ...TICKER]
  return (
    <div className="overflow-hidden border-y border-white/10 bg-white/[0.02] py-3.5" aria-hidden="true">
      <div className="animate-marquee flex w-max items-center gap-6 whitespace-nowrap font-mono text-xs text-white/45">
        {items.map((t, i) => (
          <span key={`${t}-${i}`} className="flex items-center gap-6">
            <span className="uppercase tracking-wider">{t}</span>
            <span className="text-blood">{'//'}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── about ────────────────────────────────────────────── */

function About() {
  return (
    <section id="about" className="scroll-mt-20 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader cmd="whoami" title="Обо мне" />

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <FadeUp>
            <div className="space-y-5 text-sm leading-relaxed text-white/70 sm:text-base">
              <p>
                Я — <span className="font-mono font-semibold text-white">starnight</span>.
                Начинающий пентестер: учусь находить уязвимости раньше, чем это сделают
                другие. OSINT, сканирование сетей, веб-уязвимости — прохожу этот путь
                шаг за шагом, строго в рамках этики и закона.
              </p>
              <p>
                Вторая сторона — веб-разработка. Делаю сайты под ключ: от промо-страниц
                музыкальных проектов до личных портфолио. Люблю тёмные темы, чёткую
                типографику и моноширинные шрифты.
              </p>
              <p>
                Рабочее место — <span className="text-blood">Debian 13</span> с{' '}
                <span className="text-blood">KDE Plasma 6</span>. Терминал, кастомизация,
                полный контроль над системой: так живу, так и работаю.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-2 font-mono text-xs">
              {['этичный пентест', 'веб-разработка', 'linux', 'open source'].map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-white/60"
                >
                  {t}
                </span>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <TerminalWindow title="starnight@debian: ~">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <pre
                  className="select-none font-mono text-[9px] leading-[1.15] text-blood sm:text-[11px]"
                  aria-hidden="true"
                >
                  {DEBIAN_ART}
                </pre>
                <div className="min-w-0 flex-1 font-mono text-xs sm:text-sm">
                  <div className="text-white font-semibold">starnight@debian</div>
                  <div className="text-white/30">─────────────────────────</div>
                  <div className="mt-2 space-y-1">
                    {NEOFETCH_LINES.map(([k, v]) => (
                      <div key={k} className="flex gap-2">
                        <span className="shrink-0 text-blood">{k}:</span>
                        <span className="text-white/75">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TerminalWindow>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

/* ── skills ───────────────────────────────────────────── */

function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          cmd="ls skills/"
          title="Навыки"
          sub="То, чем пользуюсь каждый день — на работе, в учёбе и в проектах."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {SKILL_GROUPS.map((g, i) => (
            <FadeUp key={g.title} delay={i * 0.1}>
              <div className="card-glow group h-full rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md border border-blood/30 bg-blood/10 text-blood">
                    <g.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-blood/80">
                    {g.badge}
                  </span>
                </div>
                <h3 className="mt-5 font-mono text-lg font-bold text-white">{g.title}</h3>
                <ul className="mt-4 space-y-2 font-mono text-xs text-white/60 sm:text-sm">
                  {g.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="shrink-0 text-blood">$</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.15} className="mt-6">
          <TerminalWindow title="skill_check.sh — bash">
            <div className="space-y-4">
              {SKILL_BARS.map((s) => (
                <div key={s.label}>
                  <div className="mb-1.5 flex items-baseline justify-between font-mono text-xs">
                    <span className="text-white/75">{s.label}</span>
                    <span className="text-blood">{s.level}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-blood"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
              <p className="pt-1 font-mono text-[11px] text-white/35">
                * проценты — самооценка. честная. расту каждый день.
              </p>
            </div>
          </TerminalWindow>
        </FadeUp>
      </div>
    </section>
  )
}

/* ── projects ─────────────────────────────────────────── */

function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          cmd="ls projects/"
          title="Проекты"
          sub="Промо-сайты, которые я собрал и поддерживаю. Каждый — живой, открывается в новой вкладке."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.1}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-glow group relative flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.02] p-6"
                aria-label={`Открыть сайт ${p.name}`}
              >
                <span className="absolute -left-px -top-px h-7 w-7 rounded-tl-xl border-l-2 border-t-2 border-blood opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="absolute -bottom-px -right-px h-7 w-7 rounded-br-xl border-b-2 border-r-2 border-blood opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm text-blood">/{p.id}</span>
                  <ArrowUpRight
                    className="h-5 w-5 text-white/30 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blood"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-4 font-mono text-xl font-bold text-white transition-colors group-hover:text-blood">
                  {p.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">{p.desc}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/45"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p className="mt-4 border-t border-white/10 pt-3 font-mono text-xs text-white/40 transition-colors group-hover:text-white/60">
                  {p.host}
                </p>
              </a>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.2} className="mt-6">
          <div className="card-glow relative flex flex-col gap-5 overflow-hidden rounded-xl border border-blood/30 bg-gradient-to-r from-blood/15 via-blood/5 to-transparent p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="font-mono text-xs text-blood">$ ./make_your_site.sh</p>
              <h3 className="mt-2 font-mono text-xl font-bold text-white sm:text-2xl">
                Нужен такой же сайт?
              </h3>
              <p className="mt-2 max-w-lg text-sm text-white/60">
                Промо, лендинг или портфолио под ключ — в твоём стиле, с твоим характером.
              </p>
            </div>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-md bg-blood px-6 font-mono text-sm font-semibold text-white transition-colors hover:bg-blood-deep sm:self-auto"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              обсудить в telegram
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ── capri ────────────────────────────────────────────── */

function Capri() {
  return (
    <section id="capri" className="scroll-mt-20 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader cmd="systemctl status capri" title="Capri // ИИ-помощник" />

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <FadeUp>
            <div className="inline-flex items-center gap-2.5 rounded-md border border-blood/40 bg-blood/10 px-3.5 py-2 font-mono text-xs text-blood">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blood opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blood" />
              </span>
              в разработке · active (running)
            </div>

            <h3 className="mt-6 font-mono text-4xl font-bold text-white sm:text-5xl">
              CAPRI<span className="text-blood text-glow">.</span>
            </h3>

            <p className="mt-5 text-sm leading-relaxed text-white/70 sm:text-base">
              Мой главный проект — ИИ-помощник Capri, вдохновлённый аниме{' '}
              <span className="text-white">Cyberpunk: Edgerunners</span>. Дерзкая,
              умная, с характером настоящего жителя Найт-Сити. Это не сухой чат-бот —
              это цифровой напарник.
            </p>

            <ul className="mt-8 space-y-5">
              {[
                {
                  icon: Bot,
                  title: 'Свой характер',
                  text: 'Стиль общения и личность, а не безликий справочник.',
                },
                {
                  icon: Sparkles,
                  title: 'Вайб Эджраннеров',
                  text: 'Эстетика Найт-Сити во всём: от ответов до интерфейса.',
                },
                {
                  icon: Terminal,
                  title: 'Живая разработка',
                  text: 'Проект развивается постоянно — новые фичи почти каждый день.',
                },
              ].map((f) => (
                <li key={f.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-blood/30 bg-blood/10 text-blood">
                    <f.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-semibold text-white">{f.title}</p>
                    <p className="mt-1 text-sm text-white/55">{f.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-8 font-mono text-xs text-white/40">
              <span className="text-blood">$</span> systemctl status capri →{' '}
              <span className="flicker text-blood">active (running)</span> · v0.1 ·
              development
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <TerminalWindow title="capri@night-city: ~/ai">
              <div className="space-y-4">
                {CAPRI_CHAT.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] rounded-lg border p-3.5 text-sm leading-relaxed ${
                      m.from === 'user'
                        ? 'ml-auto border-white/10 bg-white/[0.04] text-white/80'
                        : 'border-blood/40 bg-blood/10 text-white/90'
                    }`}
                  >
                    <p
                      className={`mb-1 font-mono text-[10px] uppercase tracking-wider ${
                        m.from === 'user' ? 'text-white/35' : 'text-blood'
                      }`}
                    >
                      {m.from === 'user' ? 'you' : 'capri'}
                    </p>
                    {m.text}
                  </div>
                ))}

                <div className="flex items-center gap-2 pt-1 font-mono text-xs text-white/35">
                  <span className="text-blood">▮</span> компиляция личности…{' '}
                  <span className="caret" />
                </div>
              </div>
            </TerminalWindow>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

/* ── contact ──────────────────────────────────────────── */

function Contact() {
  const cards = [
    {
      icon: Send,
      title: 'Telegram',
      handle: '@starnighted',
      desc: 'Прямая связь со мной — пиши, отвечаю быстро.',
      href: TELEGRAM_URL,
    },
    {
      icon: TikTokIcon,
      title: 'TikTok',
      handle: '@starnight117',
      desc: 'Контент, закулисье проектов и вся жизнь в кадре.',
      href: TIKTOK_URL,
    },
  ]

  return (
    <section id="contact" className="scroll-mt-20 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          cmd="ping starnight"
          title="Контакты"
          sub="Напиши напрямую, подпишись на канал или посмотри контент — выбирай любой."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {cards.map((c, i) => (
            <FadeUp key={c.title} delay={i * 0.1}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-glow group relative block rounded-xl border border-white/10 bg-white/[0.02] p-8"
                aria-label={`${c.title}: ${c.handle}`}
              >
                <span className="absolute -left-px -top-px h-7 w-7 rounded-tl-xl border-l-2 border-t-2 border-blood opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="absolute -bottom-px -right-px h-7 w-7 rounded-br-xl border-b-2 border-r-2 border-blood opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-md border border-blood/30 bg-blood/10 text-blood">
                    <c.icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <ArrowUpRight
                    className="h-5 w-5 text-white/30 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blood"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-6 font-mono text-2xl font-bold text-white transition-colors group-hover:text-blood">
                  {c.title}
                </h3>
                <p className="mt-1 font-mono text-sm text-white/55">{c.handle}</p>
                <p className="mt-3 text-sm text-white/50">{c.desc}</p>
              </a>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.2} className="mt-5">
          <a
            href={TELEGRAM_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="card-glow group relative flex flex-col gap-5 overflow-hidden rounded-xl border border-blood/30 bg-gradient-to-r from-blood/10 via-blood/5 to-transparent p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-8"
            aria-label="Telegram-канал: @starnight_official"
          >
            <span className="absolute -left-px -top-px h-7 w-7 rounded-tl-xl border-l-2 border-t-2 border-blood opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="absolute -bottom-px -right-px h-7 w-7 rounded-br-xl border-b-2 border-r-2 border-blood opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-blood/30 bg-blood/10 text-blood">
              <Megaphone className="h-7 w-7" aria-hidden="true" />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-mono text-xl font-bold text-white transition-colors group-hover:text-blood sm:text-2xl">
                Telegram-канал
              </h3>
              <p className="mt-1 font-mono text-sm text-white/55">@starnight_official</p>
              <p className="mt-2 text-sm text-white/50">
                Туда публикую свои проекты, апдейты и всякое интересное — подпишись,
                чтобы не пропустить.
              </p>
            </div>

            <ArrowUpRight
              className="h-5 w-5 shrink-0 text-white/30 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blood"
              aria-hidden="true"
            />
          </a>
        </FadeUp>

        <FadeUp delay={0.25} className="mt-10 text-center">
          <p className="font-mono text-xs text-white/35">
            <span className="text-blood">&gt;</span> latency: низкая · доступность: высокая
            · отвечаю быстро
          </p>
        </FadeUp>
      </div>
    </section>
  )
}

/* ── footer ───────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 font-mono text-[11px] text-white/40 sm:flex-row sm:px-6">
        <span>© {new Date().getFullYear()} starnight // all systems operational</span>
        <span>
          made on <span className="text-blood">Debian 13</span> ·{' '}
          <span className="text-blood">KDE Plasma 6</span>
        </span>
      </div>
    </footer>
  )
}

/* ── page ─────────────────────────────────────────────── */

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip">
      <BackgroundFX />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Ticker />
        <About />
        <Skills />
        <Projects />
        <Capri />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
