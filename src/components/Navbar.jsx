import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect } from 'react'

const Navbar = () => {
  useGSAP(() => {
    gsap.from('.nav-item', {
      opacity: 0,
      y: -20,
      stagger: 0.1,
      duration: 0.5,
      ease: 'power2.out'
    })
  })

  return (
    <nav className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="logo text-3xl font-bold text-green-600 hover:text-green-700 transition-colors nav-item"
          style={{ fontFamily: 'jost' }} // Custom Font ko apply karna
        >
          Recipe Master
        </Link>
        <div className="flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors nav-item">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-green-600 transition-colors nav-item">About</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
