import React from "react";
import Nav from "./nav/Nav";
import Main from "./Main";
import Footer from "./footer/Footer";
import {BrowserRouter} from "react-router-dom";

import store from "../redux/store/store";
import {Provider} from "react-redux";

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <div className="d-flex flex-column" style={{backgroundColor: "#84a4c2", minHeight: "100vh"}}>
                <div className="page-content">
                    <Nav/>
                    <Main />
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    </Provider>


)

export default App;