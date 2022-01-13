import React from "react";
import Nav from "./nav/Nav";
import Main from "./main/Main";
import Footer from "./footer/Footer";

const App = () => (
    <div className="d-flex flex-column" style={{backgroundColor: "#84a4c2", minHeight: "100vh"}}>
        <div className="page-content">
            <Nav/>
            <Main />
        </div>
        <Footer />
    </div>
)

export default App;