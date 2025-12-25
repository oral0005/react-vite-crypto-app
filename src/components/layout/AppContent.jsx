import {Layout, Typography} from "antd";
import {useCrypto} from "../../context/crypto-context.jsx";
import PortfolioChart from "./PortfolioChart.jsx";
import AssetsTable from "./AssetsTable.jsx";

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem',
};

export default function AppContent() {
    const { assets } = useCrypto();

    const portfolioValue = assets
        .reduce((acc, asset) => acc + asset.totalAmount, 0)
        .toFixed(2);

    return (
        <Layout.Content style={contentStyle}>
            <Typography.Title level={3} style={{textAlign: 'left', color: '#fff'}}>
                Portfolio: {portfolioValue}$
            </Typography.Title>
            <PortfolioChart/>
            <AssetsTable/>
        </Layout.Content>
    )
}