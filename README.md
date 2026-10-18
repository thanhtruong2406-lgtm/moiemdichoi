# Lá thư hẹn hò 20/10 💌

Website HTML + CSS + JavaScript, không cần cài Node.js hay React.

## Chạy thử

Mở `index.html` bằng Chrome hoặc dùng VS Code → Live Server. Bấm phong bì để mở, chọn 3 mục, rồi bấm gửi.

## QUAN TRỌNG: Nhận kết quả về email của bạn

1. Mở file `config.js`.
2. Sửa `recipientEmail: "YOUR_EMAIL@gmail.com"` thành email **của bạn**.
3. Đăng website lên Netlify, Vercel hoặc GitHub Pages (xem dưới).
4. Để kích hoạt FormSubmit, bạn có thể gửi một lựa chọn thử từ website. FormSubmit sẽ gửi **email kích hoạt** đến hộp thư của bạn; kiểm tra cả Spam và xác nhận liên kết kích hoạt. Sau khi kích hoạt, các lựa chọn mới được chuyển đến email của bạn.
5. Gửi link website công khai cho bạn gái. Kiểm tra bằng một lần gửi thử, xác minh rằng email được nhận, trước khi gửi link chính thức.

**Chưa điền email và kích hoạt thì dữ liệu không được gửi đi.** Nếu gửi gặp lỗi website thông báo, không hiện thành công giả.

FormSubmit là dịch vụ bên thứ ba, thông tin người chọn gửi cho dịch vụ để chuyển tới email của bạn. Không nhập mật khẩu hoặc dữ liệu nhạy cảm vào ghi chú.

## Đăng nhanh lên Netlify

1. Vào https://app.netlify.com/drop
2. Kéo **thư mục `thu_tinh_20_10` đã giải nén** vào khu vực tải lên.
3. Chờ Netlify tạo link có dạng `https://...netlify.app`.
4. Test link trên điện thoại và làm bước kích hoạt email như trên.

## Thay hình ảnh

- Thiệp chính: `assets/thiep-20-10.png`.
- Cú Trên Cây: hiện dùng ảnh thật từ bài báo Phụ Nữ, ảnh tải bằng liên kết nên cần mạng, nguồn https://www.phunuonline.com.vn/quan-ca-phe-nhu-khu-rung-mat-xanh-giua-long-tphcm-a1504897.html
- Mango Brew: ảnh cà phê **minh họa**, chưa xác minh được ảnh chi nhánh yêu cầu. Trong `index.html`, tìm `bg-mango` và thay thuộc tính `src` bằng URL ảnh thật hoặc đường dẫn `assets/mango-brew.jpg` sau khi bạn bổ sung ảnh.
- Ảnh bạn gái: có thể thay ảnh mục `Quán em thích` bằng hình riêng; tránh đăng ảnh riêng tư khi chưa được đồng ý.

## Lưu ý về địa điểm

- Mango Brew được xác minh ở 618/35 Âu Cơ, khu Bảy Hiền (không phải Bình Thạnh): https://mangobrewcafe.com/lien-he
- Cú Trên Cây: 262 Ung Văn Khiêm, Bình Thạnh, theo https://www.foody.vn/ho-chi-minh/cu-tren-cay-garden-coffee-plants

## Sửa thời gian / câu chữ

Mở `index.html` và thay nội dung muốn sửa. Email nhận định dạng bảng với giờ đón, món ăn, quán cà phê, câu trả lời Yes/No và lời nhắn.

## Công nghệ

HTML/CSS/Vanilla JS, responsive, CSS animations, tuỳ chọn âm thanh tạo bằng Web Audio API, gửi qua FormSubmit Ajax.
