import './assets/scss/reset-css.scss';
import './assets/scss/style-class.scss';
import './assets/scss/grid.scss';
import './assets/scss/variables.scss';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import{
  BrowserRouter as Router,
  Route,
  // Link,
  Switch
} from 'react-router-dom'

import HeaderBar from './components/Guest/HeaderBar';
import Footer from './components/Guest/Footer';
import Home from './pages/Guest/Home';
import Login from './pages/Guest/Login';
import About from './pages/Guest/About';
import Blog from './pages/Guest/Blog';
import Contact from './pages/Guest/Contact';
import Register from './pages/Guest/Register';
//import LogResBgPage from './components/share/LogResBgPage';
import Sale from './pages/Guest/Sale';

import AdminHome from './pages/Admin/AdminHome';
import DetailProduct from './pages/Guest/DetailProduct';
import Cart from './pages/Guest/Cart';
import Buy from './pages/Guest/Buy';
import GuestOrders from './pages/Guest/Order/GuestOrders';
import GuestOrderDetail from './pages/Guest/Order/GuestOrderDetail/GuestOrderDetail';
import { useDispatch, useSelector } from 'react-redux';

import Cookies from 'js-cookie';
import { useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { loginCheckLocalAsync } from './redux/actions/authAction';

function App() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const userCurrent = useSelector(state => state.auth.currentUser); 
  let dispatch = useDispatch();
  useEffect(()=>{   
      if(Cookies.get('X-Auth-Token')){
          const decoded = jwt_decode(Cookies.get('X-Auth-Token'));
          dispatch(loginCheckLocalAsync())
          //dispatch(loginCheckLocalAsync(localStorage.getItem("userCurrentId")))
      }
  },[])

  useEffect(()=>{   
   console.log("userCurrent",userCurrent)
},[userCurrent])

  return (
    <Router>
        <Switch>
            {
              userCurrent ?
              (userCurrent.roles[0] == "Admin" || userCurrent.roles[0] == "Saler") && isLogin == true ?
              <Route path="/admin" component={AdminHome}/> : ''
              : ''
            }
            {/* <Route path="/admin" component={AdminHome}/> */}

            <div className="App">
              <HeaderBar/>
              <Route exact path="/" component={Home}/>
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Register}/>
              <Route path="/about" component={About}/>
              <Route path="/blog" component={Blog}/> 
              <Route path="/contact" component={Contact}/>
              <Route path="/sale" component={Sale}/>
              <Route path="/product-detail/:id" component={DetailProduct}/>
              <Route path="/buy" component={Buy}/>
              
              {
                isLogin ?  <Route path="/cart" component={Cart}/>: ''
              }

              {
                isLogin ?  <Route path="/orders/:customerId" component={GuestOrders}/>: ''
              }
              {
                isLogin ? <Route path="/orders-/:id" component={GuestOrderDetail}/> : ''
              }
              
            
              <ToastContainer
                position="bottom-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />

              <Footer/>
            </div>
        </Switch>
    </Router>
   
  );
}

export default App;
