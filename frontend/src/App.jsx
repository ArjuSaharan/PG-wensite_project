import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Components/coman/Home'
import Login from './pages/Login'
import OwnerLogin from './pages/OwnerLogin'
import OnwerHome from './Components/owner/OnwerHome'
import UserHome from './user/UserHome'
import OnwerMainPage from './ownerpage/OnwerMainPage'
import AddPgForm from './ownerpage/AddPgForm'
import ShowOnePg from './Components/userpage/ShowOnePg'
import { AppContextProvider } from './context/AppContext'
import { ToastContainer } from 'react-toastify'
const App = () => {
  return (
    <>
   <AppContextProvider>
    <div>
      <ToastContainer/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/ownerlogin' element={<OwnerLogin/>}/>
        <Route path="/user" element={<UserHome/>}/>
        <Route path='/pg/:id' element={<ShowOnePg/>}/>
        <Route path='/ownerDashbord' element={<OnwerHome/>}>
          <Route index element={<OnwerMainPage />} />
                {/* Add PG page */}
                <Route path="addpg" element={<AddPgForm />} />
        </Route>
       
      </Routes>
      
    </BrowserRouter>
    </div>
   </AppContextProvider>
    </>

  )
}

export default App