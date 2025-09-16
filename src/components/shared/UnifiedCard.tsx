import { motion } from 'framer-motion'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { type ReactNode } from 'react'

interface UnifiedCardProps {
  title: string
  category: string
  description: string
  image?: string
  icon?: LucideIcon
  tags?: string[]
  date?: string
  index: number
  onCardClick?: () => void
  getCategoryColor: (category: string) => string
  children?: ReactNode
}

const UnifiedCard = ({
  title,
  category,
  description,
  image,
  icon: Icon,
  tags,
  date,
  index,
  onCardClick,
  getCategoryColor,
  children
}: UnifiedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="bg-gradient-jet p-6 rounded-xl border border-jet hover:border-orange-yellow/20 transition-all duration-300 group"
    >
      {/* Card Header - unified hero section */}
      <div className="-m-6 mb-4 h-40 sm:h-48 relative overflow-hidden rounded-t-xl">
        {/* Background Image or Colored Background */}
        {image ? (
          <img
            src={image}
            alt={`${title} cover`}
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className={`absolute inset-0 ${getCategoryColor(category)} opacity-20`}></div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.35)_35%,rgba(0,0,0,0.6))]"></div>
        
        {/* Category Badge */}
        <div className="absolute top-3 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
            {category}
          </span>
        </div>
        
        {/* Date (for blog posts) */}
        {date && (
          <div className="absolute top-3 right-4">
            <span className="text-white-1/80 text-xs bg-black/30 px-2 py-1 rounded">
              {date}
            </span>
          </div>
        )}
        
        {/* Title */}
        <h3 className="absolute bottom-3 left-4 right-4 text-white-1 font-semibold text-lg tracking-wide line-clamp-2 group-hover:text-orange-yellow transition-colors">
          {title}
        </h3>
      </div>

      {/* Card Description */}
      <p className="text-light-gray text-sm leading-relaxed mb-4 line-clamp-3">
        {description}
      </p>

      {/* Tags (for portfolio projects) */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-2 py-1 bg-eerie-black-2 text-light-gray text-xs rounded border border-jet"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Custom children content */}
      {children}

      {/* Card Action */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={onCardClick}
          className="flex items-center gap-2 text-orange-yellow hover:text-white-1 transition-colors text-sm font-medium"
        >
          {tags ? 'View Details' : 'Read More'}
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
        
        {Icon && (
          <Icon size={20} className="text-light-gray group-hover:text-orange-yellow transition-colors" />
        )}
      </div>
    </motion.div>
  )
}

export default UnifiedCard