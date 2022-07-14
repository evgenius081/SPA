import React, { Component, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus, faTrash } from '@fortawesome/fontawesome-free-solid'

import 'font-awesome/css/font-awesome.min.css';

class InfoTable extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <tr data-eid={this.props.userInfo.id}>
                <td colSpan={this.props.loggedIn ? 5 : 3}>
                    <table className="table">
                        <thead className="thead-light">
                        <tr>
                            <th scope="col">Phone number</th>
                            <th scope="col">Category</th>
                            <th scope="col">Subcategory</th>
                            <th scope="col">Birtday</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">{this.props.userInfo.phoneNumber == null ? (<div className="unknown"></div>) : this.props.userInfo.phoneNumber}</th>
                            <td>{this.props.userInfo.category}</td>
                            <td>{this.props.userInfo.subcategory == null ? (<div className="unknown"></div>) : this.props.userInfo.subcategory}</td>
                            <td>{this.props.userInfo.birth == null ? (<div className="unknown"></div>) : this.props.userInfo.birth}</td>
                        </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        )
    }
}

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { data: [], showComponent: {}};
        this._handleTableClick = this._handleTableClick.bind(this)
        this.deleteHandler = this.deleteHandler.bind(this)
    }

    async loadDataFromServer() {
         const response = await fetch("user", {
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              }
         })
         const data = await response.json()
         let show = {}
         data.forEach((u) => { show[u.id] = false })
         this.setState({ data: data, showComponent: show })
         
    }

    async deleteHandler(e) {
        let id = e.target.closest('.deleteButton').dataset.id;
        await fetch("user/delete", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(id)
        }).then((response) => {
            if (response.ok) {
                this.setState({
                    data: this.state.data.filter(user => user.id != id)
                })
                return
            }
            throw new Error("Something went wrong while deleting element")
        }).catch((error) => { this.props.addAlert(error.message, "danger") })
    }

    componentDidMount() {
        this.loadDataFromServer();
    }

    _handleTableClick(e) {
        if (e.target.parentElement.classList.contains("userInfoElement")) {
            let colors = ['#e0e0e0', '#ffffff']
            let show = this.state.showComponent
            e.target.parentElement.style.background = colors[+show[e.target.parentElement.dataset.eid]]
            show[e.target.parentElement.dataset.eid] = !show[e.target.parentElement.dataset.eid]
            this.setState({
                showComponent: show
            })
        }        
    }

    render(){
        const users = this.state.data.map(user => (
            <TableElement user={user} key={user.id} tableClick={this._handleTableClick} deleteHandler={this.deleteHandler} showComponent={this.state.showComponent} loggedIn={this.props.loggedIn}/>
        ))
        return (
            <>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Email</th>
                            <th scope="col">Name</th>
                            <th scope="col">Surname</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users}
                    </tbody>
                </table>
                {this.props.loggedIn ? <NavLink tag={Link} to="/create" className="createButton" style={{display: "flex", alignItems: "center", justifyContent: "center"}}><FontAwesomeIcon icon={faPlus} style={{ color:"#000", fontSize: "30px", display: "block" }} className="fa-solid fa-plus" /></NavLink> : null}
            </>
        )
    }
}

class TableElement extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const user = this.props.user
        return (
            <>
                <tr className="userInfoElement" key={user.id} style={{ cursor: "pointer" }} data-eid={user.id} onClick={this.props.tableClick}>
                    <th scope="row">{user.email}</th>
                    <td>{user.name}</td>
                    <td>{user.surname == null ? (<div className="unknown"></div>) : user.surname}</td>
                    {this.props.loggedIn ? (
                        <Buttons user={user} deleteHandler={this.props.deleteHandler} />
                    ) : null}
                </tr>
                {this.props.showComponent[user.id] ? <InfoTable userInfo={user} loggedIn={this.props.loggedIn} /> : null}
            </>
        )
    }
}

function Buttons(props) {
    return (
        <>
            <td>
                <button data-id={props.user.id} className="deleteButton" onClick={props.deleteHandler}><FontAwesomeIcon icon={faTrash} style={{ color: "#d32f2f" }} /></button>
            </td>
            <td>
                <NavLink tag={Link} style={{ paddingTop: "0.25rem", width: "30px" }} to={{
                    pathname: "edit/" + props.user.id,
                    myProps: { email: props.user.id }
                }}><FontAwesomeIcon icon={faEdit} /><i className="fa-solid fa-pen" /></NavLink>
            </td>
        </>
    )
}