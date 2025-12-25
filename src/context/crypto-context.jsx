import {createContext, useState, useEffect, useContext} from 'react';
import {fetchCryptoAssets, fetchCryptoData} from "../api.js";
import {capitalize , percentDifference} from "../utils.js";

export const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
})


export function CryptoContextProvider({children}) {
    const [loading, setLoading] = useState(false);
    const [cryptoData, setCryptoData] = useState([]);
    const [cryptoAssets, setCryptoAssets] = useState([]);

    useEffect(() => {
        async function preload() {
            try {
                setLoading(true);
                const data = await fetchCryptoData(); //
                const assets = await fetchCryptoAssets(); //

                const serverCoins = data.result;

                setCryptoAssets(assets.map(asset => {
                    const coin = serverCoins.find((c) => c.id === asset.id);
                    return {
                        grow: asset.price < coin.price,
                        growPercent: percentDifference(asset.price, coin.price),
                        totalAmount: asset.amount * coin.price,
                        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                        ...asset,
                    };
                }));
                setCryptoData(serverCoins);
            } catch (err) {
                console.error("Ошибка в AppSider:", err);
            } finally {
                setLoading(false);
            }
        }
        preload();
    }, []);


    return (
        <CryptoContext.Provider value={{ loading, crypto: cryptoData, assets: cryptoAssets }}>
            {children}
        </CryptoContext.Provider>
    )

}

export default { CryptoContext };

export function useCrypto(){
    return useContext(CryptoContext);
}