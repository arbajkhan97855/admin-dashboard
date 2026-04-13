import React from 'react'
import { Navbar } from '../../../component/navbar'
import { Footer } from '../../../component/footer'
import { CompanyTable } from './companyTable'

export function CompanyPage() {
 
  return (
    <>
    <Navbar />
    <CompanyTable />
    <Footer />
    </>
  )
}
