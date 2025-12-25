import { cryptoAssets, cryptoData } from './data.js'

const API_KEY = 'S9+8n04iW+6a/MwtopaMSSAkZMCl2cteBOHfjfmwyoE=';
const BASE_URL = 'https://openapiv1.coinstats.app/coins';

export async function fetchCryptoData() {
    try {
        if (!navigator.onLine) {
            throw new Error('No internet connection');
        }

        const response = await fetch(BASE_URL, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'X-API-KEY': API_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.warn("Используются резервные данные (data.js):", error.message);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(cryptoData);
            }, 500);
        });
    }
}

export function fetchCryptoAssets() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoAssets)
        }, 500)
    })
}