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
        promotionFileImage: null,
        clothName: "",
        clothDescription: "",
        clothSex: "",
        clothColor: "",
        clothPrice: null,
        clothCategory: "",
        clothAge: null,
        clothAmount: null,
        clothHeight: "",
        clothMaterial: "",
        materialPercentage: null,
        lineSizes: [],
        materialList: []
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

    performClothSaving = (event) => {
        event.preventDefault()

        const {
            clothName, 
            clothDescription, 
            clothSex, clothColor, 
            clothPrice, 
            clothCategory,
            lineSizes, 
            materialList} = this.state

        const clothSaveRequest = {
            name: clothName,
            description: clothDescription,
            sex: clothSex,
            color: clothColor,
            price: clothPrice,
            category: clothCategory,
            lineSizes: lineSizes,
            materialList: materialList
        }

        const {clothService, token} = this.props

        clothService.performRequest(
            "POST", {"accessToken":token}, clothSaveRequest, "/clothes"
        ).then(res => {
            this.setState({
                clothSavedId: res.id
            })
        })
    }

    addLineSizeToCloth = (event) => {
        event.preventDefault()

        const {clothAge, clothAmount, clothHeight, lineSizes} = this.state;

        this.setState({
            lineSizes: [
                ...lineSizes,
                {
                    age: clothAge,
                    height: clothHeight,
                    amount: clothAmount
                }
            ]
        })
    }

    addMaterialToCloth = (event) => {
        event.preventDefault()

        const {materialList, clothMaterial, materialPercentage} = this.state

        this.setState({
            materialList: [
                ...materialList,
                {
                    material: clothMaterial,
                    percentage: materialPercentage
                }
            ]
        })
    }

    renderPromotionUploadComponent = () => {
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
                        value={this.state.promotionDescription}/>
                    <input type="file"
                        name="file"
                        className="form-control"
                        placeholder="Upload file"
                        onChange={this.handleFileChanges}/>
                    <button className="btn btn-primary">Upload new promotion</button>
                </form>
            </div>
        )
    }

    renderClothUploadComponent = () => {
        return (
            <div>
                <form onSubmit={this.performClothSaving}>
                    <input type="text" 
                        name="clothName" 
                        className="form-control" 
                        placeholder="Promotion Name"
                        onChange={this.handleInputChanges} 
                        value={this.state.clothName}/>
                    <input type="text" 
                        name="clothDescription" 
                        className="form-control" 
                        placeholder="Promotion Name"
                        onChange={this.handleInputChanges} 
                        value={this.state.clothDescription}/>
                    <input type="text" 
                        name="clothSex" 
                        className="form-control" 
                        placeholder="Promotion Name"
                        onChange={this.handleInputChanges} 
                        value={this.state.clothSex}/>
                    <input type="text" 
                        name="clothColor" 
                        className="form-control" 
                        placeholder="Promotion Name"
                        onChange={this.handleInputChanges} 
                        value={this.state.clothColor}/>
                    <input type="number" 
                        name="clothPrice" 
                        className="form-control" 
                        placeholder="Promotion Name"
                        onChange={this.handleInputChanges} 
                        value={this.state.clothPrice}/>
                    <input type="text" 
                        name="clothCategory" 
                        className="form-control" 
                        placeholder="Promotion Name"
                        onChange={this.handleInputChanges} 
                        value={this.state.clothCategory}/>
                </form>
                <form onSubmit={this.addLineSizeToCloth}>
                    <input type="number" 
                        name="clothAge" 
                        className="form-control" 
                        placeholder="Promotion Name"
                        onChange={this.handleInputChanges}
                        value={this.state.clothAge}/>
                    <input type="number" 
                        name="clothAmout" 
                        className="form-control" 
                        placeholder="Promotion Name"
                        onChange={this.handleInputChanges}
                        value={this.state.clothAmout}/>
                    <input type="text" 
                        name="clothHeight" 
                        className="form-control" 
                        placeholder="Promotion Name"
                        onChange={this.handleInputChanges}
                        value={this.state.clothHeight}/>
                </form>
                <form onSubmit={this.addMaterialToCloth}>
                    <input type="text" 
                        name="clothMaterial" 
                        className="form-control" 
                        placeholder="Promotion Name"
                        onChange={this.handleInputChanges}
                        value={this.state.clothMaterial}/>
                    <input type="number" 
                        name="materialPercentage" 
                        className="form-control" 
                        placeholder="Promotion Name"
                        onChange={this.handleInputChanges}
                        value={this.state.materialPercentage}/>
                </form>
            </div>
        )
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
                {this.renderClothUploadComponent()}
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