import React, {useState} from 'react'
import './style.css'
// import loginImg from '../../assests/login-background.jpg'
import {icon} from '../../assests/icons/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'
import { validateUser } from '../../api/auth'
import { authDataKey, authTokenKey } from '../../configuration'


const Login = () => {

    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const onSubmit = async (e) => {
        // history.push('/add-dispatch')
        e.preventDefault();
        setIsLoading(true)
        await validateUser(email, password)
        .then((res) => {
            const {success, userData} = res;
            if(success) {
                setIsLoading(false);
                window.sessionStorage.setItem(authTokenKey, userData.userToken)
                window.sessionStorage.setItem(authDataKey, userData)
                history.push('/dashboard')
            }
            else {
                setError(res.message);
                setIsLoading(false);
            }
        })
    }

    return (
        <div className="login-container">
            <div className="container">
                <div className="row login-section">
                    <div className="col-lg-5 col-md-5 col-sm-12  login-form-sec">
                        <h3>Sign in.</h3>
                        <form className="login-form">
                            <div className="container login-input-sec">
                                <input type="text" className="form-control login-input" placeholder="Email" onChange={(t) => setEmail(t.target.value)}/>
                                <input type="password" className="form-control login-input" placeholder="Password" onChange={(t) => setPassword(t.target.value)}/> 
                                <button className="btn btn-primary login-btn" type="submit" onClick={onSubmit} disabled={isLoading}>
                                    Sign In
                                    {isLoading && <FontAwesomeIcon icon={faCircleNotch} spin style={{ marginLeft: 10 }}/>}
                                </button>                       
                            </div>                             
                            
                            <p className="login-error-text">{error}</p>
                        </form>
                    </div>
                    <div className="col-lg-7 col-md-7 col-sm-12 login-image-sec p-0">
                        <img className="login-image" src={icon} alt="login-back" />
                        <div className="login-image-text-sec">
                            <h2>Welcome to Ajna Flower</h2>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Login;
