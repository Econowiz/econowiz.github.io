import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Calculator, BarChart, TrendingUp, Settings } from 'lucide-react'
import ProjectDetail from './ProjectDetail'
import { UnifiedCard, UnifiedGrid } from '../shared'

interface PortfolioProps {
  selectedProject?: string | null
  setSelectedProject?: (projectId: string | null) => void
}
// TODO [Deep Links]
// - Read project id from the URL (e.g., useParams) and setSelectedProject(id) on mount
// - Also update filters from query params if desired (e.g., ?category=Financial%20Analytics)
//
// TODO [Project Cover Images]
// - Add optional `coverUrl` field to each project (e.g., '/images/projects/slug.jpg')
// - Put images under: public/images/projects/
// - See the hero section below for where to render the <img> (behind overlays)


const Portfolio = ({ selectedProject, setSelectedProject }: PortfolioProps) => {
  const [activeFilter, setActiveFilter] = useState('All')
  const navigate = useNavigate()

  const filters = ['All', 'Financial Analytics', 'Business Intelligence', 'Investment Analysis', 'Process Automation']

  const projects = [
    {
      id: 1,
      title: 'M&A Financial Valuation Model',
      category: 'Financial Analytics',
      description: 'Built comprehensive Excel-based valuation model for $2M industrial chemicals acquisition. Included DCF analysis, comparable company analysis, and sensitivity scenarios that supported successful deal completion.',
      icon: Calculator,
      link: '#',
      tags: ['Excel', 'DCF', 'M&A', 'Valuation']
    },
    {
      id: 2,
      title: 'Executive KPI Dashboard',
      category: 'Business Intelligence',
      description: 'Power BI dashboard providing real-time insights into key performance metrics. Automated data refresh from multiple sources, resulting in 30% faster executive decision-making process.',
      icon: BarChart,
      link: '#',
      tags: ['Power BI', 'KPIs', 'Real-time', 'Automation']
    },
    {
      id: 3,
      title: 'Real Estate Investment Calculator',
      category: 'Investment Analysis',
      description: 'Python-based ROI analysis tool for international real estate investments. Incorporates currency fluctuations, local market trends, and regulatory factors across Asia-Pacific markets.',
      icon: TrendingUp,
      link: '#',
      tags: ['Python', 'ROI', 'Real Estate', 'APAC']
    },
    {
      id: 4,
      title: 'Automated Financial Reconciliation',
      category: 'Process Automation',
      description: 'VBA-powered automation system for monthly financial reconciliations. Reduced manual processing time by 80% and eliminated human errors, saving $20K+ annually in operational costs.',
      icon: Settings,
      link: '#',
      tags: ['VBA', 'Automation', '$20K+ Savings', '80% Reduction']
    },
    {
      id: 5,
      title: 'Revenue Forecasting Model',
      category: 'Financial Analytics',
      description: 'Machine learning model using Python and historical data to predict quarterly revenue with 92% accuracy. Integrates market indicators and seasonal patterns for strategic planning.',
      icon: Calculator,
      link: '#',
      tags: ['Python', 'ML', '92% Accuracy', 'Forecasting']
    },
    {
      id: 6,
      title: 'Cost Optimization Analysis',
      category: 'Business Intelligence',
      description: 'Comprehensive analysis using SQL and Tableau to identify cost reduction opportunities. Data-driven recommendations led to 15% reduction in operational expenses across multiple departments.',
      icon: BarChart,
      link: '#',
      tags: ['SQL', 'Tableau', '15% Reduction', 'Cost Analysis']
    }
  ]

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.category === activeFilter)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Financial Analytics': return 'text-blue-400 bg-blue-400/10'
      case 'Business Intelligence': return 'text-green-400 bg-green-400/10'
      case 'Investment Analysis': return 'text-red-400 bg-red-400/10'
      case 'Process Automation': return 'text-purple-400 bg-purple-400/10'
      default: return 'text-orange-yellow bg-orange-yellow/10'
    }
  }

  const handleProjectClick = (projectId: number) => {
    // Map project IDs to the detailed project IDs
    const projectIdMap: { [key: number]: string } = {
      4: 'financial-automation',
      5: 'revenue-forecasting',
      6: 'cost-optimization'
    }

    const detailedProjectId = projectIdMap[projectId]
    if (detailedProjectId) {
      // Navigate to project URL
      navigate(`/project/${detailedProjectId}`)
      // Also update local state for immediate UI update
      if (setSelectedProject) {
        setSelectedProject(detailedProjectId)
      }
    }
  }

  const handleBackToPortfolio = () => {
    // Navigate back to portfolio
    navigate('/portfolio')
    // Also update local state for immediate UI update
    if (setSelectedProject) {
      setSelectedProject(null)
    }
  }

  // If a project is selected, show the detailed view
  if (selectedProject) {
    return <ProjectDetail projectId={selectedProject} onBack={handleBackToPortfolio} />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-white-1 text-left">Portfolio</h2>
        
        <div className="h-0.5 w-16 bg-orange-yellow mb-6"></div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeFilter === filter
                ? 'bg-orange-yellow text-smoky-black'
                : 'bg-gradient-jet text-light-gray hover:text-orange-yellow border border-jet'
            }`}
          >
            {filter}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <UnifiedGrid>
        {filteredProjects.map((project, index) => (
          <UnifiedCard
            key={project.id}
            title={project.title}
            category={project.category}
            description={project.description}
            tags={project.tags}
            icon={project.icon}
            index={index}
            getCategoryColor={getCategoryColor}
            onCardClick={() => handleProjectClick(project.id)}
          />
        ))}
      </UnifiedGrid>

      {/* No projects message */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <p className="text-light-gray">No projects found for the selected category.</p>
        </motion.div>
      )}
    </div>
  )
}

export default Portfolio
