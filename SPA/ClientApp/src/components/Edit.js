import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1)
}

export class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cat: [],
            sub: [],
            chosenCategory: "",
            chosenSubcategory: "",
            user: {},
            subcategoryOptionsState: "null",
            userName: "",
            userSurname: "",
            userEmail: "",
            userBirth: "",
            userPhone: "",
            canSubmitArray: [true, true, true],
            canSubmit: true
        }
        this.loadUserDataFromServer();
        this.loadCategoriesFromServer();
    }

    async loadUserDataFromServer() {
        if (isNaN(this.props.match.params.id)) {
            this.props.history.push("/NotFound")
            return
        }
        const response = await fetch("user/edit", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.props.match.params.id)
        })
        if (!response.ok) {
            this.props.addAlert("Something went wrong while getting user data. Try to refresh page", "danger")
            return
        }

        try {
            const data = await response.json()
            this.setState({
                user: data,
                chosenSubcategory: data.subcategory,
                chosenCategory: data.category,
                userName: data.name,
                userSurname: data.surname,
                userEmail: data.email,
                userBirth: data.birth,
                userPhone: data.phoneNumber
            });
        }
        catch (e) {
            this.props.history.push("/NotFound")
        }
    }

    async loadCategoriesFromServer() {
        const response = await fetch("user/categories", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        if (response.ok) {
            const data = await response.json()
            let catSubcat = {}
            data.categories.forEach(category => {
                catSubcat[category.name] = data.subcategories.filter(subcat => subcat.categoryID == category.id).map(subcat => subcat.name)
            })
            this.setState({ cat: data.categories, sub: catSubcat });
            return
        }
        this.props.addAlert("Something went wrong while getting categories. Try to refresh page", "danger")
    }

    changeCategoryType(e) {
        this.setState({ chosenCategory: e.target.selectedOptions[0].innerText})
    }

    changeSubcategoryType(e) {
        this.setState({ chosenSubcategory: e.target.selectedOptions[0].innerText })
    }

    changeSubcategory(e) {
        this.setState({ chosenSubcategory: e.target.value })
    }

    changeCanSubmit(state, idx) {
        let curSubmState = this.state.canSubmitArray
        curSubmState[idx] = state
        this.setState({
            canSubmitArray: curSubmState,
            canSubmit: !this.state.canSubmitArray.includes(false)
        })
    }

    changeName(e) {
        let name = e.target.value
        if (name.trim().length >= 1) {
            this.changeCanSubmit(true, 0)
            e.target.style.borderBottom = "4px solid #4caf50"
        }
        else {
            this.changeCanSubmit(false, 0)
            e.target.style.borderBottom = "4px solid #f44336"
        }
        this.setState({
            userName: name
        })
    }

    changeSurname(e) {
        this.setState({
            userSurname: e.target.value
        })
    }

    changeEmail(e) {
        this.setState({
            userEmail: e.target.value
        })
    }

    changePhone(e) {
        this.setState({
            userPhone: e.target.value
        })
    }

    changeBirth(e) {
        this.setState({
            userBirth: e.target.value
        })
    }

    changeEmail(e) {
        let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (e.target.value.match(mailFormat)) {
            this.changeCanSubmit(true, 1)
            e.target.style.borderBottom = "4px solid #4caf50"
        }
        else {
            this.changeCanSubmit(false, 1)
            e.target.style.borderBottom = "4px solid #f44336"
        }
        this.setState({
            userEmail: e.target.value
        })
    }

    changePhone(e) {
        let phoneFormat = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im
        let phone = e.target.value
        if (phone.match(phoneFormat) || phone.length == 0) {
            this.changeCanSubmit(true, 2)
            e.target.style.borderBottom = "4px solid #4caf50"
        }
        else {
            this.changeCanSubmit(false, 2)
            e.target.style.borderBottom = "4px solid #f44336"
        }
        this.setState({
            userPhone: phone
        })
    }

    async updateUser(e) {
        e.preventDefault()
        const data =  {
            ID: parseInt(this.props.match.params.id),
            Name: this.state.userName,
            Surname: this.state.userSurname,
            Email: this.state.userEmail,
            Password: this.state.user.password,
            Category: this.state.chosenCategory,
            Subcategory: this.state.chosenSubcategory != "" ? this.state.chosenSubcategory : null,
            PhoneNumber: this.state.userPhone,
            Birth: this.state.userBirth
        }
        await fetch("user/update", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.ok) {
                this.props.history.push("/")
                return
            }
            throw new Error("Something went wrong while getting user data. Try to refresh page")
        }).catch((error) => {
            this.props.addAlert(error.message, "danger")
        })
    }

    render() {
        return this.props.loggedIn ? (
            <section className="h-100 h-custom" style={{backgroundColor: "#8fc4b7"}}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-lg-8 col-xl-6">
                                <div className="card rounded-3">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp"
                                         className="w-100" style={{borderTopLeftRadius: 0.3+"rem", borderTopRightRadius: 0.3+"rem"}}
                                         alt="Sample photo" />
                                    <div className="card-body p-4 p-md-5">
                                        <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">User Info</h3>

                                        <form className="px-md-2">

                                            <div className="row">
                                                <div className="form-outline col-md-6 mb-4">
                                                    <input type="text" id="form3Example1q" className="form-control" value={this.state.userName} onChange={this.changeName.bind(this)} required/>
                                                    <label className="form-label" htmlFor="form3Example1q">Name<span>*</span></label>
                                                </div>
                                                <div className="form-outline col-md-6 mb-4">
                                                    <input type="text" id="form3Example2q" className="form-control" value={this.state.userSurname == null ? "" : this.state.userSurname} onChange={this.changeSurname.bind(this)}/>
                                                    <label className="form-label" htmlFor="form3Example2q">Surname</label>
                                                </div>
                                            </div>
                                        
                                            <div className="row">
                                                <div className="form-outline col-md-6 mb-4">
                                                    <input type="text" id="form3Example3q" className="form-control" value={this.state.userEmail} onChange={this.changeEmail.bind(this)} required/>
                                                    <label className="form-label" htmlFor="form3Example3q">Email<span>*</span></label>
                                                </div>
                                                <div className="form-outline col-md-6 mb-4">
                                                    <input type="text" id="form3Example7q" className="form-control" value={this.state.userPhone == null ? "" : this.state.userPhone} onChange={this.changePhone.bind(this)} />
                                                    <label className="form-label" htmlFor="form3Example7q">Phone</label>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <select className="select" id="form3Example5q" onChange={this.changeCategoryType.bind(this)} value={this.state.chosenCategory} required>
                                                        {this.state.cat.map(item => (
                                                            <option value={item.name} key={item.name}>{item.name}</option>
                                                        ))}
                                                    </select>
                                                    <label className="form-label" htmlFor="form3Example5q">Category<span>*</span></label>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    {this.state.chosenCategory !== "" && this.state.sub[this.state.chosenCategory] !== undefined && this.state.sub[this.state.chosenCategory].length !== 0 ? (
                                                        <select className="select" id="form3Example5q" value={this.state.chosenSubcategory} onChange={this.changeSubcategoryType.bind(this)}>
                                                            {this.state.sub[this.state.chosenCategory].map(item => (
                                                                <option value={item} key={item}>{capitalize(item)}</option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <input type="text" id="form3Example5q" className="form-control" onChange={this.changeSubcategory.bind(this)} value={this.state.chosenSubcategory == null ? "" : this.state.chosenSubcategory}/>

                                                    )}
                                                    <label className="form-label" htmlFor="form3Example5q">Subcategory</label>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="form-outline col-md-6 mb-4">
                                                    <input type="date" id="form3Example4q" className="form-control" value={this.state.userBirth = null ? "" : this.state.userBirth} onChange={this.changeBirth.bind(this)} />
                                                    <label className="form-label" htmlFor="form3Example4q">Birth</label>
                                                </div>
                                            </div>
                                        

                                            <button type="submit" disabled={!this.state.canSubmit} className="btn btn-success btn-lg mb-1" onClick={this.updateUser.bind(this)}>Submit</button>
                                            <NavLink className="btn btn-danger btn-lg mb-1" to="/" style={{marginLeft: "20px"}}>Back</NavLink>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>
        ) : (
            <h2>You have no acces to be here! Leave!!!</h2>
        )
    }
}