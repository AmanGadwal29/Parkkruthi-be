import React from 'react'
import Layout from '../../Component/Layout/Layout'
import Carousel from '../../Component/Other/Carousel/Carousel'
import PopularCateg from '../../Component/Other/PopularCateg/PopularCateg'
import Carousel3 from '../../Component/Other/Carousel2/Carousel3.jsx'
import Testimonials from '../../Component/Other/Review/Testimonials.jsx'
import Faq from '../../Component/Other/Faq/Faq.jsx'


const Home = () => {
  return (
    <Layout>
      <Carousel />
      <PopularCateg/>
      <Carousel3/>
      <Testimonials/>
      <Faq/>
    </Layout>
  )
}

export default Home