import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AddBlockPage from './pages/AddBlockPage'
import EditBlockPage from './pages/EditBlockPage'
import BlockSelectPage from './pages/BlockSelectPage'
import './App.css'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blocks/new" element={<AddBlockPage />} />
        <Route path="/blocks/select" element={<BlockSelectPage />} />
        <Route path="/blocks/edit/:blockId" element={<EditBlockPage />} />
        <Route path="/broadcast" element={<AddBlockPage />} />
      </Routes>
    </Router>
  )
}