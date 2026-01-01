import { Link } from 'lucide-react'

function SocialIcons() {
  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: <Link />,
      link: 'https://www.linkedin.com/in/rabindra-biswal',
    },
  ]

  return (
    <div className='social-icons'>
      <ul className='social-icons-list'>
        {socialLinks.map(({ name, icon, link }) => (
          <li key={name} title={name} className='social-icons-list-item'>
            <a
              href={link}
              className='social-icons-list-item-link'
              target='_blank'
              rel='noopener noreferrer'
            >
              {icon}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SocialIcons
