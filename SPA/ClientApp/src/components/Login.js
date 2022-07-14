import React, { Component } from 'react';

export class Login extends Component {
    constructor(props) {
        super(props);
    }
    
    render(){
        return (
            <main style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <form onSubmit={this.props.handleLogin} style={{width: "80%"}} autoComplete="on" name={"login"}>
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card bg-dark text-white" style={{borderRadius: 1+"rem"}}>
                                    <div className="card-body p-5 text-center">
                                        <div className="mb-md-5 mt-md-4 pb-5">
                                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                            <p className="text-white-50 mb-5">Please enter your login and password!</p>
                                            <div className="form-outline form-white mb-4">
                                                <input type="email" id="typeEmailX" className="form-control form-control-lg"
                                                    value={this.props.email}
                                                    onChange={this.props.handleEmail}/>
                                                <label className="form-label" htmlFor="typeEmailX">Email</label>
                                            </div>
                                            <div className="form-outline form-white mb-4">
                                                <input type="password" id="typePasswordX" className="form-control form-control-lg"
                                                    value={this.props.password}
                                                    onChange={this.props.handlePassword}
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