import { useEffect } from 'react'
import axios from 'axios'
import {server} from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/user.slice';


function useGetCurrent() {
  const dispatch = useDispatch();
    useEffect(()=>{
        const fetchUser = async ()=>{
            try {
                const result = await axios.get(`${server}/user-data`, {
                  withCredentials: true,
                });
                dispatch(setUserData(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser();
    },[])
}

export default useGetCurrent
