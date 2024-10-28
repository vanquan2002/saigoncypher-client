function formatCurrency(amount) {
  return Number(amount)?.toLocaleString("vi-VN") + "đ";
}

export { formatCurrency };
