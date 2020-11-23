import React, {Component} from 'react'
import WithClothService from '../hoc'
import Spinner from '../spinner'
import {connect} from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap'
import {addPromotion, promotionUploaded, deletePromotion} from "../../actions"

class AdminCabinet extends Component {

    state = {
        user: null,
        error: false,
        promotionName: "",
        promotionDescription: "",
        promotionId: "",
        promotionFileImage: null
    }

    componentDidMount() {
        const {userService, token} = this.props

        userService.getUserInSession("/cabinet", "GET", {"accessToken":token})
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

    performPromotionSaving = () => {
        const {promotionName, promotionDescription, promotionFileImage} = this.state

        if (promotionName && promotionDescription && promotionFileImage && 
            promotionName.length > 0 && promotionDescription.length > 0) {
                const {clothService, token, addPromotion} = this.props
                
                const promotionSaveRequest = {
                    name: promotionName,
                    description: promotionDescription
                }
                
                clothService.performRequest(
                    "POST", 
                    {"Content-Type":"application/json", "accessToken":token}, 
                    promotionSaveRequest, "/promotions"
                ).then(res => {
                    const id = res.id

                    const formData = new FormData()
                    formData.append("image", promotionFileImage)

                    return clothService.performFileRequestSaving(
                        `/promotions/${id}/file`, 
                        formData,
                        {"accessToken":token}
                    )
                })
                .then(res => res.json())
                .then(res => {
                    addPromotion(res)
                    this.setState({
                        promotionId: "",
                        promotionFileImage: null,
                        promotionName: "",
                        promotionDescription: ""
                    })
                })
        }
    }

    renderPromotionUploadComponent = (role) => {
        if (role === "ROLE_ADMIN") {
            return (
                <div>
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
                    <input type="file"
                        name="file"
                        className="form-control"
                        placeholder="Upload file"
                        onChange={this.handleFileChanges}
                        />
                    <button className="btn btn-primary" 
                        onClick={this.performPromotionSaving}>Upload new promotion</button>
                </div>
            )
        } else {
            return
        }
    }

    deletePromotion = (id) => {
        const {clothService, token, deletePromotion} = this.props

        clothService.performDeleteRequest(`/promotions/${id}`, {"accessToken":token})
            .then(res => {
                if (res.ok) {
                    deletePromotion(id)
                }
            })
    }

    render() {
        const {user, error} = this.state
        const {roles, promotions} = this.props

        const promotionListGroupItems = promotions.map(prom => {
            return (
                <ListGroupItem key={prom.id}>
                    {prom.name}
                    <button onClick={() => this.deletePromotion(prom.id)}>Delete {prom.name}?</button>
                </ListGroupItem>
            )
        })

        if (!user) {
            return <Spinner/>
        }

        if (error) {
            return <h1>Something went wrong</h1>
        }

        return (
            <div>
                <h1>Hello, {user.username}</h1>
                {this.renderPromotionUploadComponent(roles)}  
                <ListGroup>
                    {promotionListGroupItems}
                </ListGroup>  
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        roles: state.roles,
        token: state.token,
        promotions: state.promotions
    }
}

const mapDispatchToProps = {
    addPromotion, promotionUploaded, deletePromotion
}

export default WithClothService()(connect(mapStateToProps, mapDispatchToProps)(AdminCabinet))