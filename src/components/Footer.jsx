import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  useGSAP(() => {
    gsap.from('.footer-logo', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.footer-logo',
        start: 'top 90%'
      }
    })
    gsap.from('.footer-desc', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.footer-desc',
        start: 'top 90%'
      }
    })
    gsap.from('.footer-link', {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.footer-link',
        start: 'top 90%'
      }
    })
    gsap.from('.footer-copyright', {
      opacity: 0,
      y: 10,
      duration: 0.6,
      delay: 0.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.footer-copyright',
        start: 'top 90%'
      }
    })
  }, [])

  return (
    <footer
      className="bg-transparent text-white py-8 sm:py-10 relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="footer-logo text-2xl sm:text-3xl font-extrabold text-orange-400">
              RecipeMaster
            </h3>
            <p className="footer-desc text-gray-300 text-sm sm:text-base mt-2 max-w-xs">
              Discover delicious recipes from around the world
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6">
            <a href="#" className="footer-link text-gray-300 hover:text-orange-400 transition-colors text-sm sm:text-base">
              Terms
            </a>
            <a href="#" className="footer-link text-gray-300 hover:text-orange-400 transition-colors text-sm sm:text-base">
              Privacy
            </a>
            <a href="#" className="footer-link text-gray-300 hover:text-orange-400 transition-colors text-sm sm:text-base">
              Contact
            </a>
          </div>
        </div>
        <div className="footer-copyright mt-6 text-center text-gray-400 text-xs sm:text-sm">
          © {new Date().getFullYear()} RecipeMaster. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer