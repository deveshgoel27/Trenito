import React from 'react'
import Header from '../component/Header'
import SpecialityMenu from '../component/SpecialityMenu'
import TopDoctor from '../component/TopDoctor'
import Banner from '../component/Banner'


const Home = () => {
  return (
    <div>
      <Header/>
      <SpecialityMenu/>
      <TopDoctor/>
      <Banner/>
    </div>
  )
}

export default Home