const REVEAL_SELECTOR = '[data-reveal]'
const REVEAL_DURATION = 900
const REVEAL_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)'

function noop() {
  // 用于浏览器 API 要求回调但无需执行后续操作的场景
}

function prefersReducedMotion(): boolean {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

function revealImmediately() {
  document.documentElement.classList.remove('motion-ready')
  document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((element) => {
    element.style.opacity = '1'
    element.style.transform = 'none'
  })
}

function revealOffset(element: HTMLElement): { x: number, y: number, scale: number } {
  const distance = Number.parseFloat(element.dataset.revealDistance ?? '28') || 28
  const direction = element.dataset.revealFrom ?? 'up'

  if (direction === 'left') {
    return { x: -distance, y: 0, scale: 1 }
  }
  if (direction === 'right') {
    return { x: distance, y: 0, scale: 1 }
  }
  if (direction === 'scale') {
    return { x: 0, y: distance * 0.6, scale: 0.96 }
  }
  return { x: 0, y: distance, scale: 1 }
}

function setupReveals() {
  const cleanups: (() => void)[] = []
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) {
    revealImmediately()
    return noop
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return
        }

        const element = entry.target as HTMLElement
        const delay = Number.parseFloat(element.dataset.revealDelay ?? '0') || 0
        const offset = revealOffset(element)
        const animation = element.animate(
          [
            { opacity: 0, transform: `translate(${offset.x}px, ${offset.y}px) scale(${offset.scale})` },
            { opacity: 1, transform: 'translate(0px, 0px) scale(1)' },
          ],
          { duration: REVEAL_DURATION, delay: delay * 1000, easing: REVEAL_EASING, fill: 'both' },
        )
        element.style.opacity = '1'
        element.style.transform = 'none'
        animation.finished.catch(noop)
        observer.unobserve(element)
      })
    },
    { rootMargin: '0px 0px -14% 0px' },
  )

  document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((element) => {
    const offset = revealOffset(element)
    element.style.opacity = '0'
    element.style.transform = `translate(${offset.x}px, ${offset.y}px) scale(${offset.scale})`
    observer.observe(element)
  })

  cleanups.push(() => observer.disconnect())

  return () => {
    for (const cleanup of cleanups) {
      cleanup()
    }
  }
}

function setupTitleParallax() {
  const heroTitle = document.querySelector<HTMLElement>('[data-parallax="hero-title"]')
  if (!heroTitle) {
    return
  }

  let frame = 0
  const update = () => {
    if (frame) {
      return
    }
    frame = window.requestAnimationFrame(() => {
      frame = 0
      const progress = Math.min(1, Math.max(0, window.scrollY / Math.max(window.innerHeight, 1)))
      heroTitle.style.transform = `translateY(${-progress * 48}px)`
      heroTitle.style.opacity = String(1 - progress * 0.18)
    })
  }

  window.addEventListener('scroll', update, { passive: true })
  update()
  return () => {
    window.removeEventListener('scroll', update)
    window.cancelAnimationFrame(frame)
  }
}

function setupHeaderScroll() {
  const header = document.querySelector<HTMLElement>('.site-header')
  if (!header) {
    return
  }

  const update = () => header.classList.toggle('site-header--scrolled', window.scrollY > 12)
  update()
  window.addEventListener('scroll', update, { passive: true })

  return () => window.removeEventListener('scroll', update)
}

const motionLifecycle = {
  cleanup: noop,
}

export function initMotion() {
  if (typeof window === 'undefined') {
    return
  }

  motionLifecycle.cleanup()

  const run = () => {
    const cleanups = [setupHeaderScroll()]
    if (prefersReducedMotion()) {
      revealImmediately()
      motionLifecycle.cleanup = () => {
        for (const cleanup of cleanups) {
          cleanup?.()
        }
      }
      return
    }

    try {
      document.documentElement.classList.add('motion-ready')
      cleanups.push(setupReveals(), setupTitleParallax())
    } catch {
      revealImmediately()
    }

    motionLifecycle.cleanup = () => {
      for (const cleanup of cleanups) {
        cleanup?.()
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true })
  } else {
    run()
  }
}
