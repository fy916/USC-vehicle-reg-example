import React from 'react';
import {Cascader, ConfigProvider} from 'antd';

import dept_info from "./dept.json"
// data:
// Herman Ostrow School of Dentistry of USC
// Keck Medicine of USC
// Alfred E. Mann School of Pharmacy and Pharmaceutical Sciences
// Annenberg School for Communication and Journalism
// Dornsife College of Letters Arts and Sciences
// Gould School of Law
// Iovine and Young Academy
// Kaufman School of Dance
// Leonard Davis School of Gerontology
// Leventhal School of Accounting
// Marshall School of Business
// Price School of Public Policy
// Roski School of Art and Design
// Rossier School of Education
// School of Architecture
// School of Cinematic Arts
// School of Dramatic Arts
// Suzanne Dworak-Peck School of Social Work
// Thornton School of Music
// Viterbi School of Engineering
// Libraries




const options = dept_info;











const onChange = (value) => {
    console.log(value);
};
const DeptSelector = ({setCurrentDept}) => (
        <Cascader defaultValue={["All Departments"]} options={options} onChange={(value, selectedOptions) => {setCurrentDept(value); console.log(value)}}
                  style={{ width: '50%' }}
        />


);
export default DeptSelector;