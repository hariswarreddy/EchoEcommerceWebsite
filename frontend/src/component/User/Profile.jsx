import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { useSelector } from 'react-redux';
import "./profile.css"

const Profile = () => {
    const navigate = useNavigate();
    const { loading, user, isAuthenticated } = useSelector(state => state.user);
    
    useEffect(() => {
    
      return () => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
      }
    }, [isAuthenticated,navigate])
    

  return (
      <>
          {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${String(user.name)}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar?.url} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </>
      )}
      
      </>
  )
}

export default Profile;