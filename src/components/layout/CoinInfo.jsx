import {Flex, Typography} from "antd";

export default function CoinInfo({coin}) {
    return (
        <Flex align='center'>
            <img
                src={coin.icon}
                alt={coin.name}
                style={{width: 50, height: 50, marginRight: 20}}
            />
            <Typography.Title level={2} style={{margin: 0}}>
                ({coin.symbol}) {coin.name}
            </Typography.Title>
        </Flex>
    )
}