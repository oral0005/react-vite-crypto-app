import {cryptoAssets, cryptoData} from './data.js'

export function fetchCryptoData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoData)
        }, 1000)
    })
}

export function fetchCryptoAssets() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoAssets)
        },1000)
    })
}

