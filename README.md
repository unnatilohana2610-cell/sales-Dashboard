# Sales Dashboard (React + Vite)

This repository contains a minimal React + TypeScript sales dashboard that visualizes sales data from the provided mock API:
https://68d424b8214be68f8c6887f1.mockapi.io/api/eureka/tech/task/sales

Features:
- Total revenue (sum of total_price)
- Sales trends over time (monthly line chart)
- Sales distribution by region (pie chart)
- Top 5 selling products (bar chart by quantity)
- Basic filters: region, product, start date, end date

## How to run locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Open the app at `http://localhost:5173` (Vite default)

## Notes
- This project is intentionally minimal to be fast to deploy and easy to explain during interviews.
- Aggregations are done client-side; for larger datasets, move aggregation to a backend.
- Export/Download features not included in this minimal bundle but are straightforward to add (CSV, PDF snapshots).

## Files included
- `src/hooks/useSalesData.ts` — fetches and normalizes API data
- `src/utils/aggregations.ts` — helper aggregations (totalRevenue, salesByMonth, etc.)
- `src/components/*` — chart and UI components
- `README.md` — this file

## License
MIT
