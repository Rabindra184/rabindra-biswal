import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Suspense, useEffect, useState } from 'react'
import Loader from '../components/Loader'
import { motion } from 'framer-motion'

// Components that are needed immediately
import Hero from '../sections/Hero'
import Navbar from '../sections/Navbar'

// Dynamically import components that can be loaded later
const Email = dynamic(() => import('../components/Email'), {
  ssr: false,
})

const SocialIcons = dynamic(() => import('../components/SocialIcons'), {
  ssr: false,
})

const FloatingButton = dynamic(() => import('../components/FloatingButton'), {
  ssr: false,
})

const About = dynamic(() => import('../sections/About'), {
  loading: () => <div className='section-loader'>Loading...</div>,
})

const Experience = dynamic(() => import('../sections/Experience'), {
  loading: () => <div className='section-loader'>Loading...</div>,
})

const Contact = dynamic(() => import('../sections/Contact'), {
  loading: () => <div className='section-loader'>Loading...</div>,
})

const Footer = dynamic(() => import('../sections/Footer'), {
  ssr: false,
})

function Index() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const handleLoaderLoaded = () => {
    setIsLoading(false)
    setTimeout(() => setShowContent(true), 800)
  }

  useEffect(() => {
    // Ensure content is shown after a timeout even if loader fails
    const contentTimer = setTimeout(() => {
      setIsLoading(false)
      setShowContent(true)
    }, 3500)

    return () => clearTimeout(contentTimer)
  }, [])

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Initial check
    checkMobile()

    // Add resize listener
    window.addEventListener('resize', checkMobile)

    const links = document.querySelectorAll('nav > .hover-this')

    const animateit = (e: Event) => {
      if (isMobile) return // Skip animation on mobile
    }

    const editCursor = (e: Event) => {
      if (isMobile) return // Skip cursor update on mobile
    }

    const handleMouseDown = () => {
      if (isMobile) return // Skip click animation on mobile
    }

    if (!isMobile) {
      // Only add event listeners on desktop
      links.forEach((link) => link.addEventListener('mousemove', animateit))
      links.forEach((link) => link.addEventListener('mouseleave', animateit))
      globalThis.addEventListener('mousemove', editCursor)
      globalThis.addEventListener('mousedown', handleMouseDown)
    }

    // Add fade-in effect
    const mainContent = document.querySelector('main')
    if (mainContent) {
      mainContent.classList.add('fade-in')
      setTimeout(() => {
        mainContent.classList.add('show')
      }, 100)
    }

    return () => {
      // Clean up event listeners
      window.removeEventListener('resize', checkMobile)
      if (!isMobile) {
        links.forEach((link) =>
          link.removeEventListener('mousemove', animateit)
        )
        links.forEach((link) =>
          link.removeEventListener('mouseleave', animateit)
        )
        globalThis.removeEventListener('mousemove', editCursor)
        globalThis.removeEventListener('mousedown', handleMouseDown)
      }
    }
  }, [isMobile])

  return (
    <div className='app'>
      <Head>
        <title>Rabindra Biswal | Senior QA Automation Engineer</title>
        <meta
          name='description'
          content='Rabindra Biswal - Senior QA Automation Engineer with 12+ years of experience in test automation, CI/CD integration, and quality engineering.'
        />
        <link rel='canonical' href={siteUrl} />

        {/* Open Graph / Facebook */}
        <meta property='og:type' content='website' />
        <meta
          property='og:title'
          content='Rabindra Biswal | Senior QA Automation Engineer'
        />
        <meta
          property='og:description'
          content='Portfolio of Rabindra Biswal — Senior QA Automation Engineer specializing in automation frameworks, Selenium/Appium/Playwright, and CI/CD.'
        />
        <meta property='og:url' content={siteUrl} />
        <meta property='og:image' content={`${siteUrl}/favicon.svg`} />

        {/* Twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:title'
          content='Rabindra Biswal | Senior QA Automation Engineer'
        />
        <meta
          name='twitter:description'
          content='Rabindra Biswal — Senior QA Automation Engineer with 12+ years in test automation and CI/CD.'
        />
        <meta name='twitter:image' content={`${siteUrl}/favicon.svg`} />

        <link rel='shortcut icon' href='/favicon.svg' />

        {/* Structured Data for Rich Search Results */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Rabindra Biswal',
              url: siteUrl,
              jobTitle: 'Senior QA Automation Engineer',
              worksFor: {
                '@type': 'Organization',
                name: 'Stryker',
              },
              sameAs: ['https://linkedin.com/in/rabindra-biswal'],
              knowsAbout: [
                'Test Automation',
                'Selenium WebDriver',
                'Playwright',
                'Appium',
                'REST API Testing',
                'CI/CD',
                'Jenkins',
                'GitHub Actions',
                'Azure DevOps',
                'Docker',
                'Kubernetes',
                'Java',
                'Kotlin',
                'Python',
              ],
            }),
          }}
        />
      </Head>

      {isLoading && (
        <Loader isLoading={isLoading} setIsLoading={handleLoaderLoaded} />
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: showContent ? 1 : 0,
          y: showContent ? 0 : 20,
        }}
        transition={{
          duration: 0.8,
          ease: 'easeOut',
          delay: 0.1,
        }}
        style={{ display: showContent ? 'block' : 'none' }}
      >
        <Navbar />
        <Suspense fallback={<div className='loading-icon'>Loading...</div>}>
          <SocialIcons />
          <Email />
        </Suspense>
        <main id='content' className='fade-in' tabIndex={-1}>
          <Hero />
          <Suspense
            fallback={
              <div className='section-loader'>Loading about section...</div>
            }
          >
            <About />
          </Suspense>
          <Suspense
            fallback={
              <div className='section-loader'>
                Loading experience section...
              </div>
            }
          >
            <Experience />
          </Suspense>
          <Suspense
            fallback={
              <div className='section-loader'>Loading contact section...</div>
            }
          >
            <Contact />
          </Suspense>
        </main>
        <Suspense
          fallback={<div className='footer-loader'>Loading footer...</div>}
        >
          <Footer />
        </Suspense>
        <FloatingButton showAt={400} />
      </motion.div>
    </div>
  )
}

export default Index
