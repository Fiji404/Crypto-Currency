import autoComplete from '@tarekraafat/autocomplete.js';
import cryptoCurrencies from '../../data/cryptoCurrencies.json';

export const findCurrencyInputEl = document.querySelector('.find-options__input-currency');
const searchCurrencyBtn = document.querySelector('.find-options__search-currency-btn');

export const initializeSearchLogic = () => {
    const autoCompletionConfig = {
        selector: '.find-options__input-currency',
        placeHolder: 'Find your crypto',
        data: {
            src: cryptoCurrencies.names,
        },
        resultItem: {
            highlight: true,
            element: (item, data) => {
                item.addEventListener('click', () => {
                    const clickedCryptoCurrencyName = data.value;
                    findCurrencyInputEl.value = clickedCryptoCurrencyName;
                });
            },
        },
    };

    const autoCompletion = new autoComplete(autoCompletionConfig);
};

findCurrencyInputEl.addEventListener('input', ({ target: { value } }) => {
    searchCurrencyBtn.classList.toggle('visible', !!value);
});
