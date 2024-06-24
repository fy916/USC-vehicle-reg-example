import './App.css';
import RegList from "./List";

import React, {useState} from "react";
import {Container} from "react-bootstrap";
import DeptSelector from "./DeptSelector";
import {Divider} from "antd";


function App() {
    const [currentDept, setCurrentDept] = useState("All Departments")

    return (<div className="App">
        <Container>
            <header className="banner">
                <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="Logo"/>
                <h1 className="centered-title">USC’s Fleet Management Portal</h1>
            </header>
            <div style={{height: "100px"}}></div>

            <Divider></Divider>
            <h3 style={{color: "black"}}> The following information is a mandatory requirement for all university-owned vehicles. Please note that the completion of all data fields are required in order to comply with:  USC’s Office of Risk Management and Insurance’s <a href={"https://policy.usc.edu/vehicle-driver-requirements/"} target={"_blank"}>Vehicle Driver Policy</a>, USC’s annual greenhouse gas reporting requirements, and the completion of an annual university-wide fleet assessment.</h3>
            <h4>Please Select Your Department</h4>
            <DeptSelector setCurrentDept={setCurrentDept}></DeptSelector>
            <RegList currentDept={currentDept}/>

        </Container>
    </div>);
}

export default App;
