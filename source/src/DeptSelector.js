import React from 'react';
import {Cascader, ConfigProvider} from 'antd';
import dept_info from "./dept.json"

const options = dept_info;

const onChange = (value) => {
    console.log(value);
};
const DeptSelector = ({setCurrentDept}) => (
    <Cascader defaultValue={["All Departments"]} options={options} onChange={(value, selectedOptions) => {
        setCurrentDept(value);
        console.log(value)
    }}
              style={{width: '50%'}}
    />


);
export default DeptSelector;