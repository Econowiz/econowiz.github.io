import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calculator } from 'lucide-react'
import { Parser } from 'expr-eval'
import type { CalculatorConfig, CalculatorField } from '../../../types'

interface BaseCalculatorProps {
  config: CalculatorConfig
  className?: string
  onResultChange?: (result: number, additionalOutputs?: Record<string, number>) => void
}

const BaseCalculator: React.FC<BaseCalculatorProps> = ({
  config,
  className = '',
  onResultChange
}) => {
  const [values, setValues] = useState<Record<string, number>>(() => {
    const initialValues: Record<string, number> = {}
    config.fields.forEach(field => {
      initialValues[field.id] = field.defaultValue as number || 0
    })
    return initialValues
  })

  const [result, setResult] = useState<number>(0)
  const [additionalOutputs, setAdditionalOutputs] = useState<Record<string, number>>({})

  // Calculate result whenever values change
  useEffect(() => {
    try {
      const parser = new Parser({ allowMemberAccess: false })
      const sanitize = (s: string) => s.replace(/\bMath\./g, '')

      // Main result
      const expr = parser.parse(sanitize(config.formula))
      const calculatedResult = Number(expr.evaluate(values))
      setResult(Number.isFinite(calculatedResult) ? calculatedResult : 0)

      // Additional outputs
      const additionalResults: Record<string, number> = {}
      if (config.additionalOutputs) {
        for (const output of config.additionalOutputs) {
          try {
            const outExpr = parser.parse(sanitize(output.formula))
            const val = Number(outExpr.evaluate(values))
            additionalResults[output.id] = Number.isFinite(val) ? val : 0
          } catch (error) {
            console.error(`Error calculating ${output.id}:`, error)
            additionalResults[output.id] = 0
          }
        }
      }

      setAdditionalOutputs(additionalResults)
      if (onResultChange) onResultChange(calculatedResult, additionalResults)
    } catch (error) {
      console.error('Error calculating result:', error)
      setResult(0)
    }
  }, [values, config.formula, config.additionalOutputs, onResultChange])

  const handleFieldChange = (fieldId: string, value: number) => {
    setValues(prev => ({
      ...prev,
      [fieldId]: value
    }))
  }

  const formatValue = (value: number, format: string): string => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value)
      case 'percentage':
        return `${value.toFixed(1)}%`
      case 'number':
        return value.toLocaleString('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2
        })
      default:
        return value.toString()
    }
  }

  const renderField = (field: CalculatorField) => {
    const value = values[field.id] || 0

    return (
      <div key={field.id} className="space-y-2">
        <label className="block text-sm font-medium text-white-1">
          {field.label}
        </label>
        
        {field.type === 'select' ? (
          <select
            value={value}
            onChange={(e) => handleFieldChange(field.id, Number(e.target.value))}
            className="w-full px-3 py-2 bg-eerie-black-2 border border-jet rounded-lg text-white-1 focus:outline-none focus:ring-2 focus:ring-orange-yellow focus:border-transparent"
          >
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <div className="relative">
            {field.type === 'currency' && (
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-gray">
                $
              </span>
            )}
            <input
              type="number"
              value={value}
              onChange={(e) => handleFieldChange(field.id, Number(e.target.value))}
              min={field.min}
              max={field.max}
              step={field.step}
              className={`w-full px-3 py-2 bg-eerie-black-2 border border-jet rounded-lg text-white-1 focus:outline-none focus:ring-2 focus:ring-orange-yellow focus:border-transparent ${
                field.type === 'currency' ? 'pl-8' : ''
              } ${field.type === 'percentage' ? 'pr-8' : ''}`}
            />
            {field.type === 'percentage' && (
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-gray">
                %
              </span>
            )}
          </div>
        )}
        
        {field.description && (
          <p className="text-xs text-light-gray">{field.description}</p>
        )}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-jet p-6 rounded-xl border border-jet ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="text-orange-yellow" size={24} />
        <div>
          <h3 className="text-lg font-semibold text-white-1">{config.title}</h3>
          {config.description && (
            <p className="text-light-gray text-sm">{config.description}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Fields */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-white-1 mb-4">Parameters</h4>
          {config.fields.map(renderField)}
        </div>

        {/* Results */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-white-1 mb-4">Results</h4>
          
          {/* Main Result */}
          <div className="bg-eerie-black-2 p-4 rounded-lg border border-jet">
            <div className="text-sm text-light-gray mb-1">{config.resultLabel}</div>
            <div className="text-2xl font-bold text-orange-yellow">
              {formatValue(result, config.resultFormat)}
            </div>
          </div>

          {/* Additional Outputs */}
          {config.additionalOutputs?.map(output => (
            <div key={output.id} className="bg-eerie-black-2 p-4 rounded-lg border border-jet">
              <div className="text-sm text-light-gray mb-1">{output.label}</div>
              <div className="text-lg font-semibold text-white-1">
                {formatValue(additionalOutputs[output.id] || 0, output.format)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default BaseCalculator
