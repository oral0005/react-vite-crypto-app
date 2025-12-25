import {Flex, Select, Space, Typography, Divider, Form, Input, InputNumber, Button, Result} from 'antd'
import {useRef, useState} from "react"
import { useCrypto } from "../context/crypto-context.jsx"
import CoinInfo from "./layout/CoinInfo.jsx";

export default function AddAssetForm({onClose}) {
    const { crypto, addAsset } = useCrypto();
    const [coin, setCoin] = useState(null);
    const [form] = Form.useForm();
    const [submitted,setSubmitted] = useState(false)
    const assetRef = useRef();

    if(submitted){
        return (
            <Result
                status="success"
                title="Successfully added"
                subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price} to your assets.`}
                extra={[
                    <Button type="primary" key="console" onClick={onClose}>
                        Close
                    </Button>,
                ]}
            />
        )
    }

    if (!coin) {
        return (
            <Select
                style={{ width: '100%' }}
                placeholder="Select coin"
                optionLabelProp="label"
                options={crypto.map((coin) => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                onSelect={(v) => setCoin(crypto.find(c => c.id === v))}
                optionRender={(option) => (
                    <Space>
                        <img
                            style={{ width: 20 }}
                            src={option.data.icon}
                            alt={option.data.label}
                        />
                        {option.data.label}
                    </Space>
                )}
            />
        )
    }

    function onFinish(values) {
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
        }
        assetRef.current = newAsset
        console.log(newAsset)
        setSubmitted(true)
        addAsset(newAsset)
    }

    function handleAmountChange(value) {
        const price = form.getFieldValue('price');
        form.setFieldsValue({
            total: (value * coin.price).toFixed(3),
        })
    }

    function handlePriceChange(value) {
        const amount = form.getFieldValue('amount');
        form.setFieldsValue({
            total: +(value * amount).toFixed(3),
        })
    }

    return (
        <>
            <CoinInfo coin={coin}/>
            <Divider />
            <Form
                form ={form}
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 10 }}
                style={{ maxWidth: 600 }}
                initialValues={{
                    price: coin.price.toFixed(3),
                    total: coin.total,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[{ required: true, type: 'number', message: 'is not valid' }]}
                >
                    <InputNumber onChange={handleAmountChange} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                >
                    <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Total"
                    name="total"
                >
                    <InputNumber disabled style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Asset
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}