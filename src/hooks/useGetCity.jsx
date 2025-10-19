import { useEffect } from 'react'
import axios from 'axios'
import {userData} from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/user.slice';



function useGetCity() {
   
  const dispatch = useDispatch();
  const apiKey = import.meta.env.GEO_API_KEY;
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(async (position)=>{
            console.log(position)
            console.log(apiKey)
            const latitude = position?.coords?.latitude;
            const longitude = position?.coords?.longitude;
            const res = await axios.get(
              `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
              
            );
            console.log(res);
        })
    },[])
}

export default useGetCity
