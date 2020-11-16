import React from 'react'
import {Link} from 'react-router-dom';

const ClothHeader = () => {

    return (
        <div>
            <Link to="/clothes/all/">Clothes</Link>
            <Link to="/clothes/man/">Man's clothes</Link>
            <Link to="/clothes/woman/">Woman's clothes</Link>
        </div>
    )
}

export default ClothHeader