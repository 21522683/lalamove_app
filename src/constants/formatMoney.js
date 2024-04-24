const formatMoney = (amount) => {
    amount = parseFloat(amount).toFixed(0);
    let formattedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    formattedAmount += " VND";
  
    return formattedAmount;
}

export default formatMoney;