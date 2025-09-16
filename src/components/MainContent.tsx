import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useParams } from 'react-router-dom'
import Navigation from './Navigation'
import About from './sections/About'
import Portfolio from './sections/Portfolio'
import Blog from './sections/Blog'
import Contact from './sections/Contact'


// ✅ Routing Integration Complete
// - ✅ activeTab synced with current pathname using useLocation
// - ✅ /project/:id routes properly handled with selectedProject state
// - ✅ Navigation uses useNavigate for proper URL routing


const MainContent = () => {
  const [activeTab, setActiveTab] = useState('about')
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const location = useLocation()
  const params = useParams()

  // Sync activeTab with URL pathname
  useEffect(() => {
    const pathname = location.pathname
    if (pathname === '/' || pathname === '/about') {
      setActiveTab('about')
    } else if (pathname === '/portfolio') {
      setActiveTab('portfolio')
    } else if (pathname === '/blog') {
      setActiveTab('blog')
    } else if (pathname === '/contact') {
      setActiveTab('contact')
    } else if (pathname.startsWith('/project/')) {
      setActiveTab('portfolio')
      // Set selected project from URL parameter
      if (params.id) {
        setSelectedProject(params.id)
      }
    }
  }, [location.pathname, params.id])

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return <About />
      case 'portfolio':
        return <Portfolio selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
      case 'blog':
        return <Blog />
      case 'contact':
        return <Contact />
      default:
        return <About />
    }
  }

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex-1 max-w-4xl w-full"
    >
      <div className="relative rounded-2xl border border-white/5 bg-eerie-black-1 backdrop-blur-sm shadow-2xl shadow-black/50 ring-1 ring-white/10">
        {/* Navigation */}
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 lg:p-8"
        >
          {renderContent()}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default MainContent
