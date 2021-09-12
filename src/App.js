import axios from 'axios';
import { useContext, createContext, useState, useRef } from 'react'
import { 
  BrowserRouter as Router, 
  Switch,
  Route, 
  Link,
  Redirect,
  useRouteMatch,
  useHistory,
  useLocation
} from 'react-router-dom'

import Home from './Home.js'
import ToDoPage from './TodoPage.js'

import { Input, Button } from 'antd';

import './App.css';

export default function Header() {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <div className="container">
            <div className="row">
              <div className="col-8 mx-auto row p-4">
                <div>
                  <MenuLink 
                    activeOnlyWhenExact={true}
                    to="/"
                    label="Home"
                  />
                </div>
                <div className="mx-2">
                  <MenuLink 
                    to="/to-do"
                    label="To Do"
                  />
                </div>
                <div className="ml-auto">
                  <MenuLink 
                    to="/login"
                    label="Login"
                  />
                </div>
              </div>
            </div>
          </div>
          <Switch>
            <PrivateRoute exact path="/">
              <Home />
            </PrivateRoute>
            <PrivateRoute path="/to-do">
              <ToDoPage />
            </PrivateRoute>
            <Route path="/login">
              <LoginPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  )
}

function MenuLink({ label, to, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });

  return (
    <div style={{color: match ? "gray" : "blue"}}>
      <Link to={to}>{label}</Link>
    </div>
  );
}

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth()
  return (
    <Route 
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect 
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

const optionsAuth = {
  isAuthenticated: false,
  signin(cb) {
    optionsAuth.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    optionsAuth.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const authContext = createContext()

function ProvideAuth({ children }) {
  const auth = useProvideAuth()
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  )
}

function useAuth() {
  return useContext(authContext)
}

function useProvideAuth() {
  const [user, setUser] = useState(null)
  
  const signin = async (data, cb) => {
    const response = await axios.post('http://dev.nexttruck.draketechdev.ca:3600/api/login', data)
    return optionsAuth.signin(() => {
      setUser({...response.user})
      cb()
    })
  }

  const signout = cb => {
    return optionsAuth.signout(() => {
      setUser(null)
      cb()
    })
  }

  return {
    user,
    signin,
    signout
  }
}

function LoginPage() {
  let history = useHistory()
  let location = useLocation()
  let auth = useAuth()
  const emailRef = useRef()
  const passwordRef = useRef()

  let { from } = location.state || { from: { pathname: '/' }}
  let login = () => {
    let data = {
      email: emailRef.current.state.value,
      password: passwordRef.current.state.value,
    }
    auth.signin(data, () => {
      history.replace(from)
    })
  } 

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 mx-auto p-4">
          <h1>Iniciar sesión</h1>
          <Input 
            placeholder="Correo electrónico"
            type="email"
            className="p-2"
            defaultValue="oscarfamado@gmail.com"
            ref={emailRef}
          />
          <Input.Password 
            placeholder="Contraseña"
            className="mt-2 p-2"
            defaultValue="oscar123"
            ref={passwordRef}
          />
          <Button 
            onClick={login}
            className="mt-3 ml-auto d-block"
            type="primary"
          >
            Iniciar sesión
          </Button>
        </div>
      </div>
    </div>
  )
}