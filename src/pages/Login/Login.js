import { useState } from "react";
import "./Login.css";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleUserLogin } from "../../reducer/loginSlice";

function Login() {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        let {loading, error, userData} = useSelector((state)=>state.login)
        const dispatch = useDispatch();
        // const [loading, setLoading] = useState(false)
        // const [error, setError] = useState("null");
        const navigate = useNavigate();

   async function loginUser(e){
        e.preventDefault();

        const result = await dispatch(handleUserLogin({username, password}));

        if(handleUserLogin.fulfilled.match(result)){
          navigate("/home");
        }

      //   setLoading(true);
      //   fetch('https://dummyjson.com/auth/login', {
      //       method: 'POST',
      //       headers: { 'Content-Type': 'application/json' },
      //       body: JSON.stringify({
      //           username: username,
      //           password: password,
      //           email:    email,
      //           // expiresInMins: 30, //optional, defaults to 60
      //       })
      //   })
      // .then(res => res.json())
      //   .then(data => {
      //     console.log({data});
      //       if(data.message === "User already exists"){
      //         setError(data.message);
      //       } else {
      //         setUserData(data);
      //         navigate("/home");
      //       }
      //   }).catch((error) => {
      //     setError(error.message || "Something went wrong.  Try again");
      //   }
      // ).finally(() => {
      //   setLoading(false);
      // }
    
        if(userData){
          navigate("/home");
        }
    }

    function handleUsernameChange(e){
        setUsername(e.target.value);
    }

    function handlePasswordChange(e){
        setPassword(e.target.value);
    }

    // function handleEmailChange(e){
    //   setEmail(e.target.value);
    // }

    return (
        <div className="login-container">
      <h2>Login to Your Account</h2>
      <form onSubmit={loginUser}>
        <div>
          <label>Username</label>
          <input type="text" placeholder="Enter your username" value={username} onChange={handleUsernameChange} />
        </div>
        {/* <div>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange}/>
        </div> */}
        <div>
          <label>Password</label>
          <input type="password" placeholder="Enter your password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Submit {loading ? <ClipLoader size={20} color={"white"} /> : ""} </button>
        <span style={{color: "red", fontSize: "15px"}}>{error} </span>
      </form>
      <div className="forgot-password">
        <a href="#">Forgot your password?</a>
      </div>
    </div>
    )
}

export default Login;