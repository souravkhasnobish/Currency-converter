import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});


export const currencyConverter = (fromCurrency,toCurrency,amount) => {
  return api.get(`/pair/${fromCurrency}/${toCurrency}/${amount}`)
}