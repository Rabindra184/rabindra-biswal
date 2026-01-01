import '@/scss/globals.css'
import '@/scss/index.scss'
import { AppProvider } from '@/utils/ThemeContext'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { Fira_Code, Raleway } from 'next/font/google'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const raleway = Raleway({ subsets: ['latin'] })
const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

// Use 'any' type for the dynamic import to avoid type mismatches
const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
  ssr: false,
})

const App = ({ Component, pageProps, router }: AppProps) => {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [mounted, setMounted] = useState<boolean>(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    setMounted(true)

    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    const updateReducedMotion = () => {
      setPrefersReducedMotion(reducedMotionQuery.matches)
    }

    updateReducedMotion()

    if (typeof reducedMotionQuery.addEventListener === 'function') {
      reducedMotionQuery.addEventListener('change', updateReducedMotion)
    } else {
      // Safari fallback
      reducedMotionQuery.addListener(updateReducedMotion)
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Initial check
    checkMobile()

    // Add resize listener
    window.addEventListener('resize', checkMobile)

    // Ensure skip link to #content moves focus to main content
    let focusRetryTimer: number | null = null

    const focusContentFromHash = () => {
      if (window.location.hash !== '#content') return

      if (focusRetryTimer) {
        window.clearInterval(focusRetryTimer)
        focusRetryTimer = null
      }

      const tryFocus = () => {
        const content = document.getElementById('content')
        if (content) {
          // Avoid focusing while content is not laid out yet (e.g. loader keeps it display:none)
          if (content.getClientRects().length === 0) return false

          content.focus()
          return document.activeElement === content
        }
        return false
      }

      if (tryFocus()) return

      let attempts = 0
      focusRetryTimer = window.setInterval(() => {
        attempts += 1
        if (tryFocus() || attempts >= 30) {
          if (focusRetryTimer) window.clearInterval(focusRetryTimer)
          focusRetryTimer = null
        }
      }, 100)
    }

    focusContentFromHash()
    window.addEventListener('hashchange', focusContentFromHash)

    const skipLink = document.querySelector<HTMLAnchorElement>(
      'a.skip-link[href="#content"]'
    )

    const onSkipLinkClick = (e: MouseEvent) => {
      e.preventDefault()

      if (window.location.hash !== '#content') {
        window.location.hash = '#content'
      }

      focusContentFromHash()
    }

    skipLink?.addEventListener('click', onSkipLinkClick)

    // Register service worker
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(
          (registration) => {
            console.log(
              'ServiceWorker registration successful with scope: ',
              registration.scope
            )
          },
          (err) => {
            console.log('ServiceWorker registration failed: ', err)
          }
        )
      })
    }

    // Clean up
    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('hashchange', focusContentFromHash)

      skipLink?.removeEventListener('click', onSkipLinkClick)

      if (focusRetryTimer) window.clearInterval(focusRetryTimer)

      if (typeof reducedMotionQuery.removeEventListener === 'function') {
        reducedMotionQuery.removeEventListener('change', updateReducedMotion)
      } else {
        // Safari fallback
        reducedMotionQuery.removeListener(updateReducedMotion)
      }
    }
  }, [])

  // Fix for hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        <link rel='icon' href='/favicon.svg' />
        <link rel='apple-touch-icon' href='/favicon.svg' />
      </Head>
      <style>{`
        :root {
          --raleway: ${raleway.style.fontFamily};
          --fira-code: ${firaCode.style.fontFamily};
        }

        html {
          scroll-padding-top: 80px; /* Ensures anchor links don't get hidden behind fixed header */
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        body {
          animation: ${prefersReducedMotion ? 'none' : 'fadeIn 0.8s ease-in'};
        }
      `}</style>

      <AppProvider>
        <MotionConfig reducedMotion='user'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={router.route}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>

          {!isMobile && mounted && !prefersReducedMotion && (
            <AnimatedCursor
              innerSize={8}
              outerSize={35}
              color='187, 134, 252'
              outerAlpha={0.2}
              innerScale={1}
              outerScale={1.7}
              trailingSpeed={5}
              showSystemCursor={false}
              outerStyle={{
                mixBlendMode: 'difference',
              }}
              clickables={[
                'a',
                'input[type="text"]',
                'input[type="email"]',
                'input[type="number"]',
                'input[type="submit"]',
                'input[type="image"]',
                'label[for]',
                'select',
                'textarea',
                'button',
                '.link',
                '.exp-slider-item',
                '.hover-this',
                '.timeline-item',
                '.experience-item',
                '.md-btn',
              ]}
            />
          )}
        </MotionConfig>
      </AppProvider>
    </>
  )
}

export default App
