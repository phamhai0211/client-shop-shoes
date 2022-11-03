import React from 'react';
import './style.scss';

import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import TopNav from '../../../components/Admin/TopNav/TopNav';
import Routes from '../Routes';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Route } from 'react-router-dom';

const AdminHome = () => {
    return(
        <BrowserRouter>
            <Route render={ (props) => (
                <div className='layout'>
                    <Sidebar {...props}/>
                    <div className='layout__content'>
                        <TopNav/>
                        <div className='layout__content-main'>
                            <Routes/>
                        </div>
                    </div>

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
                </div>
            )

            }/>
        </BrowserRouter>
    )
}

export default AdminHome;