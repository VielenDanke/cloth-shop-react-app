import React, {Component} from 'react'
import WithClothService from '../hoc'
import Spinner from '../spinner'
import {connect} from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap'

class AdminCabinet extends Component {

    state = {
        user: null,
        error: false,
        promotions: [],
        promotionName: "",
        promotionDescription: "",
        promotionId: "",
        promotionFileImage: null
    }

    componentDidMount() {
        const {userService, token, clothService} = this.props

        userService.getUserInSession("/cabinet", "GET", {"accessToken":token})
            .then(res => {
                this.setState({
                    user: res
                })
            })
        clothService.getPromotions()
            .then(res => {
                this.setState({promotions: res})
            })
    }

    componentDidUpdate(prevProps, prevState) {
        const {clothService} = this.props

        if (prevState.promotions.length !== this.state.promotions.length) {
            clothService.getPromotions()
            .then(res => {
                this.setState({promotions: res})
            })
        }
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

    performPromotionSaving = (event) => {
        event.preventDefault()

        const {promotionName, promotionDescription, promotionFileImage, promotions} = this.state

        if (promotionName && promotionDescription && promotionFileImage && 
            promotionName.length > 0 && promotionDescription.length > 0) {
                const {clothService, token} = this.props
                
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
                    event.target.reset()
                    this.setState({
                        promotions: [
                            ...promotions,
                            res
                        ]
                    })
                })
        }
    }

    renderPromotionUploadComponent = (role) => {
        if (role === "ROLE_ADMIN") {
            return (
                <div>
                    <form onSubmit={this.performPromotionSaving}>
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
                        <button className="btn btn-primary">Upload new promotion</button>
                    </form>
                </div>
            )
        } else {
            return
        }
    }

    deletePromotion = (id) => {
        const {clothService, token} = this.props
        const {promotions} = this.state

        clothService.performDeleteRequest(`/promotions/${id}`, {"accessToken":token})
            .then(res => {
                if (res.ok) {
                    const itemIndex = promotions.findIndex(item => item.id === id)

                    this.setState({promotions: [
                        promotions.slice(0, itemIndex),
                        promotions.slice(itemIndex + 1)
                    ]})
                }
            })
    }

    render() {
        const {user, error, promotions} = this.state
        const {roles} = this.props

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
        token: state.token
    }
}

export default WithClothService()(connect(mapStateToProps)(AdminCabinet))