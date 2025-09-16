import { motion } from 'framer-motion'
import { UnifiedCard, UnifiedGrid } from '../shared'

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Financial Analytics in 2025',
      category: 'Finance',
      date: 'Dec 15, 2024',
      excerpt: 'How AI and machine learning are transforming traditional financial analysis and what professionals need to know.',
      image: '/api/placeholder/300/200',
      link: '#'
    },
    {
      id: 2,
      title: 'Building Effective Financial Dashboards with Power BI',
      category: 'Analytics',
      date: 'Nov 28, 2024',
      excerpt: 'Best practices for creating executive-level financial dashboards that drive decision-making.',
      image: '/api/placeholder/300/200',
      link: '#'
    },
    {
      id: 3,
      title: 'Python for Real Estate Investment Analysis',
      category: 'Investment',
      date: 'Oct 12, 2024',
      excerpt: 'Leveraging Python libraries for comprehensive real estate market analysis and ROI calculations.',
      image: '/api/placeholder/300/200',
      link: '#'
    },
    {
      id: 4,
      title: 'Advanced Excel VBA for Financial Process Automation',
      category: 'Automation',
      date: 'Sep 25, 2024',
      excerpt: 'How to automate complex financial processes and save thousands in operational costs.',
      image: '/api/placeholder/300/200',
      link: '#'
    },
    {
      id: 5,
      title: 'Navigating Cross-Border Financial Operations in Southeast Asia',
      category: 'International',
      date: 'Aug 18, 2024',
      excerpt: 'Insights from managing international financial operations and regulatory compliance across cultures.',
      image: '/api/placeholder/300/200',
      link: '#'
    },
    {
      id: 6,
      title: 'Data-Driven M&A: Analytics for Better Deal Outcomes',
      category: 'M&A',
      date: 'Jul 30, 2024',
      excerpt: 'Using advanced analytics and modeling to improve merger and acquisition decision-making processes.',
      image: '/api/placeholder/300/200',
      link: '#'
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Finance': return 'text-blue-400 bg-blue-400/10'
      case 'Analytics': return 'text-green-400 bg-green-400/10'
      case 'Investment': return 'text-red-400 bg-red-400/10'
      case 'Automation': return 'text-purple-400 bg-purple-400/10'
      case 'International': return 'text-cyan-400 bg-cyan-400/10'
      case 'M&A': return 'text-yellow-400 bg-yellow-400/10'
      default: return 'text-orange-yellow bg-orange-yellow/10'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-white-1 text-left">Blog</h2>
        
        <div className="h-0.5 w-12 bg-orange-yellow mb-6"></div>
      </motion.div>

      {/* Blog Posts Grid */}
      <UnifiedGrid>
        {blogPosts.map((post, index) => (
          <UnifiedCard
            key={post.id}
            title={post.title}
            category={post.category}
            description={post.excerpt}
            image={post.image}
            date={post.date}
            index={index}
            getCategoryColor={getCategoryColor}
            onCardClick={() => alert(`"${post.title}" article coming soon!`)}
          />
        ))}
      </UnifiedGrid>

      {/* Coming Soon Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-center py-8"
      >
        <p className="text-light-gray text-sm">
          More articles on financial analytics, investment strategy, and business intelligence coming soon!
        </p>
      </motion.div>
    </div>
  )
}

export default Blog
