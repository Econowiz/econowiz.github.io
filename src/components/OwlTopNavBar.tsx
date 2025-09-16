import { motion } from 'framer-motion'

interface OwlTopNavBarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const OwlTopNavBar = ({ activeTab, setActiveTab }: OwlTopNavBarProps) => {
  const navItems = [
    { id: 'about', label: 'About', icon: '🏠' },

    { id: 'portfolio', label: 'Portfolio', icon: '💼' },
    { id: 'blog', label: 'Blog', icon: '📝' },
    { id: 'contact', label: 'Contact', icon: '📞' },
    { id: 'services', label: 'Services', icon: '⚙️' },
    { id: 'projects', label: 'Projects', icon: '🚀' }
  ]

  return (
    <nav className="w-full bg-eerie-black-1 border-b border-jet/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <div className="text-orange-yellow font-bold text-lg tracking-wide">
              OwlTopNavBar
            </div>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeTab === item.id
                      ? 'bg-gradient-yellow-1 text-eerie-black-1 font-semibold shadow-lg'
                      : 'text-light-gray hover:text-white-1 hover:bg-onyx/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xs">{item.icon}</span>
                  <span>{item.label}</span>
                  
                  {/* Active indicator dot */}
                  {activeTab === item.id && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 bg-orange-yellow rounded-full"
                      layoutId="activeIndicator"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      style={{ transform: 'translateX(-50%)' }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-light-gray hover:text-white-1 hover:bg-onyx/50 focus:outline-none"
              aria-expanded="false"
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (hidden by default) */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 bg-eerie-black-2 border-t border-jet/30">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-3 ${
                activeTab === item.id
                  ? 'bg-gradient-yellow-1 text-eerie-black-1 font-semibold'
                  : 'text-light-gray hover:text-white-1 hover:bg-onyx/50'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default OwlTopNavBar