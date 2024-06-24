import React, {useEffect, useState} from 'react';
import {
    Button,
    Checkbox,
    DatePicker,
    Divider,
    Flex,
    Form,
    Input,
    InputNumber,
    Modal,
    Radio,
    Select,
    Table,
    Upload
} from 'antd';
import data from "./vehicle_data.json"
import dept_info from "./dept.json"
import { UploadOutlined } from '@ant-design/icons';



const columns = Object.keys(data[0]).map(key => ({
    title: key, dataIndex: key,
}));



const props= {
    name: 'file',
    action: '',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {

    },
};

const carData = [
    {
        make: 'Toyota',
        models: ['Camry', 'Corolla', 'Prius', 'RAV4']
    },
    {
        make: 'Honda',
        models: ['Accord', 'Civic', 'CR-V', 'Pilot']
    },
    {
        make: 'Ford',
        models: ['F-150', 'Escape', 'Explorer', 'Mustang']
    },
    {
        make: 'Chevrolet',
        models: ['Silverado', 'Equinox', 'Malibu', 'Tahoe']
    },
    {
        make: 'BMW',
        models: ['3 Series', '5 Series', 'X3', 'X5']
    },
    {
        make: 'Mercedes-Benz',
        models: ['C-Class', 'E-Class', 'GLC', 'GLE']
    },
    {
        make: 'Audi',
        models: ['A3', 'A4', 'Q5', 'Q7']
    },
    {
        make: 'Nissan',
        models: ['Altima', 'Maxima', 'Rogue', 'Sentra']
    },
    {
        make: 'Volkswagen',
        models: ['Jetta', 'Passat', 'Tiguan', 'Atlas']
    }
];



const CreateForm = ({visible, setVisible, preSelect}) => {
    const [form] = Form.useForm();
    const [vehicleTypeOtherInput, setVehicleTypeOtherInput] = useState(true);
    const [models, setModels] = useState([]);
    const [customMake, setCustomMake] = useState('');
    const [customModel, setCustomModel] = useState('');
    const [showCustomMake, setShowCustomMake] = useState(false);
    const [showCustomModel, setShowCustomModel] = useState(false);
    const handleMakeChange = (value) => {
        if (value === 'Other') {
            setShowCustomMake(true);
            setModels([]);
        } else {
            setShowCustomMake(false);
            const selectedMake = carData.find(car => car.make === value);
            setModels(selectedMake ? selectedMake.models : []);
        }
    };

    const handleModelChange = (value) => {
        if (value === 'Other') {
            setShowCustomModel(true);
        } else {
            setShowCustomModel(false);
        }
    };




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

    const vehicleTypeRadioGroupOnChange = ({ target: { value } }) => {
        if (value === "Other") {
            setVehicleTypeOtherInput(true);
        } else {
            setVehicleTypeOtherInput(false);
        }
    };

    return (<Modal
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
                    defaultValue={preSelect}
                    style={{width: 400}}
                    allowClear
                    options={dept_info}
                />
            </Form.Item>

            <Form.Item
                label="VIN Number"
                name="VIN Number"
                rules={[{required: true, message: "Please input the VIN Number!"}]}>
                <Input/>
            </Form.Item>


            <Form.Item
                label="License Plate Number"
                name="License Plate Number"
                rules={[{required: true, message: "Please input the License Plate Number!"}]}>
                <Input/>
            </Form.Item>

            <Form.Item
                label="Vehicle Year"
                name="Vehicle Year"
                rules={[{required: true, message: "Please input the Vehicle Year!"}]}>
                <DatePicker picker="year"/>
            </Form.Item>


            <Form.Item
                label="Vehicle Make"
                name="make"
                rules={[{ required: true, message: "Vehicle Make!" }]}>
                <Select
                    defaultValue={"Other"}
                    style={{ width: 400 }}
                    allowClear
                    onChange={handleMakeChange}
                    options={[...carData.map(car => ({ value: car.make, label: car.make })), { value: 'Other', label: 'Other' }]}
                />
            </Form.Item>

            {showCustomMake && (
                <Form.Item
                    label="Manually Enter Vehicle Make"
                    name="customMake"
                    rules={[{ required: true, message: "Please input your custom make!" }]}>
                    <Input
                        style={{ width: 400 }}
                        value={customMake}
                        onChange={e => setCustomMake(e.target.value)}
                    />
                </Form.Item>
            )}

            <Form.Item
                label="Vehicle Model"
                name="model"
                rules={[{ required: true, message: "Please select the model!" }]}>
                <Select
                    defaultValue={"Other"}
                    style={{ width: 400 }}
                    allowClear
                    onChange={handleModelChange}
                    options={[...models.map(model => ({ value: model, label: model })), { value: 'Other', label: 'Other' }]}
                    disabled={!models.length && !showCustomMake}
                />
            </Form.Item>

            {showCustomModel && (
                <Form.Item
                    label="Manually Enter Custom Model"
                    name="customModel"
                    rules={[{ required: true, message: "Please input your custom model!" }]}>
                    <Input
                        style={{ width: 400 }}
                        value={customModel}
                        onChange={e => setCustomModel(e.target.value)}
                    />
                </Form.Item>
            )}


            <Form.Item name="Vehicle Type" label="Vehicle Type">
                <Radio.Group onChange={vehicleTypeRadioGroupOnChange} defaultValue={"Other"}>
                    <Radio value="Cars/MPV">Cars/MPV</Radio> <br></br>
                    <Radio value="Pick-Up/Van/Small Truck">Pick-Up/Van/Small Truck</Radio><br></br>
                    <Radio value="Large Trucks">Large Trucks</Radio><br></br>
                    <Radio value="Passenger Van">Passenger Van</Radio><br></br>
                    <Radio value="Buses">Buses</Radio><br></br>
                    <Radio value="Tractor/Trailor">Tractor/Trailor</Radio><br></br>
                    <Radio value="Electric Vehicles">Electric Vehicles</Radio><br></br>
                    <Radio value="Other">Other</Radio><br></br>
                </Radio.Group>
                {vehicleTypeOtherInput && <Input></Input>}
            </Form.Item>

            <Form.Item name="Estimated MPG" label="Estimated MPG">
                <InputNumber min={0} max={100} defaultValue={30}/> MPG
            </Form.Item>

            <Form.Item name="Current Vehicle Mileage" label="Current Vehicle Mileage">
                <InputNumber min={0} max={100000} defaultValue={0}/> Miles
            </Form.Item>
            <Form.Item
                label="Last Fiscal Year Total Spent on vehicle maintenance"
                name="Last Year Total Spent on vehicle maintenance"
                rules={[{
                    required: true, message: "Please input the Last Year Total Spent on vehicle maintenance!"
                }]}>
                <InputNumber min={0} max={999999} defaultValue={0} addonBefore={"$"}/>
            </Form.Item>

            <Form.Item name="Vehicle Fuel type" label="Vehicle Fuel type">
                <Radio.Group>
                    <Radio value="Gasoline">Gasoline</Radio><br></br>
                    <Radio value="Diesel">Diesel</Radio><br></br>
                    <Radio value="Hybrid">Hybrid</Radio><br></br>
                    <Radio value="Electric (non-hybrid)">Electric (non-hybrid)</Radio><br></br>
                    <Radio value="Hydrogen Fuel Cell">Hydrogen Fuel Cell</Radio><br></br>
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
                label="Total cost of Last Fiscal Year’s fuel"
                name="Total cost of LY Fuel"
                rules={[{required: true, message: "Please input the Total cost of Last Fiscal Year’s fuel!"}]}>
                <InputNumber min={0} max={999999} defaultValue={0} addonBefore={"$"}/>
            </Form.Item>



            <Form.Item
                label="Upload a copy of the last vehicle maintenance report"
                name="Upload a copy of the last vehicle maintenance report"
                rules={[{required: true, message: "Please input the Vehicle Maintenance Report Attached!"}]}>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Form.Item>




        </Form>
    </Modal>);
};


