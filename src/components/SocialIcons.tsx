import { Github, MessageCircle, Send } from 'lucide-react'

function SocialIcons() {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github />,
      link: 'https://github.com/Rabindra184',
    },
    {
      name: 'Discord',
      icon: <MessageCircle />,
      link: 'https://discord.com/users/rabindra_biswal', // Replace with your Discord profile
    },
    {
      name: 'Telegram',
      icon: <Send />,
      link: 'https://t.me/rabindra_biswal', // Replace with your Telegram username
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
