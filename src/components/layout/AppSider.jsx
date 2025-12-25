import {Layout, Card, Statistic, List, Typography, Spin, Tag} from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import {capitalize} from "../../utils.js";
import {CryptoContext} from "../../context/crypto-context.jsx";
import {useContext} from "react";

const siderStyle = {
    padding: '1rem',
};

export default function AppSider() {
    const { assets, loading } = useContext(CryptoContext);

    return (
        <Layout.Sider width="25%" style={siderStyle}>
            {assets.map(asset => (
                <Card key={asset.id} style={{ marginBottom: '1rem' }}>
                    <Statistic
                        title={capitalize(asset.id)}
                        value={asset.totalAmount}
                        precision={2}
                        valueStyle={{color: asset.grow ? '#3f8600' : '#cf1322'}}
                        prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                        suffix="$"
                    />
                    <List
                        size={'small'}
                        dataSource={[
                            {title: 'Total Profit', value: asset.totalProfit.toFixed(2), withTag: true},
                            {title: 'Asset amount', value: asset.amount, isPlain: true},
                        ]}
                        renderItem={item => (
                            <List.Item>
                                <span>{item.title}</span>
                                <span>
                                    {item.withTag && (
                                        <Tag color={asset.grow ? 'green' : 'red'}>
                                            {asset.growPercent}%
                                        </Tag>
                                    )}
                                    {item.isPlain ? (
                                        item.value
                                    ) : (
                                        <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                                            {item.value} $
                                        </Typography.Text>
                                    )}
                                </span>
                            </List.Item>
                        )}
                    />
                </Card>
            ))}
        </Layout.Sider>
    )
}