const RegList = ({currentDept}) => {
    const [visible, setVisible] = useState(false);
    const [usedata, setUsedata] = useState();

    const [modalDept, setModalDept] = useState("All Departments");

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
        selectedRowKeys, onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    // filter the data based on current department
    useEffect(() => {
        console.log("currentDept", currentDept);

        if (currentDept == "All Departments") {
            setUsedata(data);
        } else {
            const upd_data = data.filter((item) => item.Department == currentDept);
            setUsedata(upd_data);
        }
    }, [data, currentDept]);


    return (<div style={{marginLeft: '40px', marginRight: '40px'}}>

        <Divider></Divider>

        <Flex direction="horizontal" gap="small" justify="center" align="center">
            <div>
                <Button
                    type="primary"
                    onClick={() => {
                        setVisible(true);
                    }}
                >
                    Add
                </Button>
                {
                    modalDept &&
                    <CreateForm
                        visible={visible} // visibility flag
                        setVisible={setVisible} // setVisible function as parameter
                        preSelect={currentDept}
                    />
                }

            </div>
            <div>
                {!hasSelected && <Button type="primary" disabled danger>
                    Remove
                </Button>}

                {hasSelected && <Button type="primary" danger>
                    Remove
                </Button>}
            </div>
            <div>
                <Button type="default">
                    Download Department Vehicle Data File
                </Button>
            </div>
        </Flex>
        <br/>The remove option is inactivated for demo purposes
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
                        {hasSelected ? `Selected record ID ${selectedRowKeys.toString()}` : ''}
        </span>
            </div>
            {data.hasOwnProperty("length") &&
                <Table rowSelection={rowSelection} columns={columns} dataSource={usedata}/>}
        </div>
    </div>);
};
export default RegList;