import React, {useEffect, useState} from 'react';
import {Button, Checkbox, DatePicker, Divider, Flex, Form, Input, InputNumber, Modal, Radio, Select, Table} from 'antd';
import data from "./vehicle_data.json"
import {setSelectionRange} from "@testing-library/user-event/dist/utils";
import SelectInput from "@mui/material/Select/SelectInput";

import dept_info from "./dept.json"

const columns = Object.keys(data[0]).map(key => ({
    title: key,
    dataIndex: key,
}));

const CreateForm = (props) => {
    const {visible, setVisible} = props;
    const [form] = Form.useForm();

    const handleCreate = () => {
        form
            .validateFields()
            .then((values) => {
                form.resetFields();
                // onCreate(values);
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };
    return (
        <Modal
            visible={visible}
            title="Create a new vehicle data"
            okText="Ok"
            onCancel={() => {
                setVisible(false);
            }}
            onOk={handleCreate}>


            <Form form={form} layout="vertical">
                <Form.Item
                    label="DEPARTMENT"
                    name="DEPARTMENT"
                    rules={[{required: true, message: "Please input the DEPARTMENT!"}]}>
                    <Select
                        defaultValue="Other Department"
                        style={{width: 400}}
                        allowClear
                        options={dept_info}/>
                </Form.Item>

                <Form.Item
                    label="VEHICLE LOCATION"
                    name="VEHICLE LOCATION"
                    rules={[{required: true, message: "Please input the VEHICLE LOCATION!"}]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="CONTACT PERSON"
                    name="CONTACT PERSON"
                    rules={[{required: true, message: "Please input the CONTACT PERSON!"}]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="VEH#"
                    name="VEH#"
                    rules={[{required: true, message: "Please input the VEH#!"}]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="VEHICLE CODE"
                    name="VEHICLE CODE"
                    rules={[{required: true, message: "Please input the VEHICLE CODE!"}]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="VEHICLE TYPE"
                    name="VEHICLE TYPE"
                    rules={[{required: true, message: "Please input the VEHICLE TYPE!"}]}>
                    <Input/>
                </Form.Item>


                <Form.Item
                    label="YEAR"
                    name="YEAR"
                    rules={[{required: true, message: "Please input the Vehicle Year!"}]}>
                    <DatePicker picker="year"/>
                </Form.Item>

                <Form.Item
                    label="MAKE"
                    name="MAKE"
                    rules={[{required: true, message: "Please input the MAKE!"}]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="MODEL"
                    name="MODEL"
                    rules={[{required: true, message: "Please input the MODEL!"}]}>
                    <Input/>
                </Form.Item>


                <Form.Item name="Estimated MPG" label="Estimated MPG">
                    <InputNumber min={0} max={100} defaultValue={30}/> MPG
                </Form.Item>

                <Form.Item name="CURRENT MILEAGE" label="CURRENT MILEAGE">
                    <InputNumber min={0} max={100000} defaultValue={0}/> Miles
                </Form.Item>

                <Form.Item
                    label="Last Year Total Spent on vehicle maintenance"
                    name="Last Year Total Spent on vehicle maintenance"
                    rules={[{
                        required: true,
                        message: "Please input the Last Year Total Spent on vehicle maintenance!"
                    }]}>
                    <InputNumber min={0} max={999999} defaultValue={0} addonBefore={"$"}/>
                </Form.Item>

                <Form.Item name="Fuel Type" label="Fuel Type">
                    <Radio.Group>
                        <Radio value="Gas">Gasoline</Radio>
                        <Radio value="Gas">Diesel</Radio>
                        <Radio value="Electric">Electric</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="Date of Purchase"
                    name="Date of Purchase"
                    rules={[{required: true, message: "Please input the Date of Purchase!"}]}>
                    <DatePicker/>
                </Form.Item>

                <Form.Item
                    label="Purchase Price"
                    name="Purchase Price"
                    rules={[{required: true, message: "Please input the Purchase Price!"}]}>
                    <InputNumber min={0} max={999999} defaultValue={0} addonBefore={"$"}/>
                </Form.Item>

                <Form.Item
                    label="Registration Fee"
                    name="Registration Fee"
                    rules={[{required: true, message: "Please input the Registration Fee!"}]}>
                    <InputNumber min={0} max={999999} defaultValue={0} addonBefore={"$"}/>

                </Form.Item>

                <Form.Item
                    label="Total cost of LY Fuel"
                    name="Total cost of LY Fuel"
                    rules={[{required: true, message: "Please input the Total cost of LY Fuel!"}]}>
                    <InputNumber min={0} max={999999} defaultValue={0} addonBefore={"$"}/>
                </Form.Item>

                <Form.Item
                    label="VIN #"
                    name="VIN #"
                    rules={[{required: true, message: "Please input the VIN #!"}]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="LICENSE PLATE #"
                    name="LICENSE PLATE #"
                    rules={[{required: true, message: "Please input the LICENSE PLATE #!"}]}>
                    <Input/>
                </Form.Item>


                <Form.Item
                    label="PREMIUM DUE"
                    name="PREMIUM DUE"
                    rules={[{required: true, message: "Please input the PREMIUM DUE!"}]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="REMOVE VEHICLE FROM LIST (YES)"
                    name="REMOVE VEHICLE FROM LIST (YES)">
                    <Checkbox>Select to Remove</Checkbox>
                </Form.Item>

                <Form.Item
                    label="Vehicle Maintenance Report Attached"
                    name="Vehicle Maintenance Report Attached"
                    rules={[{required: true, message: "Please input the Vehicle Maintenance Report Attached!"}]}>
                    <Input/>
                </Form.Item>


            </Form>
        </Modal>
    );
};


const RegList = ({currentDept}) => {

    const [selectionType, setSelectionType] = useState('checkbox');
    const [selectedItem, setSelectedItem] = useState([]);
    const [visible, setVisible] = useState(false);
    const [usedata, setUsedata] = useState();


    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    // filter the data based on current department
    useEffect(() => {
        console.log("currentDept", currentDept);

        if (currentDept == "All Departments") {
            setUsedata(data);
        } else {

            const upd_data = data.filter((item) => item.DEPARTMENT == currentDept);
            setUsedata(upd_data);
        }
    }, [data, currentDept]);


    return (
        <div style={{marginLeft: '40px', marginRight: '40px'}}>

            <Divider></Divider>

            <Flex direction="column" gap="small" justify="center" align="center">
                <div>
                    <Button
                        type="primary"
                        onClick={() => {
                            setVisible(true);
                        }}
                    >
                        Add
                    </Button>
                    <CreateForm
                        visible={visible} // visibility flag
                        setVisible={setVisible} // setVisible function as parameter
                    />
                </div>

                {selectedItem.length === 0 &&
                    <Button type="primary" disabled danger>
                        Delete
                    </Button>
                }

                {selectedItem.length > 0 &&
                    <Button type="primary" danger>
                        Delete
                    </Button>
                }
            </Flex>

            <Divider/>

            <div>
                <div
                    style={{
                        marginBottom: 16,
                    }}
                >

                    <span
                        style={{
                            marginLeft: 8,
                        }}
                    >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                        <br/>
                        { hasSelected? `Selected record ID ${selectedRowKeys.toString()}`: ''}
        </span>
                </div>
                {data.hasOwnProperty("length") && <Table rowSelection={rowSelection} columns={columns} dataSource={usedata}/>}
            </div>
        </div>
    );
};
export default RegList;