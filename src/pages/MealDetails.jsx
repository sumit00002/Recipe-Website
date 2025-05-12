import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Loader } from '../components'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const MealDetails = () => {
  const { id } = useParams()
  const [meal, setMeal] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useGSAP(() => {
    gsap.from('.meal-detail-section', {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.meal-detail-section',
        start: "top 80%"
      }
    })
  })

  useEffect(() => {
    const fetchMealDetails = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        setMeal(response.data.meals[0])
      } catch (error) {
        console.error('Error fetching meal details:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMealDetails()
  }, [id])

  if (isLoading) {
    return <Loader />
  }

  if (!meal) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Meal not found</h2>
      </div>
    )
  }

  // Extract ingredients and measures
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push({
        ingredient: meal[`strIngredient${i}`],
        measure: meal[`strMeasure${i}`]
      })
    }
  }

  // Extract YouTube video ID
  const youtubeUrl = meal.strYoutube
  const videoId = youtubeUrl ? youtubeUrl.split('v=')[1] : null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="meal-detail-section bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              src={meal.strMealThumb} 
              alt={meal.strMeal} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{meal.strMeal}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {meal.strCategory}
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {meal.strArea}
              </span>
            </div>
            <p className="text-gray-600 mb-6">{meal.strInstructions}</p>
          </div>
        </div>
      </div>

      <div className="meal-detail-section grid md:grid-cols-2 gap-8 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {ingredients.map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span className="text-gray-700">
                  {item.ingredient} - {item.measure}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {videoId && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Video Tutorial</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-64 md:h-80 rounded-md"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={meal.strMeal}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MealDetails