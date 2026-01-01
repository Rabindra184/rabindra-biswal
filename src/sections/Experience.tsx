import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'

function Experience() {
  const [selected, setSelected] = useState(0)
  const [mounted, setMounted] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Scroll timeline to selected item on mobile
    if (timelineRef.current && window.innerWidth <= 768) {
      const container = timelineRef.current
      const selectedItem = container.querySelector(`.timeline-item-${selected}`)
      if (selectedItem) {
        container.scrollTo({
          left: (selectedItem as HTMLElement).offsetLeft - 20,
          behavior: 'smooth',
        })
      }
    }
  }, [selected, mounted])

  const experiences = [
    {
      name: 'Stryker',
      role: 'Senior Staff Engineer - Test Automation',
      url: 'https://www.stryker.com/',
      start: 'Aug 2022',
      end: 'Present',
      color: '#bb86fc', // Primary color
      icon: 'S',
      shortDescription: [
        'Built multi-platform automation framework using Kotlin, Selenium, Appium, and Playwright for web, mobile, and desktop testing.',
        'Cut regression testing time by 50% through automated test coverage across product lines.',
        'Set up Dockerized test execution with ReportPortal and Slack integration for real-time failure alerts.',
        'Automated iOS and Android testing using Appium, cutting mobile defects by 40%.',
        'Tested speech-to-text and translation features using open-source AI models and custom validation scripts.',
        'Automated Qt-based medical device interfaces using Selenium and internal APIs.',
        'Built internal tools for SSH access, database validation, and CAN bus message testing.',
        'Mentored 6 QA engineers on automation best practices and modern testing approaches.',
        'Partnered with product owners and developers in Agile ceremonies to define test strategies.',
      ],
    },
    {
      name: 'Cigniti Technologies',
      role: 'Test Lead - Quality Engineering',
      url: 'https://www.cigniti.com/',
      start: 'Dec 2021',
      end: 'Aug 2022',
      color: '#03dac6', // Secondary color
      icon: 'C',
      shortDescription: [
        'Drove automation strategy for a medical technology client using Selenium, Python, and Behave.',
        'Cut regression cycles from 5 days to 2 days with 100% pass rate.',
        'Integrated automation into Jenkins CI/CD pipelines with quality gates.',
        'Led a mobile automation team of 3 engineers testing across 12+ device configurations.',
        'Deployed centralized Allure reporting using Docker for cross-environment test results.',
        'Introduced code review processes for automation framework maintenance.',
      ],
    },
    {
      name: 'CA Technologies / HCL Technologies',
      role: 'Senior QA Engineer (Consultant)',
      url: 'https://www.broadcom.com/products/software/agile-development/clarity-ppm',
      start: 'Sep 2017',
      end: 'Dec 2021',
      color: '#cf6679', // Error color
      icon: 'C',
      shortDescription: [
        'Built automation framework using Selenium, Cucumber, and REST Assured for CA PPM software.',
        'Delivered 75% automation coverage across functional and integration test suites.',
        'Tested integrations with SAP, JIRA, Salesforce, Informatica, and Pega systems.',
        'Ran performance testing using LoadRunner, improving response times by 30%.',
        'Automated API testing with REST Assured and Postman, cutting API defects by 65%.',
        'Added continuous API monitoring to detect production issues early.',
      ],
    },
    {
      name: 'Accenture',
      role: 'QA Automation Engineer',
      url: 'https://www.accenture.com/',
      start: 'Dec 2016',
      end: 'Sep 2017',
      color: '#bb86fc', // Primary color
      icon: 'A',
      shortDescription: [
        'Built a data-driven automation framework using Selenium, TestNG, and Maven.',
        'Automated REST API testing using REST Assured with Cucumber BDD for 20+ endpoints.',
        'Ran cross-browser testing using Selenium Grid.',
      ],
    },
    {
      name: 'Accenture',
      role: 'QA Analyst - Test Automation',
      url: 'https://www.accenture.com/',
      start: 'Aug 2015',
      end: 'Dec 2016',
      color: '#03dac6', // Secondary color
      icon: 'A',
      shortDescription: [
        'Automated data migration testing for an ERP upgrade, validating 2M+ records across 150+ tables.',
        'Built an Excel macro tool for data validation, cutting manual effort by 80%.',
        'Automated user registration and management portals using Selenium.',
      ],
    },
    {
      name: 'Tata Consultancy Services',
      role: 'QA Analyst',
      url: 'https://www.tcs.com/',
      start: 'Mar 2013',
      end: 'Aug 2015',
      color: '#cf6679', // Error color
      icon: 'T',
      shortDescription: [
        'Ran functional and regression testing for CA PPM implementations.',
        'Wrote automation scripts using Selenium WebDriver and TestNG.',
        'Tracked defect lifecycle in HP Quality Center with 99% closure rate.',
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      className='experience'
      id='experience'
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      variants={{
        visible: { opacity: 1, y: -50 },
        hidden: { opacity: 0, y: 0 },
      }}
    >
      <div className='title'>
        <h2>Where I&apos;ve Worked</h2>
      </div>

      <div className='experience-content-container'>
        {/* Tabbed Navigation */}
        <div className='experience-tabs' ref={timelineRef}>
          {experiences.map((experience, index) => (
            <button
              key={`tab-${experience.name}-${experience.role}-${experience.start}`}
              className={`experience-tab ${
                index === selected ? 'experience-tab-selected' : ''
              }`}
              onClick={() => setSelected(index)}
              style={{
                borderColor:
                  index === selected ? experience.color : 'transparent',
              }}
            >
              {experience.name}
            </button>
          ))}
        </div>

        {/* Experience Card */}
        <motion.div
          className='experience-card md-card'
          key={selected}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className='experience-header'
            variants={containerVariants}
            initial='hidden'
            animate='visible'
          >
            <motion.div
              className='experience-title-container'
              variants={itemVariants}
            >
              <div
                className='experience-title-badge'
                style={{ backgroundColor: experiences[selected].color }}
              >
                {experiences[selected].icon}
              </div>
              <div>
                <h3 className='experience-title'>
                  {experiences[selected].role}
                  <span className='experience-company'>
                    &nbsp;@&nbsp;
                    <Link
                      href={experiences[selected].url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='link'
                    >
                      {experiences[selected].name}
                    </Link>
                  </span>
                </h3>
                <p className='experience-date'>
                  {experiences[selected].start} - {experiences[selected].end}
                </p>
              </div>
            </motion.div>

            <motion.div
              className='experience-description'
              variants={containerVariants}
            >
              {experiences[selected].shortDescription.map(
                (description, index) => (
                  <motion.div
                    key={`${experiences[selected].name}-${experiences[selected].role}-${description}`}
                    className='experience-item'
                    variants={itemVariants}
                    custom={index}
                    whileHover={{ x: 5 }}
                  >
                    <div
                      className='experience-item-bullet'
                      style={{ backgroundColor: experiences[selected].color }}
                    ></div>
                    <p>{description}</p>
                  </motion.div>
                )
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Experience
