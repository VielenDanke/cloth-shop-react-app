import React, {Component} from 'react'
import WithClothService from '../hoc'
import {ACCESS_TOKEN} from "../../constants"
import Spinner from '../spinner'
import {connect} from 'react-redux'

class AdminCabinet extends Component {

    state = {
        user: null,
        error: false,
        promotionName: "",
        promotionDescription: "",
        promotionId: null,
        promotionFileImage: null
    }
    

    componentDidMount() {
        const {userService} = this.props
    
        userService.getUserInSession("/cabinet", "GET", {"accessToken":localStorage.getItem(ACCESS_TOKEN)})
            .then(res => {
                this.setState({
                    user: res
                })
            })
    }

    handleInputChanges = (event) => {
        const target = event.target
        const inputName = target.name
        const inputValue = target.value

        this.setState({
            [inputName]: inputValue
        })
    }

    handleFileChanges = (event) => {
        const target = event.target

        this.setState({
            promotionFileImage: target.files[0]
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const {promotionName, promotionDescription} = this.state
        const {clothService} = this.props

        const promotionSaveRequest = {
            name: promotionName,
            description: promotionDescription
        }
        
        clothService.performRequest(
            "POST", 
            {"Content-Type":"application/json", "accessToken":localStorage.getItem(ACCESS_TOKEN)}, 
            promotionSaveRequest, "/promotions"
        ).then(res => {
            this.setState({
                promotionId: res.id
            })
        })
    }

    onFilePromotionSubmit = (event) => {
        event.preventDefault()

        const {promotionId, promotionFileImage} = this.state
        const {clothService, token} = this.props

        const formData = new FormData()
        formData.append("image", promotionFileImage)

        clothService.performFileRequestSaving(
            `/promotions/${promotionId}/file`, 
            formData,
            {"accessToken":token}
        ).then(res => {
            this.setState({
                promotionId: null,
                promotionFileImage: null,
                promotionName: "",
                promotionDescription: ""
            })
        })
    }

    renderComponentDependsOnRole = (role) => {
        if (role === "ROLE_ADMIN") {
            return (
                <form onSubmit={this.handleSubmit}>
                    <input type="text" 
                        name="promotionName" 
                        className="form-control" 
                        placeholder="Promotion Name"
                        onChange={this.handleInputChanges} 
                        value={this.state.promotionName}/>
                    <input type="text" 
                        name="promotionDescription" 
                        className="form-control" 
                        placeholder="Promotion Description" 
                        onChange={this.handleInputChanges} 
                        value={this.state.promotionDescription}
                        />
                    <button type="submit">Create Promotion</button>
                </form>                    
            )
        } else {
            return
        }
    }

    renderPromotionIdComponent = (promotionId) => {
        if (promotionId) {
            return (
                <form onSubmit={this.onFilePromotionSubmit}>
                    <input type="file"
                    name="file"
                    className="form-control"
                    placeholder="Upload file"
                    onChange={this.handleFileChanges}
                    />
                    <button type="submit">Upload file</button>
                </form>
            )
        } else {
            return
        }
    }

    render() {
        const {user, error, promotionId} = this.state
        const {roles} = this.props

        if (!user) {
            return <Spinner/>
        }

        if (error) {
            return <h1>Something went wrong</h1>
        }

        return (
            <div>
                <h1>Hello, {user.username}</h1>
                {this.renderComponentDependsOnRole(roles)}    
                {this.renderPromotionIdComponent(promotionId)}    
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        roles: state.roles,
        token: state.token
    }
}

export default WithClothService()(connect(mapStateToProps)(AdminCabinet))