import { useState } from 'react';
import './App.css'
import {currencyConverter} from "./api/Postapi"

function App() {
const [amount, setAmount] = useState(0)
const [fromCurrency, setFromCurrency] = useState("USD")
const [toCurrency, setToCurrency] = useState("INR")
const [convertedAmount, setConvertedAmount] = useState(null)
const [loading, setloading] = useState(false)
  const [error, setError] = useState(null)
  
  const handleConvertCurrency = async () => {
    setloading(true)
    setError(null)
    try {
      const res = await currencyConverter(fromCurrency, toCurrency, amount);
      const { conversion_result } = await res.data
      setloading(false);
      setConvertedAmount(conversion_result)
      
    }
    catch(error) {
      setError("Error fetching conversion rate")
      console.log(error);
      
    }

    

  }

  return (
    <section className="currency-converter">
      <div className="currency-div">
        <h1>Currency Converter</h1>
        <div>
          <label htmlFor="currency-amount">
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              id="currency_amount"
            />
          </label>
        </div>

        <div className="currency-selector">
          <div>
            <label htmlFor="">
              From:
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="INR">INR</option>
                <option value="GBP">GBP</option>
                <option value="AUD">AUD</option>
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="">
              To:
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="AUD">AUD</option>
              </select>
            </label>
          </div>
        </div>

        <button
          disabled={loading || amount <= 0}
          onClick={handleConvertCurrency}
        >
          {loading ? "Converting.." : "Convert"}
        </button>

        <hr />
        {convertedAmount && (
          <div style={{textAlign:"center"}}>
            {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
          </div>
        )}

        {error && <p>{error}</p>}
      </div>
    </section>
  );
}

export default App
