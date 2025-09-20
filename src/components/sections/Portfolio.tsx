import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
// import { Calculator, BarChart, TrendingUp, Settings } from 'lucide-react'
import ProjectDetail from './ProjectDetail'
import { UnifiedCard, UnifiedGrid } from '../shared'

interface ProjectSummary {
  id: string
  title: string
  category: string
  type: string
  description: string
  tags: string[]
  duration: string
  client?: string
  hero_image?: string
  hasInteractive: boolean
  featured: boolean
  order: number
}

interface ProjectsIndex {
  projects: ProjectSummary[]
  categories: Array<{
    id: string
    name: string
    description: string
    color: string
    icon: string
  }>
  tags: string[]
}

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


// Fallback projects (module-level constant for stable reference)
const fallbackProjects: ProjectSummary[] = [
  {
    id: 'ma-valuation',
    title: 'M&A Financial Valuation Model',
    category: 'Financial Analytics',
    type: 'standard',
    description: 'Built comprehensive Excel-based valuation model for $2M industrial chemicals acquisition. Included DCF analysis, comparable company analysis, and sensitivity scenarios that supported successful deal completion.',
    tags: ['Excel', 'DCF', 'M&A', 'Valuation'],
    duration: '6 weeks',
    client: 'Investment Firm',
    hasInteractive: false,
    featured: true,
    order: 1
  },
  {
    id: 'executive-dashboard',
    title: 'Executive KPI Dashboard',
    category: 'Business Intelligence',
    type: 'dashboard',
    description: 'Power BI dashboard providing real-time insights into key performance metrics. Automated data refresh from multiple sources, resulting in 30% faster executive decision-making process.',
    tags: ['Power BI', 'KPIs', 'Real-time', 'Automation'],
    duration: '8 weeks',
    client: 'Corporate Executive Team',
    hasInteractive: true,
    featured: true,
    order: 2
  },
  {
    id: 'real-estate-calculator',
    title: 'Real Estate Investment Calculator',
    category: 'Investment Analysis',
    type: 'interactive',
    description: 'Python-based ROI analysis tool for international real estate investments. Incorporates currency fluctuations, local market trends, and regulatory factors across Asia-Pacific markets.',
    tags: ['Python', 'ROI', 'Real Estate', 'APAC'],
    duration: '10 weeks',
    client: 'Real Estate Investment Fund',
    hasInteractive: true,
    featured: false,
    order: 3
  },
  {
    id: 'financial-automation',
    title: 'Automated Financial Reconciliation',
    category: 'Process Automation',
    type: 'interactive',
    description: 'VBA-powered automation system for monthly financial reconciliations. Reduced manual processing time by 80% and eliminated human errors, saving $20K+ annually in operational costs.',
    tags: ['VBA', 'Automation', '$20K+ Savings', '80% Reduction'],
    duration: '3 months',
    client: 'Manufacturing Company',
    hasInteractive: true,
    featured: true,
    order: 4
  },
  {
    id: 'revenue-forecasting',
    title: 'Revenue Forecasting Model',
    category: 'Financial Analytics',
    type: 'dashboard',
    description: 'Machine learning model using Python and historical data to predict quarterly revenue with 92% accuracy. Integrates market indicators and seasonal patterns for strategic planning.',
    tags: ['Python', 'ML', '92% Accuracy', 'Forecasting'],
    duration: '4 months',
    client: 'Technology Services Company',
    hasInteractive: true,
    featured: true,
    order: 5
  },
  {
    id: 'cost-optimization',
    title: 'Cost Optimization Analysis',
    category: 'Business Intelligence',
    type: 'case-study',
    description: 'Comprehensive analysis using SQL and Tableau to identify cost reduction opportunities. Data-driven recommendations led to 15% reduction in operational expenses across multiple departments.',
    tags: ['SQL', 'Tableau', '15% Reduction', 'Cost Analysis'],
    duration: '2 months',
    client: 'Multi-department Organization',
    hasInteractive: true,
    featured: true,
    order: 6
  }
]

const Portfolio = ({ selectedProject, setSelectedProject }: PortfolioProps) => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [projects, setProjects] = useState<ProjectSummary[]>([])
  const [categories, setCategories] = useState<string[]>(['All'])
  const [loading, setLoading] = useState(true)
  const [error] = useState<string | null>(null)
  const navigate = useNavigate()

  // Load projects from data file
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch('/data/projects/index.json')
        if (response.ok) {
          const projectsIndex: ProjectsIndex = await response.json()
          setProjects(projectsIndex.projects.sort((a, b) => a.order - b.order))

          // Extract unique categories
          const uniqueCategories = ['All', ...Array.from(new Set(projectsIndex.projects.map(p => p.category)))]
          setCategories(uniqueCategories)
        } else {
          // Fallback to hardcoded projects if no data exists yet
          setProjects(fallbackProjects)
        }
      } catch {
        // Fallback to hardcoded projects
        setProjects(fallbackProjects)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])


  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <p className="body-normal">Loading projects...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <p className="text-red-400">Error loading projects: {error}</p>
        </div>
      </div>
    )
  }

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

  const handleProjectClick = (projectId: string) => {
    // Navigate to project URL
    navigate(`/project/${projectId}`)
    // Also update local state for immediate UI update
    if (setSelectedProject) {
      setSelectedProject(projectId)
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
        <h2 className="page-title text-left">Portfolio</h2>

        <div className="h-0.5 w-16 bg-orange-yellow mb-6"></div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        {categories.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`nav-text px-4 py-2 rounded-lg transition-all duration-300 ${
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
            image={project.hero_image}
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
          <p className="body-normal">No projects found for the selected category.</p>
        </motion.div>
      )}
    </div>
  )
}

export default Portfolio
