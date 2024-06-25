export default function formatCurrencyVND(number) {
  // Chuyển số thành chuỗi
  let numberString = number.toString();
  // Sử dụng regex để thêm dấu phẩy phân cách nhóm ba chữ số
  let formattedNumber = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // Thêm đơn vị tiền tệ "VNĐ"
  return formattedNumber + ' VNĐ';
}
