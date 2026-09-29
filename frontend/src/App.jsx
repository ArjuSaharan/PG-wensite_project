import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import EditPgData from './ownerpage/EditPgData'
import UserMessage from './Components/userpage/UserMessage'
import MEssages from './ownerpage/MEssages'
import ProtectOwnerRoyre from './Components/coman/ProtectOwnerRoyre'
import ProtectedUserRoute from './Components/coman/ProtectedUserRoute'
import { Navigate } from 'react-router-dom'
import OwnerProfile from './ownerpage/OwnerProfile'
import PublicUserRoute from './Components/coman/PublicUserRoute'
import PublicOwnerRoute from './Components/coman/PublicOwnerRoute'
const App = () => {
  return (
    <>
      <AppContextProvider>
        <div>
          <ToastContainer />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route element={<PublicUserRoute />}>
                <Route path="/login" element={<Login />} />
              </Route>
              <Route element={<PublicOwnerRoute />}>
                <Route path="/ownerlogin" element={<OwnerLogin />} />
              </Route>
              <Route element={<ProtectedUserRoute />}>
                <Route path="/user" element={<UserHome />} />
                <Route path='/pg/:id' element={<ShowOnePg />} />
                <Route path="/messages" element={<UserMessage />} />
                <Route path="/messages/:conversationId" element={<UserMessage />} />

              </Route>
              <Route element={<ProtectOwnerRoyre />}>
                <Route path='/ownerDashbord' element={<OnwerHome />}>
                  <Route index element={<OnwerMainPage />} />
                  {/* Add PG page */}
                  <Route path="addpg" element={<AddPgForm />} />
                  <Route path="owner/messages" element={<MEssages />} />
                  <Route path="messages/:conversationId" element={<MEssages />} />
                  <Route path="profile" element={<OwnerProfile />} />

                </Route>
                <Route path="/owner/edit-pg/:id" element={<EditPgData />} />

              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

          </BrowserRouter>
        </div>
      </AppContextProvider>
    </>

  )
}

export default App