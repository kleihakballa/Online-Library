import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import styles from '../../styles/Profile.module.css';
import ScaleLoader from '../layout/Loader';

const ProfilePage = () => {
    const { user } = useAuth();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (user) {
            const fetchUserData = async () => {
                try {
                    const result = await axios.get(`http://localhost:5000/api/${user.id}`);
                    setUserData(result.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };

            fetchUserData();
        }
    }, [user]);

    if (!userData) {
     return   <ScaleLoader/>
    }

    return (
        <div className={styles.container}>
            <h1>My Profile</h1>
            <div className={styles.profile}>
                <img src= '/user-img.png' alt="Profile" className={styles.profilePic} />
                <div className={styles.details}>
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Joined:</strong> {new Date(userData.joinedDate).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
