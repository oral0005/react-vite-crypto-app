import { Layout, Select, Space, Button } from "antd";
import { useCrypto } from "../../context/crypto-context.jsx";
import { useState, useEffect } from "react";

const headerStyle = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

export default function AppHeader() {
    const { crypto } = useCrypto();
    const [selectOpen, setSelectOpen] = useState(false);

    useEffect(() => {
        const keypress = (event) => {
            if (event.key === '/') {
                setSelectOpen((prev) => !prev);
            }
        };
        document.addEventListener('keypress', keypress);
        return () => document.removeEventListener('keypress', keypress);
    }, []);

    const handleSelect = (value) => {
        console.log("Selected ID:", value);
    };

    return (
        <Layout.Header style={headerStyle}>
            <Select
                showSearch
                style={{ width: 250 }}
                onDropdownVisibleChange={(open) => setSelectOpen(open)}
                placeholder="Press / to search"
                optionLabelProp="label"
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={crypto.map((coin) => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                onSelect={handleSelect}
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
            <Button type="primary">Add Asset</Button>
        </Layout.Header>
    );
}