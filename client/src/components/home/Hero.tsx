import React from 'react'
import { assets } from '../../assets/assets'

const Hero = () => {
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
        <div className='absolute inset-0 z-0'>
            <img src={assets.hero_bg_img} alt="Dining Room" className='w-full h-full object-cover brightness-70' />
            <div className='absolute inset-0 bg-black/30'/>

        </div>
    </section>
  )
}

export default Hero