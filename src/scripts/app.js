import { initializeSearchLogic, findCurrencyInputEl } from './components/searchCurrency';
const searchCurrencyFormEl = document.querySelector('.search-currency-form');
const cryptoCurrenciesContainer = document.querySelector('.searched-crypto-currencies');

searchCurrencyFormEl.addEventListener('submit', e => {
    e.preventDefault();
    const providedCryptoCurrencyName = findCurrencyInputEl.value.toLowerCase();
    getCryptoCurrencyDetails(`https://api.coincap.io/v2/assets/${providedCryptoCurrencyName}`);
});

const getCryptoCurrencyDetails = async url => {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Provide correct name or select one from the list');
        const data = await res.json();
        renderCryptoCurrency(data);
    } catch (err) {
        console.log(err.message);
    }
};

const renderCryptoCurrency = ({ data }) => {
    const HTMLTemplateCurrencyElement = `
    <section class="crypto-currency-details">
    <h2 class="crypto-currency-details__currency">${data.name}</h2>
    <p class="crypto-currency-details__info">Rank: ${data.rank}</p>
    <p class="crypto-currency-details__info">
        Price: ${Number(data.priceUsd).toFixed(5)}$
    </p>
    <p class="crypto-currency-details__info">
        Market cap: ${Number(data.marketCapUsd).toFixed()}$
    </p>
    <p class="crypto-currency-details__info">
        24h change: <span class="crypto-currency-details__change">${Number(data.changePercent24Hr).toFixed()}%</span>
    </p>
</section>
    `;
    cryptoCurrenciesContainer.insertAdjacentHTML('beforeend', HTMLTemplateCurrencyElement)
};

window.addEventListener('DOMContentLoaded', () => {
    initializeSearchLogic();
});
