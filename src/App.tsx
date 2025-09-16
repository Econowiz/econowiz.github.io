import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'
/*
✅ URL Routing Implementation Complete
- ✅ Migrated internal tab state to URL routes using react-router-dom
- ✅ Implemented routes: /about, /portfolio, /blog, /contact, /project/:id
- ✅ Added proper navigation with useNavigate()
- ✅ Project deep links working: /project/financial-automation, /project/revenue-forecasting, etc.
- ✅ Browser back/forward buttons work correctly
- ✅ URLs are shareable and bookmarkable
*/

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <main className="flex flex-col lg:flex-row max-w-7xl mx-auto p-4 lg:p-8 gap-6 overflow-x-hidden">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content with Routes */}
          <Routes>
            <Route path="/" element={<Navigate to="/about" replace />} />
            <Route path="/about" element={<MainContent />} />
            <Route path="/portfolio" element={<MainContent />} />
            <Route path="/blog" element={<MainContent />} />
            <Route path="/contact" element={<MainContent />} />
            <Route path="/project/:id" element={<MainContent />} />
          </Routes>
        </main>
      </Router>
    </ErrorBoundary>
  )
}

export default App