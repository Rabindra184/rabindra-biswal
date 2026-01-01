import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Button from '../components/Button'
import Logo from '../components/Logo'

function Navbar() {
  const [navbarVisible, setNavbarVisible] = useState(false)
  const [responsiveNavVisible, setResponsiveNavVisible] = useState(false)
  const sectionLinks = [
    { name: 'About', link: '/#about' },
    { name: 'Experience', link: '/#experience' },
    {
      name: 'Contact',
      link: '/#contact',
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      window.pageYOffset > 100
        ? setNavbarVisible(true)
        : setNavbarVisible(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll) // Cleanup listener
  }, [])

  useEffect(() => {
    const links = document.querySelectorAll('.nav-items-list-item-link')
    links.forEach((link) => {
      link.addEventListener('click', () => setResponsiveNavVisible(false))
    })
    const nav = document.querySelector('.nav-items')
    nav?.addEventListener('click', (e) => {
      e.stopPropagation()
    })
    const html = document.querySelector('html')
    html?.addEventListener('click', (e) => {
      setResponsiveNavVisible(false)
    })
  }, [])

  useEffect(() => {
    const main = document.querySelector('main')
    if (responsiveNavVisible) {
      main?.classList.add('blur')
    } else {
      main?.classList.remove('blur')
    }
  }, [responsiveNavVisible])

  useEffect(() => {
    if (!responsiveNavVisible) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setResponsiveNavVisible(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [responsiveNavVisible])

  return (
    <nav role='navigation' aria-label='Main navigation'>
      <div className={`wrapper ${navbarVisible ? 'blur-nav' : ''}`}>
        <motion.div
          className='brand'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
        >
          <Link href='/' aria-label='Homepage'>
            <Logo />
          </Link>
        </motion.div>
        <motion.div
          className='nav-responsive-toggle'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
        >
          <button
            type='button'
            aria-label={
              responsiveNavVisible
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={responsiveNavVisible}
            aria-controls='nav-menu'
            onClick={(e) => {
              e.stopPropagation()
              setResponsiveNavVisible((prev) => !prev)
            }}
          >
            {responsiveNavVisible ? <X size={24} /> : <Menu size={24} />}
          </button>
        </motion.div>
        <motion.div
          id='nav-menu'
          className={`${responsiveNavVisible && 'nav-responsive'} nav-items`}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
          aria-hidden={!responsiveNavVisible}
        >
          <ul className='nav-items-list'>
            {sectionLinks.map(({ name, link }, index) => (
              <motion.li
                key={name}
                className='nav-items-list-item'
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                  delay: 0.1 + index * 0.1,
                }}
              >
                <Link
                  href={link}
                  className='nav-items-list-item-link'
                  aria-label={`Navigate to ${name}`}
                >
                  {name}
                </Link>
              </motion.li>
            ))}
          </ul>
          <motion.div
            className='nav-items-button'
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
              delay: 0.6,
            }}
          >
            <Button
              text='Resume'
              link='https://drive.google.com/file/d/1HA6Vn0C3SDtePkzsdbWufcuvt4avc4pU/view?usp=sharing'
              variant='outline'
              size='sm'
              showExternalIcon={true}
              className='resume-btn'
            />
          </motion.div>
        </motion.div>
      </div>
    </nav>
  )
}

export default Navbar
