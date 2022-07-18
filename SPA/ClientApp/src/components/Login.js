import React, { Component } from 'react';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this)
    }

    async handleLogin(e) {
        e.preventDefault();
        // did this because of autofill, onChange can't track it
        const email = document.getElementById("typeEmailX").value.trim()
        const password = document.getElementById("typePasswordX").value.trim()
        if (!email || !password) {
            return;
        }
        const data = {
            Email: email,
            Password: password
        };

        const response = await fetch("user/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            this.addAlert(await response.text(), "danger")
            return
        }
        let result = await response.json()
        sessionStorage.setItem(this.props.tokenName, result);
        this.props.login()
        this.props.history.push("/");
    }
    
    render(){
        return (
            <main style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <form onSubmit={this.handleLogin} style={{width: "80%"}} autoComplete="on" name={"login"}>
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card bg-dark text-white" style={{borderRadius: 1+"rem"}}>
                                    <div className="card-body p-5 text-center">
                                        <div className="mb-md-5 mt-md-4 pb-5">
                                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                            <p className="text-white-50 mb-5">Please enter your login and password!</p>
                                            <div className="form-outline form-white mb-4">
                                                <input type="email" id="typeEmailX" className="form-control form-control-lg"/>
                                                <label className="form-label" htmlFor="typeEmailX">Email</label>
                                            </div>
                                            <div className="form-outline form-white mb-4">
                                                <input type="password" id="typePasswordX" className="form-control form-control-lg"
                                                    autoComplete="on"/>
                                                <label className="form-label" htmlFor="typePasswordX">Password</label>
                                            </div>
                                            <button className="btn btn-outline-light btn-lg px-5" type="submit" value="Post">Login</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                  </form>
            </main>
        )
    }
}