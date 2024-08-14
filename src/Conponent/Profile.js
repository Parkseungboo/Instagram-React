//  import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';



function Profile(){
    const location = useLocation();
    const navigate = useNavigate(); 
    const { email } = location.state || {};

    return(
        <div>
            프로필페이지입니다.
            <input type="button" value="피드 올리기" onClick={()=> {
                navigate('/CreatePost', {state: { email }});
            }} />
        </div>
    )
}

export default Profile;