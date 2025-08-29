const selFrom = document.getElementById('selFrom');
const selTo = document.getElementById('selTo');
const inpAmount = document.getElementById('inpAmount');
const inpResult = document.getElementById('inpResult');
const message = document.getElementById('message');
const searchFrom = document.getElementById('searchFrom');
const searchTo = document.getElementById('searchTo');

let currenciesList = []; // Ovdje ćemo čuvati sve valute
let predefinedCountries = [
  { countryCode: 'EU', currencyCode: 'EUR', countryName: 'Euro' },
  {
    countryCode: 'BA',
    currencyCode: 'BAM',
    countryName: 'Bosna i Hercegovina',
  },
  { countryCode: 'RS', currencyCode: 'RSD', countryName: 'Serbia' },
  { countryCode: 'US', currencyCode: 'USD', countryName: 'United States' },
  { countryCode: 'GB', currencyCode: 'GBP', countryName: 'Great Britain' },
  {
    countryName: 'Sweden',
    countryCode: 'SE',
    currencyCode: 'SEK',
    flagEmoji: '🇸🇪',
  },
];

// Popunjava `select` elemente sa opcijama
function populateSelect(selectElement, currenciesList, searchTerm = '') {
  selectElement.innerHTML = ''; // Resetujemo postojeće opcije

  // Dodajemo grupu za predefinisane valute
  const predefinedGroup = document.createElement('optgroup');
  predefinedGroup.label = 'Predefinisane valute';

  predefinedCountries.forEach(({ countryCode, currencyCode, countryName }) => {
    if (
      countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currencyCode.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      const option = document.createElement('option');
      option.value = currencyCode;
      option.innerHTML = `${getFlagEmoji(
        countryCode
      )} ${countryName} - ${currencyCode}`;
      predefinedGroup.appendChild(option);
    }
  });

  selectElement.appendChild(predefinedGroup);

  // Dodajemo ostatak valuta
  const remainingGroup = document.createElement('optgroup');
  remainingGroup.label = 'Ostale valute';

  currenciesList.forEach(({ countryCode, currencyCode, countryName }) => {
    if (
      countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currencyCode.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      const option = document.createElement('option');
      option.value = currencyCode;
      option.innerHTML = `${getFlagEmoji(
        countryCode
      )} ${countryName} - ${currencyCode}`;
      remainingGroup.appendChild(option);
    }
  });

  selectElement.appendChild(remainingGroup);
}

// Dohvata sve valute sa API-ja
function fetchCurrencies() {
  const url = 'https://restcountries.com/v3.1/all?fields=name,currencies,cca2';
  fetch(url)
    .then(res => res.json())
    .then(data => {
      let currenciesListLocal = [];

      // Dodajemo ostatak država sa API-ja
      data.forEach(country => {
        const countryCode = country.cca2;
        const countryName = country.name?.common || '';
        const currencyCode = Object.keys(country.currencies || {})[0];

        if (countryName && currencyCode) {
          currenciesListLocal.push({ countryCode, currencyCode, countryName });
        }
      });

      // Sortiramo listu po imenu države
      currenciesListLocal.sort((a, b) =>
        a.countryName.localeCompare(b.countryName)
      );

      // Čuvamo globalnu listu valuta
      currenciesList = currenciesListLocal;

      // Popunjavamo oba selecta sa svim valutama
      populateSelect(selFrom, currenciesList);
      populateSelect(selTo, currenciesList);
    })
    .catch(error => console.error('Greška prilikom učitavanja valuta:', error));
}

// Funkcija za dobijanje emoji zastave
function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

// Funkcija za obavljanje konverzije
function convertCurrency() {
  const amount = inpAmount.value || 1; // Koristi unos korisnika, ili 1 ako ništa nije unešeno
  const fromCurrency = selFrom.value;
  const toCurrency = selTo.value;

  if (!fromCurrency || !toCurrency) {
    message.innerHTML = 'Molimo odaberite valute.';
    inpResult.value = '';
    return;
  }

  // Pozivamo API za dobijanje trenutnih kurseva valuta
  const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      //Last update

      // Unix timestamp
      const timestamp = data.time_last_updated;
      const txtLastUpdate = document.getElementById('lastUpdate');
      // Kreiramo Date objekat
      const date = new Date(timestamp * 1000); // Množimo sa 1000 jer JavaScript koristi milisekunde

      // Formatiramo datum u željeni format (d.m.Y)
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}.${date.getFullYear()}`;

      txtLastUpdate.innerHTML = `Zadnja izmjena : ${formattedDate}`;

      if (data.rates[toCurrency]) {
        const rate = data.rates[toCurrency];
        const result = (amount * rate).toFixed(2);
        inpResult.innerHTML = ` ${result} <strong>${toCurrency}</strong> `; // Prikazujemo celokupnu vrednost
        message.innerHTML = `1 ${fromCurrency} = ${rate.toFixed(
          2
        )} ${toCurrency}`; // Prikazujemo samo za 1 jedinicu
      } else {
        message.innerHTML = 'Greška u dobijanju kursa za izabranu valutu.';
      }
    })
    .catch(error => {
      message.innerHTML = 'Greška pri dobijanju podataka.';
      console.error(error);
    });
}

// Pozivamo funkciju za učitavanje valuta kada se učita stranica
window.onload = fetchCurrencies();

// Dodajemo event listener za konverziju
inpAmount.addEventListener('input', convertCurrency);
selFrom.addEventListener('change', convertCurrency);
selTo.addEventListener('change', convertCurrency);

// Implementacija search funkcije
function filterCurrencies(searchTerm, selectElement) {
  populateSelect(selectElement, currenciesList, searchTerm);
}

// Dodajemo event listener za search barove
searchFrom.addEventListener('input', function () {
  const searchTerm = searchFrom.value;
  filterCurrencies(searchTerm, selFrom);
});

searchTo.addEventListener('input', function () {
  const searchTerm = searchTo.value;
  filterCurrencies(searchTerm, selTo);
});
