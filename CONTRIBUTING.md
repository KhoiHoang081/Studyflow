# Đóng góp

1. Fork/clone dự án, tạo nhánh `feat/ten-tinh-nang` hoặc `fix/ten-loi`.
2. Giữ giao diện tiếng Việt và mô hình module hiện có.
3. Đặt quy tắc nghiệp vụ ở `src/core`, thành phần dùng lại ở `src/components`, màn hình ở `src/views`.
4. Viết kiểm thử cho thay đổi nghiệp vụ có rủi ro, chạy `npm test` và `npm run build`.
5. Thử trên desktop/mobile, kiểm tra dữ liệu cũ và khả năng xuất/nhập.
6. Mở pull request mô tả vấn đề, cách sửa và kiểm tra đã làm.

Không commit `dist`, dữ liệu học tập cá nhân, API key hoặc mật khẩu. Khi đổi schema cần thiết kế migration, không âm thầm xóa dữ liệu người dùng.
