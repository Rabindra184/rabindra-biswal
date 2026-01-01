import { motion, useScroll, useTransform } from 'framer-motion'
import { Award, Code, Star } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import Button3D from '@/components/Button3D'

type Project = {
  image?: string
  video?: string
  projectName: string
  projectLink: string
  projectDescription: string
  projectTech: string[]
  projectExternalLinks: {
    github: string
    externalLink?: string
  }
  featured?: boolean
  timeframe?: string
  accolades?: string
}

function ProjectCard({
  project,
  index,
  hoveredProject,
  setHoveredProject,
  openInNewTab,
  itemVariants,
}: Readonly<{
  project: Project
  index: number
  hoveredProject: string | null
  setHoveredProject: (value: string | null) => void
  openInNewTab: (url?: string) => void
  itemVariants: any
}>) {
  const {
    image = '/projects/default-project.webp',
    video,
    projectDescription,
    projectLink,
    projectExternalLinks,
    projectName,
    projectTech,
    featured,
    accolades,
  } = project

  const hasVideo =
    Boolean(video) &&
    (projectName === 'QueryLens' || projectName === 'KubeWise')
  const isEven = index % 2 === 1
  const canOpenProject = !hasVideo

  const handleOpen = () => openInNewTab(projectLink)

  const media = hasVideo ? (
    <iframe
      src={video}
      title={projectName}
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
      className='project-video'
    ></iframe>
  ) : (
    <Image src={image} fill loading='lazy' alt={projectName} quality={100} />
  )

  const featuredBadge = featured ? (
    <motion.div
      className='featured-badge'
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      <Star size={14} />
      <span>Top Project</span>
    </motion.div>
  ) : null

  const accoladesBlock = accolades ? (
    <div className='project-accolades'>
      <Award size={14} />
      <span>{accolades}</span>
    </div>
  ) : null

  return (
    <motion.div
      className={`project bg-gradient-to-tr from-purple-600/20 via-indigo-500/10 to-pink-500/20 p-[1px] rounded-xl transition-transform transform hover:scale-[1.02] duration-300 hover:shadow-2xl hover:shadow-indigo-500/30 ${
        hoveredProject === projectName ? 'is-hovered' : ''
      } ${isEven ? 'even-project' : 'odd-project'}`}
      variants={itemVariants}
      onMouseEnter={() => setHoveredProject(projectName)}
      onMouseLeave={() => setHoveredProject(null)}
      whileHover={{
        boxShadow: '0 10px 30px -15px rgba(100, 255, 218, 0.2)',
        borderColor: 'rgba(100, 255, 218, 0.3)',
      }}
    >
      <div className='project-inner bg-[#0f0f0f] rounded-[inherit]'>
        {canOpenProject ? (
          <button
            type='button'
            className={`project-image ${hasVideo ? 'has-video' : ''}`}
            onClick={handleOpen}
            aria-label={`Open ${projectName}`}
          >
            <div className='project-image-overlay'></div>
            <div className='project-image-container'>{media}</div>
            {featuredBadge}
          </button>
        ) : (
          <div className={`project-image ${hasVideo ? 'has-video' : ''}`}>
            <div className='project-image-overlay'></div>
            <div className='project-image-container'>{media}</div>
            {featuredBadge}
          </div>
        )}

        <motion.div
          className='project-info'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className='project-meta'>
            <div className='meta-flex'></div>
          </div>
          <h3 className='project-info-title'>
            <motion.span
              className='cursor-pointer'
              onClick={handleOpen}
              whileHover={{ color: 'var(--theme-color)' }}
            >
              {projectName}
            </motion.span>
          </h3>
          <motion.div
            className='project-info-description'
            whileHover={{
              boxShadow: '0 15px 30px -15px rgba(2,12,27,0.8)',
              y: -5,
            }}
            transition={{ duration: 0.3 }}
          >
            <p>{projectDescription}</p>
            {accoladesBlock}
          </motion.div>
          <ul className='project-info-tech-list'>
            {projectTech.map((tech) => (
              <motion.li
                className='project-info-tech-list-item'
                key={tech}
                whileHover={{ y: -2, color: 'var(--theme-color)' }}
                transition={{ duration: 0.2 }}
              >
                {tech}
              </motion.li>
            ))}
          </ul>
          <div className='project-info-links mt-4'>
            <Button3D
              text='View Project'
              link={projectLink}
              color='primary'
              className='mr-3'
            />
            <Button3D
              text='GitHub'
              link={projectExternalLinks.github}
              color='secondary'
              icon={<Code size={16} />}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function Projects() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  const projectsData: Project[] = [
    {
      projectName: 'Projects Coming Soon',
      projectLink: '#',
      projectDescription: 'Project highlights will be added here soon.',
      projectTech: [],
      projectExternalLinks: {
        github: '#',
      },
      featured: false,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      },
    },
  }

  const openInNewTab = (url?: string) => {
    if (!url) return
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      id='work'
      className='projects'
      style={{ paddingTop: '170px' }}
      ref={containerRef}
    >
      <motion.div
        className='title'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        variants={{
          visible: { opacity: 1, y: -50 },
          hidden: { opacity: 0, y: 0 },
        }}
      >
        <h2>Some Things I&apos;ve Built</h2>
      </motion.div>

      <motion.div
        className='projects-container'
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-100px' }}
        style={{ opacity }}
      >
        {projectsData.map((project, index) => (
          <ProjectCard
            key={project.projectName}
            project={project}
            index={index}
            hoveredProject={hoveredProject}
            setHoveredProject={setHoveredProject}
            openInNewTab={openInNewTab}
            itemVariants={itemVariants}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default Projects
