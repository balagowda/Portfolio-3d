import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StarBackground from './components/StarBackground'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Cursor from './components/Cursor'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app">
      <Cursor />
      <StarBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
