import React from 'react'
import OwnerHeader from '../../ownerpage/OwnerHeader'
import OwnerNavbar from '../../ownerpage/OwnerNavbar'
// import OnwerMainPage from '../../ownerpage/OnwerMainPage'
// import Footer from '../../pages/Footer'
// import AddPgForm from '../../ownerpage/AddPgForm'
import { Outlet, useLocation } from 'react-router-dom'

const OnwerHome = () => {
  const location=useLocation();
  const isProfilePage = location.pathname === "/ownerDashbord/profile";
  return (
    <>
   <div>
     <div>
      <OwnerHeader/>
      </div>
      <div className='ml-[200px]'>
         {!isProfilePage && <OwnerNavbar />}
        <Outlet/>
        </div>
     </div>
    </>
  )
}

export default OnwerHome