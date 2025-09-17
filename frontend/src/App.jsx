import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import MirrorPage from "./routes/MirrorPage.jsx"
import MemoryPage from "./routes/MemoryPage.jsx"
import MentorPage from "./routes/MentorPage.jsx"

function App() {
  return (
    <div className="app">
      <Navbar />
      <main id="main-content" className="main-content" tabIndex="-1">
        <Routes>
          <Route path="/" element={<MirrorPage />} />
          <Route path="/mirror" element={<MirrorPage />} />
          <Route path="/memory" element={<MemoryPage />} />
          <Route path="/mentor" element={<MentorPage />} />
        </Routes>
      </main>
      <Footer />
      <div id="live-region" className="live-region" aria-live="polite" aria-atomic="true"></div>
    </div>
  )
}

export default App
