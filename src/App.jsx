import { useEffect, useState } from 'react'
import './App.css'
import Loading from './components/Loading';

function App() {
  const [query, setQuery] = useState(''); 
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const VITE_STOCK_MARKET_API = import.meta.env.VITE_STOCK_MARKET_API;
  
  useEffect(() => {
    const list_stock = ["AAPL", "GOOGL", "MSFT"];
    
    const fetchData = async() => {
      setLoading(true);

      if(!VITE_STOCK_MARKET_API) {
        console.error("API Token Not Found");
        return;
      }

      try {
        const promises = list_stock.map(symbol => 
          fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${VITE_STOCK_MARKET_API}`)
            .then(res => res.json())
            .then(data => ({
              symbol: symbol,
              price: data.c,
              change: data.dp
            }))
        );

        const results = await Promise.all(promises);
        setStocks(results);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
    }
    }
    fetchData();
  }, [VITE_STOCK_MARKET_API]);

  const filteredStock = stocks.filter(stock => {
    if(!query) return true;
    return stock.symbol.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <>
      {loading && (
        <Loading/>
      )}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <input 
          type="text"
          placeholder='Search Symbol Stock' 
          className='m-10 p-1 border-[1.5px] rounded-lg'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          />

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          symbol
                      </th>
                      <th scope="col" className="px-6 py-3">
                          price
                      </th>
                      <th scope="col" className="px-6 py-3">
                          change %
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {error ? (
                    <tr>
                      <td colSpan="3" className="text-center text-red-500 font-bold">No Data Found</td>
                    </tr>
                  ) : (
                    filteredStock.length > 0 ? 
                      filteredStock.map((stock, idx) => (
                      <tr key={idx} className="hover:shadow-md border">
                        <td className="px-6 py-3 hover:font-semibold transition-all duration-300">{stock.symbol}</td>
                        <td className="px-6 py-3">{stock.price}</td>
                        <td className={`px-6 py-3 ${stock.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {stock.change}%
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="3" className="text-center text-red-500 font-bold">No Data Found</td>
                      </tr>
                    )
                    
                  )}
              </tbody>
          </table>
      </div>
    </>
  )
}

export default App
