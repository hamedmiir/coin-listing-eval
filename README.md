# 📊 Coin Listing Prediction Model

A simple and practical model for predicting trading volume and user engagement in the first week after listing a new coin on a cryptocurrency exchange.

## 🎯 Purpose

This tool helps product managers make data-driven decisions about:
- Resource allocation
- Infrastructure planning
- Marketing budget
- Liquidity requirements

## 🧮 Model Formula
```
V_w1 = (MAU × C_r × A_t × H_f) + (N_u × A_tn)
```

**Where:**
- `MAU`: Monthly Active Users of the exchange
- `C_r`: Conversion Rate (2-5% typical)
- `A_t`: Average trade size from existing users
- `H_f`: Hype Factor (1.0-2.0)
- `N_u`: New users from GTM campaign
- `A_tn`: Average trade size from new users

## 🚀 Features

- Real-time volume prediction
- Daily breakdown for week 1
- User contribution analysis
- Strategic recommendations
- Interactive parameter adjustment

## 💻 Tech Stack

- React 18
- Recharts (data visualization)
- Tailwind CSS (styling)
- Lucide React (icons)

## 🛠️ Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/coin-listing-predictor.git

# Install dependencies
cd coin-listing-predictor
npm install

# Run the app
npm start
```

## 📱 Usage

1. Input your exchange's MAU
2. Set conversion rate based on historical data
3. Adjust hype factor based on market sentiment
4. Enter GTM campaign expectations
5. Review predictions and recommendations

## 📊 Example

With 100K MAU, 3% conversion, 5M average trade, 1.2 hype factor, and 1.5K new users:
- **Predicted Volume**: 21 Billion Tomans
- **Active Traders**: 3,600+
- **Total Transactions**: 12,600+

## 🎓 Model Logic

The model separates two independent sources:
1. **Existing Users**: Current active users influenced by hype
2. **New Users**: Users acquired through listing campaign

## 📄 License

MIT License - Feel free to use and modify

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or feedback, please open an issue.

---

Made with ❤️ for better crypto exchange product decisions