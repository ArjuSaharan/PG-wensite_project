import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from 'axios';
import { toast } from 'react-toastify'

export const AppConetxt = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = 'http://localhost:3000';
    const [isLoggedin, setisLoggin] = useState(false);
    const [userData, setuserData] = useState(false);
    const [ownerdata, setownerData] = useState(false);
    const [loading, setloading] = useState(true);
    const [user, setuser] = useState(null);
    const [owner, setowner] = useState(null);
    const getuserdata = async () => {
    try {
        const { data } = await axios.get(
            backendUrl + "/pg/users/userdata",
            {
                withCredentials: true
            }
        );
        if (data.success) {
            setuserData(data.userData);
        }
    } catch (error) {
        console.log(error);
    }
};
    const getownerdata = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/pg/owner/getdata', {
                withCredentials: true,
            })
            if (data.success) {
                setownerData(data.ownerData);
            }
        }
        catch (error) {
            toast.error(error.message);
        }
    }
    const checkAuth = async () => {
  try {
    setloading(true);

    const response = await axios.get(
      `${backendUrl}/auth/me`,
      {
        withCredentials: true
      }
    );

    if (response.data.success) {
      if (response.data.role === "user") {
        setuser(response.data.user);
        setowner(null);
        setisLoggin(true);
      }

      if (response.data.role === "owner") {
        setowner(response.data.owner);
        setuser(null);
        setisLoggin(true);
      }
    }

  } catch (error) {

    // 401 simply means no active session
    if (error.response?.status !== 401) {
      console.log(
        "AUTH CHECK ERROR:",
        error.response?.data || error.message
      );
    }

    setuser(null);
    setowner(null);
    setisLoggin(false);

  } finally {
    setloading(false);
  }
}
    useEffect(() => {
        checkAuth();
    }, []);

    const value = {
        backendUrl, getuserdata, isLoggedin, setisLoggin, 
        userData, setuserData, ownerdata, setownerData, getownerdata,
        checkAuth,setuser,setowner,user,owner,loading
    }
    return (
        <AppConetxt.Provider value={value}>
            {props.children}
        </AppConetxt.Provider>
    )
}