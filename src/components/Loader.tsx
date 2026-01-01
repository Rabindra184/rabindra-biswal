import { AnimatePresence, motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

interface LoaderProps {
  isLoading: boolean
  setIsLoading: () => void
}

function Loader({ isLoading, setIsLoading }: Readonly<LoaderProps>) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading()
    }, 3000)

    return () => clearTimeout(timeoutId)
  }, [setIsLoading])

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
        when: 'afterChildren',
      },
    },
  }

  const svgVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
      },
    },
  }

  const ringVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: [0.15, 0.45, 0.15],
      scale: [0.98, 1.02, 0.98],
      transition: {
        repeat: Infinity,
        duration: 2.6,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      transition: { duration: 0.5 },
    },
  }

  const monogramVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: 'easeInOut',
      },
    },
    exit: {
      pathLength: 0,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <AnimatePresence mode='wait'>
      {isLoading && (
        <motion.div
          className='loader'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
        >
          <motion.svg
            id='logo'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 100 100'
            variants={svgVariants}
          >
            <title>Rabindra Biswal</title>
            <defs>
              <linearGradient id='grad1' x1='0%' y1='0%' x2='100%' y2='100%'>
                <stop
                  offset='0%'
                  style={{ stopColor: 'var(--theme-color)', stopOpacity: 0.8 }}
                />
                <stop
                  offset='100%'
                  style={{ stopColor: 'var(--lightest-slate)', stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <g>
              {/* Glow */}
              <filter id='glow' x='-50%' y='-50%' width='200%' height='200%'>
                <feGaussianBlur stdDeviation='1.3' result='coloredBlur' />
                <feMerge>
                  <feMergeNode in='coloredBlur' />
                  <feMergeNode in='SourceGraphic' />
                </feMerge>
              </filter>

              {/* Ring */}
              <motion.circle
                cx='50'
                cy='50'
                r='41'
                fill='none'
                stroke='url(#grad1)'
                strokeWidth='2'
                strokeLinecap='square'
                strokeDasharray='2.5 7'
                opacity='0.35'
                variants={ringVariants}
              />

              {/* Inner precision ring */}
              <motion.circle
                cx='50'
                cy='50'
                r='36'
                fill='none'
                stroke='url(#grad1)'
                strokeWidth='1.6'
                opacity='0.12'
                variants={ringVariants}
              />

              {/* RB monogram */}
              <motion.g
                fill='none'
                stroke='url(#grad1)'
                strokeWidth='5'
                strokeLinecap='square'
                strokeLinejoin='miter'
                strokeMiterlimit='5'
                filter='url(#glow)'
              >
                <motion.path d='M 24 76 V 24' variants={monogramVariants} />
                <motion.path
                  d='M 24 24 H 42 L 50 32 V 40 L 42 48 H 24'
                  variants={monogramVariants}
                />
                <motion.path d='M 24 48 L 50 76' variants={monogramVariants} />

                <motion.path d='M 54 24 V 76' variants={monogramVariants} />
                <motion.path
                  d='M 54 24 H 70 L 76 30 V 40 L 70 48 H 54'
                  variants={monogramVariants}
                />
                <motion.path
                  d='M 54 48 H 71 L 78 56 V 68 L 71 76 H 54'
                  variants={monogramVariants}
                />
              </motion.g>
            </g>
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
}

export default Loader
