export const templateEmailRejectDriver = (fullName, reason) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>KẾT QUẢ XÉT DUYỆT TÀI XẾ Shipmate</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333333;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #cccccc;
                border-radius: 10px;
                background-color: #f9f9f9;
            }
            .header {
                text-align: center;
                padding: 10px 0;
                border-bottom: 1px solid #cccccc;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                color: #2c3e50;
            }
            .content {
                padding: 20px;
            }
            .content p {
                margin: 0 0 10px;
            }
            .footer {
                text-align: center;
                padding: 10px 0;
                border-top: 1px solid #cccccc;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>KẾT QUẢ XÉT DUYỆT TÀI XẾ TỪ SHIPMATE</h1>
            </div>
            <div class="content">
                <b>Gửi ${fullName},</b>
                <p>Yêu cầu xét duyệt tài xế của bạn bị từ chối. Với lý do như sau: </p>
                <i>${reason}</i>
                <p>Vui lòng kiểm tra lại yêu cầu gửi xét duyệt và cập nhật lại.</p>
            </div>
            <div class="footer">
                <p>Shipmate App</p>
            </div>
        </div>
    </body>
    </html>
    
    `;
}