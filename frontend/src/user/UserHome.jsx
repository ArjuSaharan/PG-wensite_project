import React, { useState } from 'react'
import UserNavbar from '../Components/userpage/UserNavbar'
import UserMainPage from '../Components/userpage/UserMainPage'
import UserHeader from '../Components/userpage/UserHeader'
const UserHome = () => {
 const [searchText, setSearchText] = useState("");
  return (
    <>
   <div>
     <div>
      <UserHeader/>
      </div>
      <div className='ml-[200px]'>
        <UserNavbar onSearch={setSearchText}/>
        <UserMainPage searchText={searchText}/>
        </div>
     </div>
    </>
  )
}

export default UserHome