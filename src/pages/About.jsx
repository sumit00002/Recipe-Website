import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const About = () => {
  useGSAP(() => {
    gsap.from('.about-section', {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.about-container',
        start: "top 60%"
      }
    })
  })

  return (
    <div className="container mx-auto px-4 py-12 about-container">
      <div className="max-w-4xl mx-auto">
        <div className="about-section text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About RecipeMaster</h1>
          <p className="text-xl text-gray-600">
            Your ultimate destination for discovering and exploring delicious recipes from around the world.
          </p>
        </div>

        <div className="about-section bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            At RecipeMaster, we believe that cooking should be fun, accessible, and rewarding for everyone. 
            Our mission is to provide a platform where home cooks of all skill levels can find inspiration 
            and discover new recipes to try.
          </p>
          <p className="text-gray-700">
            We source our recipes from TheMealDB API, which provides thousands of authentic recipes from 
            various cuisines and cultures worldwide.
          </p>
        </div>

        <div className="about-section grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Features</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">Search thousands of recipes</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">Filter by category or cuisine</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">Detailed recipe instructions</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">Video tutorials for many recipes</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Contact Us</h3>
            <p className="text-gray-700 mb-4">
              Have questions or suggestions? We'd love to hear from you!
            </p>
            <a 
              href="mailto:contact@recipemaster.com" 
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About