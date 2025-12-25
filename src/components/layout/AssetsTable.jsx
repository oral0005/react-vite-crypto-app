import { Table } from 'antd';
import {useCrypto} from "../../context/crypto-context.jsx";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        showSorterTooltip: { target: 'full-header' },

        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
    },
    {
        title: 'Price, $',
        dataIndex: 'price',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.amount - b.amount,

    },
];

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

export default function AssetsTable(){
    const {assets} = useCrypto()

    const data = assets.map((asset) => ({
        key: asset.id,
        name: asset.name,
        price: asset.price,
        amount: asset.amount,
    }))

    return(
        <Table columns={columns} dataSource={data} onChange={onChange} />
    )
}