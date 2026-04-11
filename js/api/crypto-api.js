export async function getCrypto() {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=5");

    const data = await res.json();

    return data.map(c => ({
        asset_id: c.symbol.toUpperCase(),
        price_usd: c.current_price
    }));
}