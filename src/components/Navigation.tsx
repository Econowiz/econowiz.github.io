import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

interface NavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const navigate = useNavigate()

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ]

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId)
    navigate(`/${tabId}`)
  }

  return (
    <nav aria-label="Primary" className="border-b border-jet bg-eerie-black-1 rounded-t-2xl">
      <div className="flex justify-center overflow-x-auto px-2 sm:px-0">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            aria-current={activeTab === item.id ? 'page' : undefined}
            className={`nav-text relative px-4 sm:px-6 md:px-8 py-4 whitespace-nowrap transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-yellow/70 focus-visible:rounded-md ${
              activeTab === item.id ? 'text-white-1' : 'text-light-gray hover:text-light-gray-70'
            }`}
          >
            {item.label}
            {activeTab === item.id && (
              <motion.div
                layoutId="nav-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-yellow"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}


export default Navigation
