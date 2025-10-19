import React from 'react'
import { useSelector } from 'react-redux'
import UserDashbord from '../components/UserDashbord'
import OwnerDashboard from '../components/OwnerDashboard';
import DeliveryBoy from '../components/DeliveryBoy';
import Signout from './Signout';


function Home() {
  const {userData} = useSelector(state=>state.user)
  return (
    <div>
      {userData.role == "User" && <UserDashbord />}
      {userData.role =="Owner" && <OwnerDashboard/> }
      {userData.role =="Rider" && <DeliveryBoy/>}
    </div>
  );
}

export default Home
