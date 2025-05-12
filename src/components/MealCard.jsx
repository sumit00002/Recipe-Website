import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

const MealCard = ({ meal }) => {
  const cardRef = useRef()

  useGSAP(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 80%"
      }
    })
  }, { scope: cardRef })

  return (
    <div 
      ref={cardRef}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={meal.strMealThumb} 
          alt={meal.strMeal} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <h3 className="text-white text-lg font-semibold">{meal.strMeal}</h3>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{meal.strMeal}</h3>
        <p className="text-gray-600 text-sm mb-4">{meal.strCategory} • {meal.strArea}</p>
        <Link 
          to={`/meal/${meal.idMeal}`}
          className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-300 text-sm font-medium"
        >
          View Recipe
        </Link>
      </div>
    </div>
  )
}

export default MealCard