# 📈 Stock Market Dashboard

A simple stock market dashboard built with **React + Vite + TailwindCSS**.  
It fetches real-time stock data using the **Finnhub API** and displays it in a clean, responsive table.  

---

## 🚀 Features

### Core Features
- Fetch real-time stock data from Finnhub API  
- Display **symbol, price, and change %** in a table  
- Loading state  
- Error handling  

### Additional Features
- 🔍 **Search filter**: filter stock by symbol  
- 📭 **Empty state message**: shown when no data matches search  
- 🎨 **UI/UX improvements**: hover effect, responsive table design  

---

## 🛠️ Tech Stack
- [React](https://reactjs.org/)  
- [Vite](https://vitejs.dev/)  
- [TailwindCSS](https://tailwindcss.com/)  
- [Finnhub API](https://finnhub.io/)  

---

## ⚙️ Setup

1. Clone this repository
   ```bash
   git clone https://github.com/your-username/stock-market-dashboard.git
   cd stock-market-dashboard

2. Install dependencies
   ```bash
    npm install

3. Create a .env file and add your Finnhub token
   ```bash
    VITE_STOCK_MARKET_API=your_token_here

4. Run the development server
   ```bash
    npm run dev
