import React from 'react'
import { Navbar } from '../../../component/navbar'
import { Footer } from '../../../component/footer'
import { EmployeeTable } from './employeeTable'

export function EmployeePage() {
  return ( 
    <>
    <Navbar />
    <EmployeeTable />
    <Footer />
    </>
  )
}
