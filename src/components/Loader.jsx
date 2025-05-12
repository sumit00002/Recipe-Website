import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect } from 'react'

const Loader = () => {
  useGSAP(() => {
    gsap.to('.loader-dot', {
      y: -10,
      repeat: -1,
      yoyo: true,
      stagger: 0.2,
      duration: 0.6,
      ease: 'sine.inOut'
    })
  })

  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="flex space-x-2">
        <div className="loader-dot w-3 h-3 bg-green-500 rounded-full"></div>
        <div className="loader-dot w-3 h-3 bg-green-500 rounded-full"></div>
        <div className="loader-dot w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
    </div>
  )
}

export default Loader