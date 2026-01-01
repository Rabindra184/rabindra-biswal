function Logo() {
  return (
    <svg id='logo' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
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
        <filter id='glow' x='-50%' y='-50%' width='200%' height='200%'>
          <feGaussianBlur stdDeviation='1.2' result='coloredBlur' />
          <feMerge>
            <feMergeNode in='coloredBlur' />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
      </defs>
      <g>
        {/* Ring */}
        <circle
          cx='50'
          cy='50'
          r='41'
          fill='none'
          stroke='url(#grad1)'
          strokeWidth='2'
          strokeLinecap='square'
          strokeDasharray='2.5 7'
          opacity='0.35'
        />

        {/* Inner precision ring */}
        <circle
          cx='50'
          cy='50'
          r='36'
          fill='none'
          stroke='url(#grad1)'
          strokeWidth='1.6'
          opacity='0.12'
        />

        {/* RB monogram (stroke-based, consistent across platforms) */}
        <g
          fill='none'
          stroke='url(#grad1)'
          strokeWidth='5'
          strokeLinecap='square'
          strokeLinejoin='miter'
          strokeMiterlimit='5'
          filter='url(#glow)'
        >
          {/* R */}
          <path d='M 24 76 V 24' />
          <path d='M 24 24 H 42 L 50 32 V 40 L 42 48 H 24' />
          <path d='M 24 48 L 50 76' />

          {/* B */}
          <path d='M 54 24 V 76' />
          <path d='M 54 24 H 70 L 76 30 V 40 L 70 48 H 54' />
          <path d='M 54 48 H 71 L 78 56 V 68 L 71 76 H 54' />
        </g>
      </g>
    </svg>
  )
}

export default Logo
