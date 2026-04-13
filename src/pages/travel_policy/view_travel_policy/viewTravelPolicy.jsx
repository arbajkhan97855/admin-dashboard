import React from 'react'
import { Navbar } from '../../../component/navbar'
import { Footer } from '../../../component/footer'
import { MidViewTravelPolicy } from './midViewTravelPolicy'
import "./viewTravelPolicy.css"

export function ViewTravelPolicy() {
  return (
    <>
    <Navbar />
    <MidViewTravelPolicy />
    <Footer />
    </>
  )
}
