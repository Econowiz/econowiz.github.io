import React from 'react'
import { RechartsWrapper } from './charts'
import type { DashboardComponent, DashboardWidget, MetricConfig, ChartConfig } from '../../types'

// Types for dashboard data
type Row = Record<string, string | number | boolean | null>
interface DashboardData {
  accounts_by_risk?: Row[]
  timeline_comparison?: Row[]
  cost_breakdown?: Row[]
  [key: string]: unknown
}


interface DashboardProps {
  component: DashboardComponent
  className?: string
}

const Dashboard: React.FC<DashboardProps> = ({ component, className }) => {
  const { config } = component

  // Load data based on dataSource
  const loadDashboardData = async (dataSource: string) => {
    try {
      const response = await fetch(`/data/projects/intelligent-financial-close/datasets/${dataSource}.json`)
      if (response.ok) {
        return await response.json()
      }
    } catch (error) {
      console.error(`Failed to load ${dataSource}:`, error)
    }
    return null
  }

  const [data, setData] = React.useState<DashboardData | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const loadData = async () => {
      if (component.dataSource) {
        const dashboardData = await loadDashboardData(component.dataSource)
        setData(dashboardData)
      }
      setLoading(false)
    }
    loadData()
  }, [component.dataSource])

  if (loading) {
    return (
      <div className={`bg-gradient-jet p-6 rounded-xl border border-jet ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-jet rounded mb-4 w-1/2"></div>
          <div className="h-32 bg-jet rounded"></div>
        </div>
      </div>
    )
  }

  const getGridClasses = (widgetCount: number) => {
    if (widgetCount === 2) {
      return "grid grid-cols-1 md:grid-cols-2 gap-6"
    } else if (widgetCount === 3) {
      return "grid grid-cols-1 md:grid-cols-3 gap-6"
    } else {
      return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    }
  }

  return (
    <div className={`bg-gradient-jet p-6 rounded-xl border border-jet ${className}`}>
      {/* Dashboard Title */}
      <h3 className="interactive-title mb-6">{config.title}</h3>

      {/* Dynamic Grid Based on Widget Count */}
      <div className={getGridClasses(config.widgets?.length || 0)}>
        {config.widgets?.map((widget) => (
          <DashboardWidgetComponent
            key={widget.id}
            widget={widget}
            data={data}
            size={widget.size}
          />
        ))}
      </div>
    </div>
  )
}

interface DashboardWidgetComponentProps {
  widget: DashboardWidget
  data: DashboardData | null
  size?: 'small' | 'medium' | 'large' | 'full'
}

const DashboardWidgetComponent: React.FC<DashboardWidgetComponentProps> = ({ widget, data, size = 'small' }) => {
  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'large': return 'md:col-span-1'  // Large widgets take 1 column in any grid
      case 'full': return 'md:col-span-2 lg:col-span-3'  // Full spans all columns in current grid
      case 'medium': return 'col-span-1'
      default: return 'col-span-1'
    }
  }

  const formatValue = (value: number | string, format: string) => {
    if (format === 'text') return value.toString()

    const numValue = typeof value === 'string' ? parseFloat(value) : value
    if (isNaN(numValue)) return value.toString()

    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(numValue)
      case 'percentage':
        return `${numValue}%`
      case 'number':
        return numValue.toLocaleString()
      case 'decimal':
        return `${numValue.toFixed(1)}x`
      default:
        return numValue.toString()
    }
  }

  if (widget.type === 'metric') {
    const metricConfig = widget.config as MetricConfig
    return (
      <div className={`bg-eerie-black-2 p-4 rounded-lg border border-jet ${getSizeClasses(size)}`}>
        <div className="text-center">
          <div
            className="text-3xl font-bold mb-2"
            style={{ color: metricConfig.color || '#3b82f6' }}
          >
            {formatValue(metricConfig.value, metricConfig.format)}
          </div>
          <div className="text-white-1 font-medium text-sm mb-1">
            {metricConfig.label}
          </div>
          {metricConfig.trend && (
            <div className="mt-2 text-xs text-light-gray">
              <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                metricConfig.trend.direction === 'up' ? 'bg-green-400' : 'bg-red-400'
              }`}></span>
              {metricConfig.trend.label}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (widget.type === 'chart') {
    const chartConfig = widget.config as ChartConfig

    // Get chart data based on widget configuration
    let chartData: Row[] = []

    // Handle different data sources based on widget title/type
    if (widget.title?.includes('Account') && data?.accounts_by_risk) {
      chartData = data.accounts_by_risk
    } else if (widget.title?.includes('Timeline') && data?.timeline_comparison) {
      chartData = data.timeline_comparison
    } else if (widget.title?.includes('Cost') && data?.cost_breakdown) {
      chartData = data.cost_breakdown
    } else if (data?.accounts_by_risk) {
      // Fallback to first available dataset
      chartData = data.accounts_by_risk
    }

    if (chartData.length === 0) {
      return (
        <div className={`bg-eerie-black-2 p-4 rounded-lg border border-jet ${getSizeClasses(size)}`}>
          <div className="text-center text-light-gray">
            <div className="text-sm">No data available</div>
          </div>
        </div>
      )
    }

    // Only render if we have the required chart properties
    if (chartConfig.library === 'recharts' && 'chartType' in chartConfig && 'xAxisKey' in chartConfig && 'yAxisKey' in chartConfig) {
      return (
        <div className={`bg-eerie-black-2 p-4 rounded-lg border border-jet hover:border-gray-600 transition-all duration-200 ${getSizeClasses(size)}`}>
          <h4 className="text-white-1 font-medium mb-3 text-sm">{widget.title}</h4>
          <RechartsWrapper
            config={{
              library: 'recharts',
              chartType: chartConfig.chartType,
              xAxisKey: chartConfig.xAxisKey,
              yAxisKey: chartConfig.yAxisKey,
              colors: chartConfig.colors,
              showGrid: chartConfig.showGrid,
              showLegend: chartConfig.showLegend,
              title: chartConfig.title,
              xAxisLabel: chartConfig.xAxisLabel,
              yAxisLabel: chartConfig.yAxisLabel,
              height: 280
            }}
            data={chartData}
          />
        </div>
      )
    }
  }

  return (
    <div className={`bg-eerie-black-2 p-4 rounded-lg border border-jet ${getSizeClasses(size)}`}>
      <div className="text-center text-light-gray">
        <div className="text-sm">Widget type not supported</div>
      </div>
    </div>
  )
}

export default Dashboard