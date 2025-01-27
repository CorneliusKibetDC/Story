import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../auth';


const LoggedinHome=()=>{
    return (
        <div className="notes">
            <h1>Lists of notes</h1>
        </div>
    )
}
const LoggedOutHome=()=>{
    return (
        <div className="home container">
            <h1 className="heading">Welcome to notes</h1>
            <Link to='/signup' className="btn btn-primary btn-lg">Get started</Link>
        
        </div>
    )
}
const HomePage = () => {
    const [logged] = useAuth();
    
    return (
        <div>
            {logged ? <LoggedinHome /> : <LoggedOutHome />}
        </div>
    );
};

export default HomePage