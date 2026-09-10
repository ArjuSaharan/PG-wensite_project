import React from 'react'
import OwnerHeader from '../../ownerpage/OwnerHeader'
import OwnerNavbar from '../../ownerpage/OwnerNavbar'
// import OnwerMainPage from '../../ownerpage/OnwerMainPage'
// import Footer from '../../pages/Footer'
// import AddPgForm from '../../ownerpage/AddPgForm'
import { Outlet } from 'react-router-dom'

const OnwerHome = () => {
  return (
    <>
   <div>
     <div>
      <OwnerHeader/>
      </div>
      <div className='ml-[200px]'>
        <OwnerNavbar/>
        <Outlet/>
        </div>
     </div>
    </>
  )
}

export default OnwerHome