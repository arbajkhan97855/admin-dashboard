import React from 'react'
import { Navbar } from '../../../component/navbar'
import { Footer } from '../../../component/footer'
import { MidAddTravelPolicy } from './midAddTravelPolicy'
import "./addTravelPolicy.css"

export  function CreateTravelPolicy() {
  return (
    <>
    <Navbar />
    <MidAddTravelPolicy />
    <Footer />
    </>
  )
}
