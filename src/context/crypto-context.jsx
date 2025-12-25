import {createContext, useState, useEffect, useContext} from 'react';
import {fetchCryptoAssets, fetchCryptoData} from "../api.js";
import {percentDifference} from "../utils.js";

export const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
})

function mapAssets(assets, serverCoins) {
    return assets.map(asset => {
        const coin = serverCoins.find((c) => c.id === asset.id);
        return {
            grow: asset.price < coin.price,
            growPercent: percentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            name: coin.name,
            ...asset,
        };
    })
}

export function CryptoContextProvider({children}) {
    const [loading, setLoading] = useState(false);
    const [cryptoData, setCryptoData] = useState([]);
    const [cryptoAssets, setCryptoAssets] = useState([]);

    useEffect(() => {
        async function preload() {
            try {
                setLoading(true);
                const { result: serverCoins } = await fetchCryptoData();
                const assets = await fetchCryptoAssets();

                setCryptoAssets(mapAssets(assets, serverCoins));
                setCryptoData(serverCoins);
            } catch (err) {
                console.error("Ошибка в CryptoContext:", err);
            } finally {
                setLoading(false);
            }
        }
        preload();
    }, []);

    function addAsset(newAsset) {
        setCryptoAssets(prev => mapAssets([...prev, newAsset], cryptoData));
    }

    return (
        <CryptoContext.Provider value={{ loading, crypto: cryptoData, assets: cryptoAssets , addAsset }}>
            {children}
        </CryptoContext.Provider>
    )
}

export function useCrypto(){
    return useContext(CryptoContext);
}