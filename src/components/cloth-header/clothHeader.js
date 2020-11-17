import React from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'

const ClothHeader = ({token, roles}) => {
    const loginCabinetComponent = token && roles ? <Link to="/cabinet/">Cabinet</Link> : <Link to="/login/">Login</Link>

    return (
        <div>
            <Link to="/clothes/all/">Clothes</Link>
            <Link to="/clothes/man/">Man's clothes</Link>
            <Link to="/clothes/woman/">Woman's clothes</Link>
            <div>
                {loginCabinetComponent}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        roles: state.roles
    }
}

export default connect(mapStateToProps)(ClothHeader)
