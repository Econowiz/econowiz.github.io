import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Tag, Target, Lightbulb, TrendingUp, CheckCircle } from 'lucide-react'
// TODO [Deep Links]
// - When routes are added (e.g., /project/:id), you can read the id via useParams here
//   OR keep using props and pass the id from MainContent/Portfolio
//
// TODO [Hero Cover Image]
// - Support an optional project cover at the top banner, using public/images/projects/<id>.jpg
// - Consider adding a sticky in-page TOC for sections (Challenge, Solution, Results, Lessons)


interface ProjectDetailProps {
  projectId: string
  onBack: () => void
}

const ProjectDetail = ({ projectId, onBack }: ProjectDetailProps) => {
  const getProjectData = (id: string) => {
    switch (id) {
      case 'financial-automation':
        return {
          title: 'Financial Process Automation',
          category: 'Process Automation',
          duration: '3 months',
          client: 'Manufacturing Company',
          overview: 'Transformed manual financial reconciliation processes through intelligent automation, eliminating errors and reducing processing time by 85%.',
          challenge: {
            title: 'The Challenge',
            description: 'The finance team was spending 40+ hours monthly on manual reconciliation processes, leading to frequent errors, delayed reporting, and team burnout. The manual process involved cross-referencing multiple data sources, identifying discrepancies, and creating adjustment entries.',
            painPoints: [
              'Manual data entry errors causing financial discrepancies',
              '40+ hours monthly spent on repetitive tasks',
              'Delayed month-end closing by 3-5 days',
              'High stress levels during reconciliation periods',
              'Lack of audit trail for reconciliation decisions'
            ]
          },
          solution: {
            title: 'The Solution',
            description: 'Developed a comprehensive Python-based automation system with built-in data validation, error detection, and automated reporting capabilities.',
            approach: [
              'Analyzed existing reconciliation workflows and identified automation opportunities',
              'Built Python scripts with pandas for data processing and validation',
              'Implemented automated data matching algorithms with configurable tolerance levels',
              'Created exception handling for complex reconciliation scenarios',
              'Developed automated reporting with detailed audit trails',
              'Integrated with existing ERP system for seamless data flow'
            ],
            technologies: ['Python', 'Pandas', 'Excel VBA', 'SQL', 'ERP Integration']
          },
          results: {
            title: 'Results & Impact',
            description: 'The automation solution delivered immediate and sustained improvements across multiple dimensions.',
            metrics: [
              { label: 'Processing Time Reduction', value: '85%', description: 'From 40+ hours to 6 hours monthly' },
              { label: 'Error Elimination', value: '100%', description: 'Zero manual data entry errors' },
              { label: 'Annual Cost Savings', value: '$20K+', description: 'Through reduced labor and improved efficiency' },
              { label: 'Month-end Acceleration', value: '3-5 days', description: 'Faster financial close process' }
            ],
            businessImpact: [
              'Finance team redirected to strategic analysis and planning',
              'Improved accuracy in financial reporting and compliance',
              'Enhanced audit trail and regulatory compliance',
              'Reduced stress and improved team morale',
              'Scalable solution adaptable to business growth'
            ]
          },
          lessons: [
            'Stakeholder involvement crucial for identifying edge cases',
            'Phased implementation reduces risk and builds confidence',
            'Comprehensive testing prevents production issues',
            'Documentation and training ensure long-term success'
          ]
        }

      case 'revenue-forecasting':
        return {
          title: 'Revenue Forecasting Model',
          category: 'Financial Analytics',
          duration: '4 months',
          client: 'Technology Services Company',
          overview: 'Built a machine learning-powered revenue forecasting model achieving 92% accuracy, enabling data-driven strategic planning and resource allocation.',
          challenge: {
            title: 'The Challenge',
            description: 'The company struggled with inaccurate revenue predictions, making it difficult to plan resources, set realistic targets, and make informed strategic decisions.',
            painPoints: [
              'Revenue forecasts consistently off by 15-20%',
              'Inability to predict seasonal variations accurately',
              'Resource planning challenges due to forecast uncertainty',
              'Missed opportunities due to conservative projections',
              'Lack of confidence in financial planning processes'
            ]
          },
          solution: {
            title: 'The Solution',
            description: 'Developed a sophisticated predictive analytics model combining historical data, market indicators, and machine learning algorithms.',
            approach: [
              'Collected and cleaned 3+ years of historical revenue data',
              'Identified key external factors affecting revenue (market trends, seasonality)',
              'Built multiple forecasting models (ARIMA, Random Forest, Neural Networks)',
              'Implemented ensemble methods for improved accuracy',
              'Created interactive dashboards for scenario planning',
              'Established automated model retraining processes'
            ],
            technologies: ['Python', 'Scikit-learn', 'TensorFlow', 'Pandas', 'Power BI', 'SQL']
          },
          results: {
            title: 'Results & Impact',
            description: 'The forecasting model transformed the company\'s planning capabilities and strategic decision-making process.',
            metrics: [
              { label: 'Forecast Accuracy', value: '92%', description: 'Improved from 80-85% baseline' },
              { label: 'Planning Confidence', value: '40%', description: 'Increase in strategic planning confidence' },
              { label: 'Resource Optimization', value: '25%', description: 'Better resource allocation efficiency' },
              { label: 'Decision Speed', value: '50%', description: 'Faster strategic decision making' }
            ],
            businessImpact: [
              'More accurate budget planning and resource allocation',
              'Improved investor confidence through reliable projections',
              'Better timing for market expansion and investments',
              'Enhanced ability to identify growth opportunities',
              'Reduced financial risk through better planning'
            ]
          },
          lessons: [
            'Data quality is fundamental to model accuracy',
            'Regular model validation prevents drift',
            'User-friendly interfaces drive adoption',
            'Continuous monitoring ensures sustained performance'
          ]
        }

      case 'cost-optimization':
        return {
          title: 'Cost Optimization Analysis',
          category: 'Business Intelligence',
          duration: '2 months',
          client: 'Multi-department Organization',
          overview: 'Conducted comprehensive cost analysis using advanced analytics, identifying and implementing a 15% cost reduction across multiple departments.',
          challenge: {
            title: 'The Challenge',
            description: 'Rising operational costs without clear visibility into cost drivers, making it difficult to identify optimization opportunities and implement targeted cost reduction strategies.',
            painPoints: [
              'Operational costs increasing by 8% annually',
              'Limited visibility into departmental cost drivers',
              'Difficulty identifying inefficiencies across departments',
              'Lack of data-driven cost reduction strategies',
              'Resistance to cost-cutting without clear justification'
            ]
          },
          solution: {
            title: 'The Solution',
            description: 'Implemented a comprehensive cost analysis framework using advanced analytics and data visualization to identify optimization opportunities.',
            approach: [
              'Collected cost data from multiple departments and systems',
              'Built comprehensive cost analysis dashboards in Tableau',
              'Performed statistical analysis to identify cost anomalies',
              'Conducted benchmarking analysis against industry standards',
              'Developed cost optimization recommendations with ROI projections',
              'Created implementation roadmap with priority rankings'
            ],
            technologies: ['SQL', 'Tableau', 'Python', 'Excel', 'Statistical Analysis']
          },
          results: {
            title: 'Results & Impact',
            description: 'The cost optimization initiative delivered significant savings while maintaining operational effectiveness.',
            metrics: [
              { label: 'Cost Reduction', value: '15%', description: 'Across multiple departments' },
              { label: 'Annual Savings', value: '$150K+', description: 'Recurring annual cost savings' },
              { label: 'Process Efficiency', value: '30%', description: 'Improvement in key processes' },
              { label: 'Implementation Speed', value: '6 weeks', description: 'From analysis to implementation' }
            ],
            businessImpact: [
              'Improved profit margins and financial performance',
              'Enhanced operational efficiency across departments',
              'Better cost visibility and control mechanisms',
              'Data-driven culture for continuous improvement',
              'Freed up resources for strategic investments'
            ]
          },
          lessons: [
            'Cross-departmental collaboration essential for success',
            'Data visualization drives stakeholder buy-in',
            'Quick wins build momentum for larger changes',
            'Continuous monitoring ensures sustained savings'
          ]
        }

      default:
        return null
    }
  }

  const project = getProjectData(projectId)

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-light-gray">Project not found.</p>
        <button
          onClick={onBack}
          className="mt-4 text-orange-yellow hover:text-white-1 transition-colors"
        >
          ← Back to Portfolio
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-orange-yellow hover:text-white-1 transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          Back to Portfolio
        </button>

        <h1 className="text-3xl font-bold text-white-1 mb-4">{project.title}</h1>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 text-light-gray">
            <Tag size={16} />
            <span>{project.category}</span>
          </div>
          <div className="flex items-center gap-2 text-light-gray">
            <Calendar size={16} />
            <span>{project.duration}</span>
          </div>
        </div>

        <p className="text-light-gray text-lg leading-relaxed">{project.overview}</p>
      </motion.div>

      {/* Challenge Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gradient-jet p-6 rounded-xl border border-jet"
      >
        <div className="flex items-center gap-3 mb-4">
          <Target className="text-red-400" size={24} />
          <h2 className="text-xl font-semibold text-white-1">{project.challenge.title}</h2>
        </div>

        <p className="text-light-gray mb-4">{project.challenge.description}</p>

        <div className="space-y-2">
          <h3 className="text-white-1 font-medium">Key Pain Points:</h3>
          <ul className="space-y-2">
            {project.challenge.painPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2 text-light-gray text-sm">
                <span className="text-red-400 mt-1">•</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Solution Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gradient-jet p-6 rounded-xl border border-jet"
      >
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="text-blue-400" size={24} />
          <h2 className="text-xl font-semibold text-white-1">{project.solution.title}</h2>
        </div>

        <p className="text-light-gray mb-4">{project.solution.description}</p>

        <div className="space-y-4">
          <div>
            <h3 className="text-white-1 font-medium mb-2">Approach:</h3>
            <ul className="space-y-2">
              {project.solution.approach.map((step, index) => (
                <li key={index} className="flex items-start gap-2 text-light-gray text-sm">
                  <span className="text-blue-400 mt-1">{index + 1}.</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white-1 font-medium mb-2">Technologies Used:</h3>
            <div className="flex flex-wrap gap-2">
              {project.solution.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-eerie-black-2 text-light-gray text-sm rounded border border-jet"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Results Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gradient-jet p-6 rounded-xl border border-jet"
      >
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="text-green-400" size={24} />
          <h2 className="text-xl font-semibold text-white-1">{project.results.title}</h2>
        </div>

        <p className="text-light-gray mb-6">{project.results.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {project.results.metrics.map((metric, index) => (
            <div key={index} className="bg-eerie-black-2 p-4 rounded-lg border border-jet">
              <div className="text-orange-yellow text-2xl font-bold mb-1">{metric.value}</div>
              <div className="text-white-1 font-medium text-sm mb-1">{metric.label}</div>
              <div className="text-light-gray text-xs">{metric.description}</div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-white-1 font-medium mb-2">Business Impact:</h3>
          <ul className="space-y-2">
            {project.results.businessImpact.map((impact, index) => (
              <li key={index} className="flex items-start gap-2 text-light-gray text-sm">
                <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={16} />
                {impact}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Lessons Learned */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-jet p-6 rounded-xl border border-jet"
      >
        <h2 className="text-xl font-semibold text-white-1 mb-4">Key Lessons Learned</h2>
        <ul className="space-y-2">
          {project.lessons.map((lesson, index) => (
            <li key={index} className="flex items-start gap-2 text-light-gray text-sm">
              <span className="text-orange-yellow mt-1">💡</span>
              {lesson}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

export default ProjectDetail
