import axios from "axios";

export const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export let cachedCurrencyData: Record<string, number> | null = null;
export let cachedAt = 0;

export const fetchAndCacheCurrencyData = async () => {
  const url = `${process.env.CURRENCY_API_URL}`;
  const response = await axios.get(url);

  if (response.status !== 200) {
    throw new Error(`Currency API returned status ${response.status}`);
  }

  const data = response.data.conversion_rates;
  const newCurrencyData = {
    INR: 1,
    USD: data.USD,
    AUD: data.AUD,
    EUR: data.EUR,
    CAD: data.CAD,
    CZK: data.CZK,
    DKK: data.DKK,
    HKD: data.HKD,
    ILS: data.ILS,
    JPY: data.JPY,
    KWD: data.KWD,
    MYR: data.MYR,
    NZD: data.NZD,
    NOK: data.NOK,
    PLN: data.PLN,
    QAR: data.QAR,
    SAR: data.SAR,
    SGD: data.SGD,
    ZAR: data.ZAR,
    KRW: data.KRW,
    SEK: data.SEK,
    AED: data.AED,
    GBP: data.GBP,
  };

  cachedCurrencyData = newCurrencyData;
  cachedAt = Date.now();
  return newCurrencyData;
};
