function formatCurrency(amount) {
  return Number(amount)?.toLocaleString("vi-VN") + " VND";
}

export { formatCurrency };
