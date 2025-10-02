import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

// BACKEND URL
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8001';
const API = `${API_BASE}/api`;

// THIS IS WHERE OUR WEBSITE IS HOSTED, [ generate share links relative to this url ]
const MY_HOMEPAGE_URL = API_BASE?.match(/-([a-z0-9]+)\./)?.[1]
  ? `https://${API_BASE?.match(/-([a-z0-9]+)\./)?.[1]}.previewer.live`
  : window.location.origin;

console.log(`MY_HOMEPAGE_URL: ${MY_HOMEPAGE_URL}`);

const POPULAR_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
  { code: 'MXN', name: 'Mexican Peso', flag: '🇲🇽' },
];

const Home = () => {
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const convertCurrency = async (fromCurr, toCurr, amt) => {
    if (!amt || parseFloat(amt) <= 0) {
      setConvertedAmount(null);
      setRate(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API}/currency/convert`, {
        from_currency: fromCurr,
        to_currency: toCurr,
        amount: parseFloat(amt)
      });

      if (response.data.success) {
        setConvertedAmount(response.data.converted_amount);
        setRate(response.data.rate);
      } else {
        setError(response.data.error || 'Conversion failed');
      }
    } catch (e) {
      console.error('Conversion error:', e);
      setError('Failed to convert currency. Please check your API key.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      convertCurrency(fromCurrency, toCurrency, amount);
    }, 300);

    return () => clearTimeout(timer);
  }, [amount, fromCurrency, toCurrency]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-blue-600 mb-2">Currency Converter</h1>
          <p className="text-gray-600 text-lg">Real-time exchange rates at your fingertips</p>
        </div>

        {/* Main Converter Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
          {/* From Currency */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">From</label>
            <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100">
              {POPULAR_CURRENCIES.map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => setFromCurrency(curr.code)}
                  className={`flex-shrink-0 py-3 px-3 min-w-[70px] rounded-xl border-2 transition-all duration-200 transform hover:scale-105 ${
                    fromCurrency === curr.code
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{curr.flag}</div>
                  <div className="text-xs font-semibold text-gray-700">{curr.code}</div>
                </button>
              ))}
            </div>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              className="w-full px-6 py-4 text-3xl font-semibold border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Swap Button */}
          <div className="flex justify-center my-4">
            <button
              onClick={swapCurrencies}
              className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:rotate-180"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          {/* To Currency */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">To</label>
            <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100">
              {POPULAR_CURRENCIES.map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => setToCurrency(curr.code)}
                  className={`flex-shrink-0 py-3 px-3 min-w-[70px] rounded-xl border-2 transition-all duration-200 transform hover:scale-105 ${
                    toCurrency === curr.code
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{curr.flag}</div>
                  <div className="text-xs font-semibold text-gray-700">{curr.code}</div>
                </button>
              ))}
            </div>
            <div className="w-full px-6 py-4 text-3xl font-semibold bg-gray-50 border-2 border-gray-200 rounded-xl text-blue-600">
              {loading ? (
                <span className="text-gray-400">Converting...</span>
              ) : convertedAmount !== null ? (
                <span>{convertedAmount.toLocaleString()}</span>
              ) : (
                <span className="text-gray-400">0.00</span>
              )}
            </div>
          </div>

          {/* Rate Display */}
          {rate && !error && (
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-center text-sm text-gray-600">
                <span className="font-semibold">Exchange Rate:</span> 1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-200">
              <p className="text-center text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <a
            href="https://fenado.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
          >
            <span>Powered by</span>
            <img src="https://fenado.ai/fenado-logo.png" className="w-6 h-6 rounded object-contain" alt="Fenado Logo" />
            <span className="font-semibold">Fenado.ai</span>
          </a>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
