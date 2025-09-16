import { motion } from 'framer-motion'

interface ExactNavBarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const ExactNavBar = ({ activeTab, setActiveTab }: ExactNavBarProps) => {
  const navItems = [
    { id: 'nav-option-1', label: 'NavOption1' },
    { id: 'nav-option-2', label: 'NavOption2' },
    { id: 'nav-option-3', label: 'NavOption3' },
    { id: 'nav-option-4', label: 'NavOption4' },
    { id: 'nav-option-5', label: 'NavOption5' },
    { id: 'nav-option-6', label: 'NavOption6' },
    { id: 'nav-option-7', label: 'NavOption7' }
  ]

  return (
    <nav className="w-full bg-slate-900 border-b border-slate-700/50 shadow-lg">
      <div className="max-w-full px-4">
        <div className="flex items-center justify-between h-12">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <div className="text-white font-semibold text-sm tracking-tight px-3 py-2 bg-slate-800 rounded-md">
              OwlTopNavBar
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  activeTab === item.id
                    ? 'bg-slate-700 text-white shadow-md border border-slate-600'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Icon placeholder - you can replace with actual icons */}
                <div className="w-3 h-3 rounded-full bg-slate-500 opacity-60"></div>
                <span className="whitespace-nowrap">{item.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Right side placeholder for additional controls */}
          <div className="flex items-center space-x-2">
            {/* You can add additional controls here */}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default ExactNavBar