import React, {useContext, useEffect} from 'react';
import {AuthContext} from '../context/auth/authState'

const Home = () => {

    const {loadUser, isAuthenticated} = useContext(AuthContext);

    useEffect(() => {
        if(isAuthenticated){
            loadUser();
            
        }
        //eslint-disable-next-line
    }, [isAuthenticated])
    
    return (
        <div className="home"> 
           <h1>Finance Planner</h1>
           <div className="paragraph">
           <p>
               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt beatae unde suscipit
                dignissimos ipsum corporis labore, neque tempore corrupti quasi aliquam maiores nostrum
                officiis id explicabo culpa nam. Dolorem, voluptatum.
               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt beatae unde suscipit
                dignissimos ipsum corporis labore, neque tempore corrupti quasi aliquam maiores nostrum
                officiis id explicabo culpa nam. Dolorem, voluptatum.
           </p>
           </div>
        </div>
    )
}

export default Home
