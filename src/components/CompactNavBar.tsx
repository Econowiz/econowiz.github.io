import { motion } from 'framer-motion'

interface CompactNavBarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const CompactNavBar = ({ activeTab, setActiveTab }: CompactNavBarProps) => {
  const navItems = [
    { id: 'about', label: 'NavOption1', icon: '🏠' },

    { id: 'portfolio', label: 'NavOption3', icon: '💼' },
    { id: 'blog', label: 'NavOption4', icon: '📝' },
    { id: 'contact', label: 'NavOption5', icon: '📞' },
    { id: 'services', label: 'NavOption6', icon: '⚙️' },
    { id: 'projects', label: 'NavOption7', icon: '🚀' }
  ]

  return (
    <nav className="w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/30">
      <div className="max-w-full px-3">
        <div className="flex items-center justify-between h-10">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <div className="text-gray-200 font-medium text-sm tracking-wide px-2 py-1">
              OwlTopNavBar
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-2.5 py-1.5 rounded text-xs font-normal transition-all duration-150 flex items-center gap-1.5 ${
                  activeTab === item.id
                    ? 'bg-gray-700/80 text-gray-100 shadow-sm'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-[10px] opacity-70">{item.icon}</span>
                <span className="whitespace-nowrap text-[11px]">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default CompactNavBar