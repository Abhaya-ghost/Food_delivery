import React from 'react'
import Header from '../components/Header'
import RecommendedFood from '../components/RecommendedFood'
import Services from '../components/Services'
import NewFood from '../components/NewFood'
import Services2 from '../components/Services2'
import Special from '../components/Special'
import { useUserContext } from '../context/UserContext'

const Home = () => {
  return (
    <div>
      <Header />
      <RecommendedFood />
      <Services />
      <NewFood />
      <Services2 />
      <Special />
    </div>
  )
}

export default Home