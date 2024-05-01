export const templateHTMLResetPassword = (otp: string) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Mã đặt lại mật khẩu</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
        }
        .email-container {
          max-width: 600px;
          margin-left: 80px;
          padding: 20px;
        }
        .thank-you {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        .order-details {
          margin-top: 20px;
          margin-bottom: 15px;
        }
        .item {
          margin-bottom: 15px;
          padding-left: 20px; /* Thụt lề so với cha của nó */
          border-left: 2px solid #333; /* Đường kẻ bên trái để làm nổi bật */
        }
        .item p {
          margin: 5px 0;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <h1>HAHAMOVE</h1>
        <p class="thank-you">Chào bạn,</p>
        <p>Bạn đã yêu cầu đặt lại mật khẩu. Làm ơn nhập mã dưới đây trong vòng 10p </p>
        <p class="order-details">Mã của bạn là: </p>
        <p class="thank-you">${otp}</p>
       
        <p class="order-details">Nếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này và liên hệ ngay cho chúng tôi.</p>
    
        <p class="order-details">Xin chân thành cảm ơn bạn và chúc bạn một ngày tốt lành!</p>
      </div>
    </body>
    </html>
    `
}