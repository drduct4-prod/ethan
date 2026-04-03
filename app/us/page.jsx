import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ServicesSection from '../components/Servicessection'
import WhyChooseUs from '../components/WhyChooseUs'
import HVACBentoSection from '../components/HvaBentoSection'
import TestimonialsSection from '../components/Testimonials'
import FAQSection from '../components/FAQ'
import Footer from '../components/Footer'

const page = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <ServicesSection/>
    <WhyChooseUs/>
    <HVACBentoSection/>
    <TestimonialsSection/>
    <FAQSection/>
    <Footer/>
    
    
    
    </>
  )
}

export default page