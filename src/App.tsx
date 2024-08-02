// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState<number>(1);
  const [fromCur, setFromCur] = useState<string>("EUR");
  const [toCur, setToCur] = useState<string>("USD");
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    try {
      const convert = async () => {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setTotal(data.rates[toCur]);
      };
      if (fromCur === toCur) return setTotal(amount);
      convert();
    } catch (error) {
      setError(error.message);
    }
  }, [amount, fromCur, toCur]);

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select value={fromCur} onChange={(e) => setFromCur(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCur} onChange={(e) => setToCur(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {total?.toFixed(2)} {toCur}
      </p>
    </div>
  );
}
