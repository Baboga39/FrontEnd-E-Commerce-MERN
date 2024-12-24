import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"airpodes" }heading={"Top's Airpodes"}/>
      <VerticalCardProduct category={"mobiles" }heading={"Mobile phone"}/>
    </div>
  )
}

export default Home
