import { useState } from 'react'
import OwlTopNavBar from './OwlTopNavBar'
import ExactNavBar from './ExactNavBar'
import CompactNavBar from './CompactNavBar'
import Navigation from './Navigation'

const NavBarDemo = () => {
  const [activeTab, setActiveTab] = useState('about')
  const [currentNavStyle, setCurrentNavStyle] = useState('compact')

  const renderNavBar = () => {
    switch (currentNavStyle) {
      case 'owl':
        return <OwlTopNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      case 'exact':
        return <ExactNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      case 'compact':
        return <CompactNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      case 'original':
        return <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      default:
        return <CompactNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    }
  }

  return (
    <div className="min-h-screen bg-eerie-black-2">
      {/* Navbar Style Selector */}
      <div className="bg-smoky-black p-4 border-b border-jet">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-white-1 font-semibold mb-3">Choose Navbar Style:</h2>
          <div className="flex gap-2 flex-wrap">
            {[
              { key: 'compact', label: 'Compact (Matches Image)' },
              { key: 'exact', label: 'Exact Dark Style' },
              { key: 'owl', label: 'Owl Top NavBar' },
              { key: 'original', label: 'Original' }
            ].map((style) => (
              <button
                key={style.key}
                onClick={() => setCurrentNavStyle(style.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentNavStyle === style.key
                    ? 'bg-orange-yellow text-eerie-black-1'
                    : 'bg-onyx text-light-gray hover:bg-jet hover:text-white-1'
                }`}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Navbar */}
      {renderNavBar()}

      {/* Content Area */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="text-white-1">
          <h1 className="text-2xl font-bold mb-4">Navbar Demo</h1>
          <p className="text-light-gray mb-4">
            Active Tab: <span className="text-orange-yellow font-semibold">{activeTab}</span>
          </p>
          <p className="text-light-gray mb-4">
            Current Style: <span className="text-orange-yellow font-semibold">{currentNavStyle}</span>
          </p>
          
          <div className="bg-onyx rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold mb-3">Available Navbar Styles:</h3>
            <ul className="space-y-2 text-light-gray">
              <li><strong className="text-orange-yellow">Compact:</strong> Closely matches the style from your image - dark, compact, with small icons</li>
              <li><strong className="text-orange-yellow">Exact Dark Style:</strong> Dark theme with slate colors and compact design</li>
              <li><strong className="text-orange-yellow">Owl Top NavBar:</strong> Full-featured navbar with icons and responsive design</li>
              <li><strong className="text-orange-yellow">Original:</strong> Your existing navigation component</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBarDemo