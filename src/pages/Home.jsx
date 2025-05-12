import { useState, useEffect } from 'react'
import axios from 'axios'
import { MealCard, Loader, SearchFilter } from '../components'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  const [meals, setMeals] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('')

  useGSAP(() => {
    // Hero section animations
    gsap.from('.hero-title', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    })
    gsap.from('.hero-subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out'
    })
    // Meal cards animation
    gsap.from('.meal-card', {
      opacity: 0,
      y: 15,
      stagger: 0.1,
      duration: 0.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.meal-card',
        start: 'top 85%'
      }
    })
    // Search filter animation
    gsap.from('.search-filter', {
      opacity: 0,
      scale: 0.97,
      duration: 0.5,
      ease: 'back.out(1.5)'
    })
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
        setCategories(response.data.categories)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true)
      try {
        let url = 'https://www.themealdb.com/api/json/v1/1/'
        
        if (searchTerm) {
          url += `search.php?s=${searchTerm}`
        } else if (filter) {
          url += `filter.php?c=${filter}`
        } else {
          url += 'search.php?f=b'
        }

        const response = await axios.get(url)
        setMeals(response.data.meals || [])
      } catch (error) {
        console.error('Error fetching meals:', error)
        setMeals([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchMeals()
  }, [searchTerm, filter])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleFilter = (category) => {
    setFilter(category)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-r from-orange-400 to-red-500 text-white py-16 sm:py-20 md:py-24 px-2 sm:px-4"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="container mx-auto text-center relative z-10">
          <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl font-extrabold mb-3 sm:mb-4 drop-shadow-lg">
            Discover Delicious Recipes
          </h1>
          <p className="hero-subtitle text-lg sm:text-xl md:text-2xl max-w-xl sm:max-w-2xl mx-auto opacity-90">
            Explore thousands of mouth-watering recipes from around the globe
          </p>
        </div>
        <div className="absolute inset-0 bg-black/50 sm:bg-black/40"></div>
      </section>

      {/* Search and Filter */}
      <section className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
        <div className="search-filter mb-8 sm:mb-10">
          <SearchFilter 
            onSearch={handleSearch} 
            onFilter={handleFilter} 
            categories={categories} 
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12 sm:py-16">
            <Loader />
          </div>
        ) : meals.length > 0 ? (
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
              {searchTerm ? `Results for "${searchTerm}"` : filter ? `${filter} Recipes` : 'Popular Recipes'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {meals.map((meal) => (
                <div key={meal.idMeal} className="meal-card">
                  <MealCard meal={meal} />
                </div>
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-10 sm:py-12 bg-white rounded-lg shadow-md mx-2 sm:mx-0">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700">No Recipes Found</h3>
            <p className="text-gray-500 mt-1 sm:mt-2 text-sm sm:text-base">Try a different search term or category</p>
            <button
              className="mt-3 sm:mt-4 px-4 sm:px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors text-sm sm:text-base"
              onClick={() => {
                setSearchTerm('')
                setFilter('')
              }}
            >
              Reset Search
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

export default Home