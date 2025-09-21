import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { UnifiedCard, UnifiedGrid } from '../shared'

interface BlogPost {
  id: string
  title: string
  category: string
  date: string
  excerpt: string
  tags: string[]
  author: string
  readTime: string
  featured: boolean
  image?: string
}

interface BlogIndex {
  posts: BlogPost[]
  categories: Array<{
    id: string
    name: string
    description: string
    color: string
  }>
  tags: string[]
}

// Fallback blog posts (module-level constant for stable reference)
const fallbackBlogPosts: BlogPost[] = [
  {
    id: 'future-of-financial-analytics',
    title: 'The Future of Financial Analytics in 2025',
    category: 'Finance',
    date: '2024-12-15',
    excerpt: 'How AI and machine learning are transforming traditional financial analysis and what professionals need to know.',
    tags: ['AI', 'Finance', 'Analytics'],
    author: 'Your Name',
    readTime: '5 min read',
    featured: true,
    image: '/api/placeholder/300/200'
  },
  {
    id: 'power-bi-dashboards',
    title: 'Building Effective Financial Dashboards with Power BI',
    category: 'Analytics',
    date: '2024-11-28',
    excerpt: 'Best practices for creating executive-level financial dashboards that drive decision-making.',
    tags: ['Power BI', 'Dashboards', 'Analytics'],
    author: 'Your Name',
    readTime: '7 min read',
    featured: true,
    image: '/api/placeholder/300/200'
  },
  {
    id: 'python-real-estate',
    title: 'Python for Real Estate Investment Analysis',
    category: 'Investment',
    date: '2024-10-12',
    excerpt: 'Leveraging Python libraries for comprehensive real estate market analysis and ROI calculations.',
    tags: ['Python', 'Real Estate', 'Investment'],
    author: 'Your Name',
    readTime: '8 min read',
    featured: false,
    image: '/api/placeholder/300/200'
  },
  {
    id: 'excel-vba-automation',
    title: 'Advanced Excel VBA for Financial Process Automation',
    category: 'Automation',
    date: '2024-09-25',
    excerpt: 'How to automate complex financial processes and save thousands in operational costs.',
    tags: ['Excel', 'VBA', 'Automation'],
    author: 'Your Name',
    readTime: '6 min read',
    featured: false,
    image: '/api/placeholder/300/200'
  },
  {
    id: 'southeast-asia-operations',
    title: 'Navigating Cross-Border Financial Operations in Southeast Asia',
    category: 'International',
    date: '2024-08-18',
    excerpt: 'Insights from managing international financial operations and regulatory compliance across cultures.',
    tags: ['International', 'Southeast Asia', 'Operations'],
    author: 'Your Name',
    readTime: '9 min read',
    featured: false,
    image: '/api/placeholder/300/200'
  },
  {
    id: 'data-driven-ma',
    title: 'Data-Driven M&A: Analytics for Better Deal Outcomes',
    category: 'M&A',
    date: '2024-07-30',
    excerpt: 'Using advanced analytics and modeling to improve merger and acquisition decision-making processes.',
    tags: ['M&A', 'Analytics', 'Data-Driven'],
    author: 'Your Name',
    readTime: '10 min read',
    featured: false,
    image: '/api/placeholder/300/200'
  }
]

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error] = useState<string | null>(null)

  // Load blog posts from data file
  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const response = await fetch('/data/blog/index.json')
        if (response.ok) {
          const blogIndex: BlogIndex = await response.json()
          setBlogPosts(blogIndex.posts)
        } else {
          // Fallback to hardcoded posts if no blog data exists yet
          setBlogPosts(fallbackBlogPosts)
        }
      } catch {
        // Fallback to hardcoded posts
        setBlogPosts(fallbackBlogPosts)
      } finally {
        setLoading(false)
      }
    }

    loadBlogPosts()
  }, [])


  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <p className="body-normal">Loading blog posts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <p className="body-normal text-red-400">Error loading blog posts: {error}</p>
        </div>
      </div>
    )
  }

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

  const handleBlogClick = (postId: string) => {
    // For now, show coming soon message
    // Later, you can implement blog post detail view
    alert(`"${blogPosts.find(p => p.id === postId)?.title}" article coming soon!`)
  }

  return (
    <section className="space-y-8" aria-labelledby="blog-title">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 id="blog-title" className="page-title text-left">Blog</h2>

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
            tags={post.tags}
            index={index}
            getCategoryColor={getCategoryColor}
            onCardClick={() => handleBlogClick(post.id)}
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
        <p className="body-small">
          More articles on financial analytics, investment strategy, and business intelligence coming soon!
        </p>
      </motion.div>
    </section>
  )
}

export default Blog
