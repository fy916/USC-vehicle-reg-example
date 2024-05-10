import logo from './logo.svg';
import './App.css';
import RegList from "./List";

// import bootstrap react

import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import DeptSelector from "./DeptSelector";
import {Divider} from "antd";
import {CollectionsPage} from "./Modal_Form";


function App() {
    const [ShowModal, setShowModal] = useState("");
    const [currentDept, setCurrentDept] = useState("All Departments")

    return (
        <div className="App">
            <Container>
                <h1>Vehicle Registration Sample</h1>
                <Divider></Divider>
                <h3 style={{color:"red"}}> Please note that this is just a simple sample, I have made up the data, and the data deletion and insertion won't actually work because they are not implemented! <br/> Also the logic of the made up data may not be reasonable (car-make, model, fuel-type, maintenance cost, etc. )</h3>
                <h4>Please Select Your Department</h4>
                <DeptSelector setCurrentDept={setCurrentDept}></DeptSelector>
                <RegList currentDept = {currentDept}/>

            </Container>
        </div>
    );
}

export default App;
