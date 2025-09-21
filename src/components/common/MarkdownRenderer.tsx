import React from 'react'
import { marked } from 'marked'

interface MarkdownRendererProps {
  content: string
  className?: string
}

// Configure marked for better security and formatting
const configureMarked = () => {
  marked.setOptions({
    breaks: true, // Convert \n to <br>
    gfm: true,    // GitHub flavored markdown
  })
}

// Initialize marked configuration
configureMarked()

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ 
  content, 
  className = '' 
}) => {
  const parseMarkdown = (markdown: string): string => {
    try {
      return marked(markdown) as string
    } catch (error) {
      console.error('Markdown parsing error:', error)
      // Fallback to plain text with line breaks
      return markdown.replace(/\n/g, '<br>')
    }
  }

  const htmlContent = parseMarkdown(content)

  return (
    <div 
      className={`
        markdown-content
        /* Enhanced Headings */
        [&>h2]:text-lg [&>h2]:font-semibold [&>h2]:text-white-1 [&>h2]:mb-4 [&>h2]:mt-6 [&>h2:first-child]:mt-0
        [&>h3]:text-base [&>h3]:font-semibold [&>h3]:text-orange-yellow [&>h3]:mb-3 [&>h3]:mt-5
        
        /* Better Paragraph Spacing */
        [&>p]:text-light-gray [&>p]:leading-relaxed [&>p]:mb-4 [&>p]:text-sm
        
        /* Improved Lists */
        [&>ul]:mb-6 [&>ul]:ml-4
        [&>li]:text-light-gray [&>li]:text-sm [&>li]:leading-relaxed [&>li]:mb-2 [&>li]:pl-2
        [&>li]:relative [&>li]:before:absolute [&>li]:before:left-[-16px] [&>li]:before:content-['•'] 
        [&>li]:before:text-orange-yellow [&>li]:before:font-bold [&>li]:before:text-base
        
        /* Enhanced Typography */
        [&>strong]:text-white-1 [&>strong]:font-semibold [&>strong]:bg-jet [&>strong]:px-1 [&>strong]:py-0.5 [&>strong]:rounded
        [&>em]:text-orange-yellow [&>em]:italic [&>em]:font-medium
        ${className}
      `}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}

export default MarkdownRenderer