export const getPriceTable = (priceData) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let prevPrice = priceData[0][1];

  const priceTable = priceData.map((data, index) => {
    if (index !== 0) {
      // Calculate price change and change rate
      const price = data[1];
      const dailyChange = price - prevPrice;
      const dailyChangeRate = ((dailyChange / prevPrice) * 100).toFixed(2);
      prevPrice = price;
      // Get date of price
      const newDate = new Date(data[0]);
      const date = newDate.toDateString().split(" ").slice(1).join(" ")
      const day = days[newDate.getDay()];

      return { price, dailyChange, dailyChangeRate, date, day }
    } else {
      return null;
    }

  })

  return priceTable.slice(1).reverse();
}