import React from 'react'
import {server} from '../App'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/user.slice';
import { useNavigate } from 'react-router-dom';

function Signout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handelClearCookie= async()=> {
        try {
            const result = await axios.get(`${server}/signout`, {
              withCredentials: true,
            });
            console.log(result);
            // Clear user data from Redux
            dispatch(setUserData(null));
            // Navigate to signin page
            navigate('/signin');
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <button onClick={handelClearCookie}>
            signout
        </button>
        </div>
  )
}

export default Signout