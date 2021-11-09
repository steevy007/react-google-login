import React from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux'
import { login } from './redux/type/type';
import { logout } from './redux/type/type';
function App() {
  const dispatch = useDispatch()
  const isLogin = useSelector(state => state.isLogin)
  const [user,setUser]=React.useState(null)

  const button = (renderProps) => {

    return (
      <button className='btn-google' onClick={renderProps.onClick}>Login With Google</button>
    )
  }
  return (
    <>
      <div className='wrapper'>
        <div className="content">
          <div>
            {
              !isLogin && <GoogleLogin
                clientId="908793957411-o98qsgip5el55r92kbqft7uv86l3b21d.apps.googleusercontent.com"
                buttonText="Login With Google"
                onSuccess={(result) => {
                  console.log(dispatch(login(result.profileObj)))
                  setUser(result.profileObj)
                  }}
                onFailure={(err) => console.log(err)}
                cookiePolicy={'single_host_origin'}
              />
            }
          </div>
          {
            isLogin &&
            <div className="object">
              <div>
                <img src={user?user.imageUrl:''} alt="profile" />
              </div>
              <div>
                <h2>{user?user.name:''}</h2>
                <h3 style={{marginBottom:'0.5rem'}}>{user?user.email:''}</h3>
                <GoogleLogout
                  clientId="908793957411-o98qsgip5el55r92kbqft7uv86l3b21d.apps.googleusercontent.com"
                  buttonText="Logout"
                  onLogoutSuccess={(res)=>console.log('disconnected',dispatch(logout()))}
                  onFailure={(err)=>console.log(err)}
                ></GoogleLogout>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default App;
