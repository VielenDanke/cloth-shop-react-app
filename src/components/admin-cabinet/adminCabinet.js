import React, {Component} from 'react'
import WithClothService from '../hoc'
import {Spinner} from 'reactstrap'
import {connect} from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap'
import {categoryLoaded, addCategory} from "../../actions"

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
        clothSex: "MAN",
        clothColor: "",
        clothPrice: null,
        clothCategory: "",
        clothAge: null,
        clothAmount: null,
        clothHeight: "",
        clothMaterial: "",
        materialPercentage: null,
        lineSizes: [],
        materialList: [],
        clothFileImages: undefined,
        categoryName: ""
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

    handleOptionCategoryChanges = (event) => {
        this.setState({
            clothCategory: event.target.value
        })
    }

    handleOptionGenderChagnes = (event) => {
        this.setState({
            clothSex: event.target.value
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

    handleMultiFileChanges = (event) => {
        const target = event.target

        this.setState({
            clothFileImages: target.files
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
            price: Number.parseInt(clothPrice),
            category: clothCategory,
            lineSizes: lineSizes,
            materials: materialList
        }

        console.log(clothSaveRequest)

        const {clothService, token} = this.props
        const {clothFileImages} = this.state

        clothService.performRequest(
            "POST", {"accessToken":token, "Content-Type":"application/json"}, clothSaveRequest, "/clothes"
        ).then(res => {
            const clothId = res.id

            const formData = new FormData()
            
            for (let i = 0; i < clothFileImages.length; i++) {
                formData.append(`image`, clothFileImages[i])
            }

            return clothService.performFileRequestSaving(
                `/clothes/${clothId}/files`, 
                formData,
                {"accessToken":token}
            )
        }).then(res => {
            alert("Cloth successfully uploaded")
            event.target.reset()
        })
    }

    addLineSizeToCloth = (event) => {
        event.preventDefault()

        const {clothAge, clothAmount, clothHeight, lineSizes} = this.state;

        event.target.reset()

        this.setState({
            lineSizes: [
                ...lineSizes,
                {
                    age: Number.parseInt(clothAge),
                    height: clothHeight,
                    amount:  Number.parseInt(clothAmount)
                }
            ],
            clothAge: null,
            clothHeight: "",
            clothAmount: null
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
                    percentage: Number.parseInt(materialPercentage)
                },
            ],
            clothMaterial: "",
            materialPercentage: null
        })
        event.target.reset()
    }

    performCategorySaving = (event) => {
        event.preventDefault()

        const {categoryService, token, addCategory} = this.props

        const categorySaveRequest = {
            categoryName: this.state.categoryName
        }
        categoryService.addCategory("POST", {"accessToken":token, "Content-Type":"application/json"}, categorySaveRequest)
            .then(res => {
                event.target.reset()
                addCategory(res)
            })
    }

    renderCategoryUploadComponent = () => {
        return (
            <form onSubmit={this.performCategorySaving}>
                <input type="text"
                    name="categoryName"
                    className="form-control"
                    placeholder="Category name"
                    onChange={this.handleInputChanges}
                    value={this.state.categoryName}/>
                <button className="btn btn-primary">Upload new category</button>
            </form>
        )
    }

    renderPromotionUploadComponent = () => {
        return (
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
        )
    }

    renderClothMaterialUploadComponent = () => {
        return (
            <form onSubmit={this.addMaterialToCloth}>
                <input type="text" 
                    name="clothMaterial" 
                    className="form-control" 
                    placeholder="Cloth material"
                    onChange={this.handleInputChanges}
                    value={this.state.clothMaterial}/>
                <input type="number" 
                    name="materialPercentage" 
                    className="form-control" 
                    placeholder="Material percentage"
                    onChange={this.handleInputChanges}
                    value={this.state.materialPercentage}/>
                <button className="btn btn-primary" type="submit">Add material</button>    
            </form>
        )
    }

    renderClothLineSizeUploadComponent = () => {
        return (
            <form onSubmit={this.addLineSizeToCloth}>
                    <input type="number" 
                        name="clothAge" 
                        className="form-control" 
                        placeholder="Cloth age"
                        onChange={this.handleInputChanges}
                        value={this.state.clothAge}/>
                    <input type="number" 
                        name="clothAmount" 
                        className="form-control" 
                        placeholder="Cloth amount"
                        onChange={this.handleInputChanges}
                        value={this.state.clothAmount}/>
                    <input type="text" 
                        name="clothHeight" 
                        className="form-control" 
                        placeholder="Cloth height"
                        onChange={this.handleInputChanges}
                        value={this.state.clothHeight}/>
                    <button className="btn btn-primary" type="submit">Add line size</button>
                </form>
        )
    }

    renderClothUploadComponent = () => {
        return (
            <form onSubmit={this.performClothSaving}>
                <input type="text" 
                    name="clothName" 
                    className="form-control" 
                    placeholder="Cloth name"
                    onChange={this.handleInputChanges} 
                    value={this.state.clothName}/>
                <input type="text" 
                    name="clothDescription" 
                    className="form-control" 
                    placeholder="Cloth description"
                    onChange={this.handleInputChanges} 
                    value={this.state.clothDescription}/>
                <label>
                    Choose gender
                    <select value={this.state.clothSex} onChange={this.handleOptionGenderChagnes}>
                        <option value="MAN">Man's cloth</option>
                        <option value="WOMAN">Woman's cloth</option>
                    </select>
                </label>
                <input type="text" 
                    name="clothColor" 
                    className="form-control" 
                    placeholder="Cloth color"
                    onChange={this.handleInputChanges} 
                    value={this.state.clothColor}/>
                <input type="number" 
                    name="clothPrice" 
                    className="form-control" 
                    placeholder="Cloth price"
                    onChange={this.handleInputChanges} 
                    value={this.state.clothPrice}/>
                <input type="text"
                    name="clothCategory"
                    className="form-control"
                    placeholder="Cloth category"
                    onChange={this.handleInputChanges}
                    value={this.state.clothCategory}/>
                <input type="file"
                    name="file"
                    className="form-control"
                    placeholder="Upload cloth files"
                    onChange={this.handleMultiFileChanges}/>
                <button className="btn btn-primary" type="submit">Save cloth</button>    
            </form>
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
                <div>
                    {this.renderCategoryUploadComponent()}
                    {this.renderPromotionUploadComponent(roles)}  
                    {this.renderClothLineSizeUploadComponent()}
                    {this.renderClothMaterialUploadComponent()}
                    {this.renderClothUploadComponent()}
                </div>
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
        categories: state.categories
    }
}

const mapDispatchToProps = {
    categoryLoaded, addCategory
}

export default WithClothService()(connect(mapStateToProps, mapDispatchToProps)(AdminCabinet))