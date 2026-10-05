# Kiểm thử

## Kiểm tra tự động đã chạy

Chạy `npm test`: **15 kiểm thử đạt**.

- Dữ liệu rỗng và minh họa hợp lệ; xuất/nhập JSON giữ dữ liệu.
- Từ chối khóa ngoại bị thiếu, ID trùng, giờ đảo ngược, điểm ngoài khoảng và URL không an toàn.
- Xóa môn học dọn đúng dữ liệu liên quan.
- Trùng giờ bao gồm trường hợp bao nhau, không tính hai buổi nối tiếp.
- Ngày nhuận, chuyển năm và đầu tuần đúng.
- Điểm tự đánh giá và ưu tiên lần lưu mới nhất cùng ngày.
- Escape HTML trong nội dung người dùng.
- Lịch tuần có 7 ngày, tháng có 42 ô, tìm kiếm/lọc đúng.
- Tất cả màn hình kết xuất được khi dữ liệu rỗng.

`npm run build` đã tạo thành công bản tĩnh. Đã kiểm tra cú pháp JavaScript và đường dẫn module/tài nguyên của bản build.

## Giới hạn xác minh

Môi trường tạo dự án chưa chạy được trình duyệt kiểm thử do thiếu browser binary và tải browser không thành công. Vì vậy chưa xác minh trực quan hoặc thao tác end-to-end trên trình duyệt thật. Các kiểm thử view kiểm tra HTML tạo ra, không thay thế kiểm thử trình duyệt.

## Checklist chạy trên máy của bạn

Chạy `npm start`, mở http://localhost:4173 bằng Chrome/Edge/Firefox hiện đại:

- [ ] Mở ứng dụng lần đầu, tạo môn học, tải lại trang và kiểm tra dữ liệu còn.
- [ ] Nạp dữ liệu minh họa; chuyển tuần/tháng, về hôm nay, tìm và lọc.
- [ ] Tạo buổi học lặp, sửa một buổi, đánh dấu hoàn thành, xóa một buổi.
- [ ] Tạo hai lịch trùng giờ và kiểm tra hộp xác nhận.
- [ ] Lưu ghi chú có tiếng Việt, nhiều dòng và hai liên kết.
- [ ] Thử URL `javascript:` và kiểm tra không cho lưu.
- [ ] Tạo/sửa/xóa đánh giá, kiểm tra điểm tổng hợp trên thẻ môn học.
- [ ] Xuất JSON, xóa dữ liệu, nhập lại JSON và kiểm tra các bản ghi.
- [ ] Nhập JSON hỏng và đảm bảo dữ liệu hiện tại không thay đổi.
- [ ] Xóa môn học và kiểm tra các lịch, ghi chú, đánh giá liên quan đã mất.
- [ ] Thử màn hình điện thoại; bảng lịch cuộn ngang trong khung.
- [ ] Thao tác Tab, Shift+Tab, Enter và Escape trong hộp thoại.
- [ ] Deploy GitHub Pages và kiểm tra đường dẫn tài nguyên dưới tên repository.
