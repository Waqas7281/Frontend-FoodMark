import { useEffect } from 'react'
import axios from 'axios'
import {userData} from '../App'
import { useDispatch } from 'react-redux'
import { setCity, setUserData } from '../redux/user.slice';



function useGetCity() {
   
  const dispatch = useDispatch();
  const apiKey = "094094a333b34edc9ed62872380f4472";
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(async (position)=>{
            
           
            const latitude = position?.coords?.latitude;
            const longitude = position?.coords?.longitude;
            const res = await axios.get(
              `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
              
            );
           
            console.log(res.data.results[0].city);
            dispatch(setCity(res?.data?.results[0]?.city));
        })
    },[])
}

export default useGetCity
