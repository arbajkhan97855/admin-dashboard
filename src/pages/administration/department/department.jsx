import React from 'react'
import { Navbar } from '../../../component/navbar'
import { Footer } from '../../../component/footer'
import { DepartmentTable } from './departmentMid'

export  function DepartmentPage() {
  return (
    <>
    <Navbar />
    <DepartmentTable />
    <Footer />
    </>
  )
}

