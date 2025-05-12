import { useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const SearchFilter = ({ onSearch, onFilter, categories }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  
  useGSAP(() => {
    gsap.from('.search-container', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out'
    })
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [searchTerm, onSearch])

  const handleCategoryChange = (e) => {
    const category = e.target.value
    setSelectedCategory(category)
    onFilter(category)
  }

  return (
    <div className="search-container bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.strCategory} value={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default SearchFilter