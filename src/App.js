import React, {useEffect, useState} from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

const BASE_URL = 'https://api.exchangeratesapi.io/latest';

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFrom, setAmountInFrom] = useState(true);

  let toAmount, fromAmount
  if (amountInFrom) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    fromAmount = amount / exchangeRate;
    toAmount = amount;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then(resp => resp.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
        console.log(data)
      })
  }, []);

  useEffect(() => {
    if(fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(resp => resp.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFrom(true);
  }

  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFrom(false);
  }

  return (
    <div className="App">
      <span className="pure-menu-heading">Currency Converter</span>
      <form className="pure-form">
        <CurrencyRow 
          currencyOptions={currencyOptions}
          selectedCurrency = {fromCurrency}
          onChangeCurrency = {e => setFromCurrency(e.target.value)}
          amount = {fromAmount}
          onChangeAmount = {handleFromAmountChange}
          />
        <div className="equally">=</div>
        <CurrencyRow 
          currencyOptions={currencyOptions}
          selectedCurrency = {toCurrency}
          onChangeCurrency = {e => setToCurrency(e.target.value)}
          amount = {toAmount}
          onChangeAmount = {handleToAmountChange}
          />
      </form>
    </div>
  );
}

export default App;
