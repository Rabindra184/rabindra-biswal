import { motion, useInView, useAnimation } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'
import { isInViewport } from '@/utils/scrollAnimation'

interface AboutText {
  intro: string
  experience: string
}

const mobileText: AboutText = {
  intro:
    "Hello! I'm Rabindra Biswal, a Senior QA Automation Engineer based in Bangalore. I build reliable test automation and integrate quality checks into CI/CD.",
  experience:
    'I have 12+ years of experience in test automation, API testing, and quality engineering across healthcare technology, telecommunications, and e-commerce. I specialize in Selenium, Appium, Playwright, and REST API testing.',
}

const desktopText: AboutText = {
  intro:
    "Hello! I'm Rabindra Biswal, a Senior QA Automation Engineer with 12+ years of experience in test automation, CI/CD integration, and quality engineering. I focus on building scalable, maintainable automation frameworks and enabling fast, reliable releases.",
  experience:
    'My core strengths include Selenium WebDriver, Playwright, Appium, Selenium Grid, REST API testing, and performance testing. I build frameworks using Java, Kotlin, and Python, and integrate automation into pipelines with Jenkins, GitHub Actions, and Azure DevOps. I also work with Dockerized test execution and reporting (Allure, ReportPortal) and mentor teams on modern testing practices.',
}

// Skill definitions with icons from Simple Icons CDN
interface Skill {
  name: string
  icon: string
}

const technologiesLine1: Skill[] = [
  { name: 'Selenium', icon: 'https://cdn.simpleicons.org/selenium/white' },
  { name: 'Playwright', icon: 'https://cdn.simpleicons.org/playwright/white' },
  { name: 'Appium', icon: 'https://cdn.simpleicons.org/appium/white' },
  { name: 'Java', icon: 'https://cdn.simpleicons.org/openjdk/white' },
  { name: 'Kotlin', icon: 'https://cdn.simpleicons.org/kotlin/white' },
  { name: 'Python', icon: 'https://cdn.simpleicons.org/python/white' },
  { name: 'Postman', icon: 'https://cdn.simpleicons.org/postman/white' },
  { name: 'JMeter', icon: 'https://cdn.simpleicons.org/apachejmeter/white' },
  { name: 'k6', icon: 'https://cdn.simpleicons.org/k6/white' },
  { name: 'Jenkins', icon: 'https://cdn.simpleicons.org/jenkins/white' },
  {
    name: 'GitHub Actions',
    icon: 'https://cdn.simpleicons.org/githubactions/white',
  },
  {
    name: 'Azure DevOps',
    icon: 'https://cdn.simpleicons.org/azuredevops/white',
  },
  { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/white' },
  { name: 'Kubernetes', icon: 'https://cdn.simpleicons.org/kubernetes/white' },
  { name: 'Jira', icon: 'https://cdn.simpleicons.org/jira/white' },
  { name: 'Slack', icon: 'https://cdn.simpleicons.org/slack/white' },
  { name: 'Gradle', icon: 'https://cdn.simpleicons.org/gradle/white' },
  { name: 'Maven', icon: 'https://cdn.simpleicons.org/apachemaven/white' },
]

const technologiesLine2: Skill[] = [
  { name: 'Cucumber', icon: 'https://cdn.simpleicons.org/cucumber/white' },
  { name: 'JUnit 5', icon: 'https://cdn.simpleicons.org/junit5/white' },
  { name: 'TestNG', icon: 'https://cdn.simpleicons.org/testinglibrary/white' },
  { name: 'PyTest', icon: 'https://cdn.simpleicons.org/pytest/white' },
  { name: 'Allure', icon: 'https://cdn.simpleicons.org/qase/white' },
  { name: 'Git', icon: 'https://cdn.simpleicons.org/git/white' },
  { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/white' },
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/white' },
  { name: 'Linux', icon: 'https://cdn.simpleicons.org/linux/white' },
  { name: 'SQLite', icon: 'https://cdn.simpleicons.org/sqlite/white' },
]

const variants = {
  visible: { opacity: 1, y: -50 },
  hidden: { opacity: 0, y: 0 },
}

function About() {
  const ref = useRef<HTMLDivElement>(null)
  const techSectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref)
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const controls = useAnimation()

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth <= 768)
  }, [])

  useEffect(() => {
    // Initial check
    checkMobile()

    // Add resize listener
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [checkMobile])

  useEffect(() => {
    // Check visibility for scroll animations
    const handleScroll = () => {
      const section = document.querySelector('.about')
      if (section && isInViewport(section) && !isVisible) {
        setIsVisible(true)
        controls.start({ opacity: 1, y: 0 })
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Initial checks
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isVisible, controls])

  // Create a larger array for truly seamless scrolling
  const generateSkillList = (technologies: Skill[]) => {
    // Create enough duplicates to ensure continuous scrolling
    // Triple the items to guarantee smooth looping
    return [...technologies, ...technologies, ...technologies]
  }

  const skillsRow1 = generateSkillList(technologiesLine1)
  const skillsRow2 = generateSkillList(technologiesLine2)

  return (
    <motion.div
      className={`about fade-in-section ${
        isVisible ? 'is-visible' : ''
      } section-transition`}
      id='about'
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className='title'>
        <h2>About Me</h2>
      </div>
      <div className='about-grid'>
        <div className='about-grid-info'>
          <p className='about-grid-info-text text-justify text-base md:text-lg leading-relaxed'>
            {isMobile ? mobileText.intro : desktopText.intro}
          </p>
          <p className='about-grid-info-text text-justify text-base md:text-lg leading-relaxed indent-4'>
            {isMobile ? mobileText.experience : desktopText.experience}
          </p>

          <div className='tech-section' ref={techSectionRef}>
            <div className='tech-carousel'>
              <div className='tech-container right-to-left'>
                {skillsRow1.map((skill, index) => (
                  <motion.div
                    key={`line1-${skill.name}-${index}`}
                    className='tech-badge'
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        delay: Math.min(index * 0.01, 0.2),
                      },
                    }}
                  >
                    <div className='tech-icon'>
                      <Image
                        src={skill.icon}
                        alt={`${skill.name} icon`}
                        width={20}
                        height={20}
                        loading='lazy'
                      />
                    </div>
                    {skill.name}
                  </motion.div>
                ))}
              </div>

              <div className='tech-container left-to-right'>
                {skillsRow2.map((skill, index) => (
                  <motion.div
                    key={`line2-${skill.name}-${index}`}
                    className='tech-badge'
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        delay: Math.min(index * 0.01, 0.2),
                      },
                    }}
                  >
                    <div className='tech-icon'>
                      <Image
                        src={skill.icon}
                        alt={`${skill.name} icon`}
                        width={20}
                        height={20}
                        loading='lazy'
                      />
                    </div>
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='about-grid-photo'>
          <div className='overlay'></div>
          <div className='overlay-border'></div>
          <div className='about-grid-photo-container'>
            <Image
              src={`${
                process.env.NODE_ENV === 'production' ? '/rabindra-biswal' : ''
              }/etc/image.jpeg`}
              alt='Rabindra Biswal - Senior QA Automation Engineer'
              fill
              sizes='(max-width: 768px) 100vw, 50vw'
              priority
              style={{ objectFit: 'cover' }}
              className='rounded-lg'
              aria-label='Profile picture of Rabindra Biswal'
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default About
