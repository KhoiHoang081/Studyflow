# Xử lý sự cố

| Hiện tượng | Cách xử lý |
|---|---|
| Mở `index.html` thấy trang trống | Chạy `npm start`, mở `http://localhost:4173`; không dùng `file://`. |
| `npm` không được nhận diện | Cài Node.js 20+ rồi mở terminal mới. |
| Cổng 4173 đang dùng | Dừng server cũ hoặc đổi biến môi trường PORT. PowerShell: `$env:PORT=4174; npm start`. |
| Pages 404 | Kiểm tra Source = GitHub Actions, workflow deploy đã xanh, URL đúng tên repository. |
| Workflow đầu tiên lỗi Pages | Bật Pages trong Settings rồi chạy lại workflow. |
| `origin already exists` | Dùng `git remote -v` kiểm tra, sau đó `git remote set-url origin URL_MOI` nếu cần. |
| Push bị từ chối do repository có commit khác | Không force push. Clone repository về thư mục mới, chép các file dự án vào đó, commit và push. |
| Sang máy khác không thấy lịch | Xuất JSON ở máy cũ rồi nhập ở máy mới. Không có đồng bộ tự động. |
| Không lưu được dữ liệu | Kiểm tra quyền lưu trình duyệt, dung lượng và chế độ riêng tư; xuất bản sao lưu. |
| Có thông báo dữ liệu lỗi | Tải dữ liệu gốc để giữ bản phục hồi, sau đó nhập backup hợp lệ. Chỉ xóa nếu chấp nhận mất dữ liệu hiện có. |
| Nhập JSON thất bại | Dùng đúng file do StudyFlow xuất. File phải dưới 5 MB và schema version 1. |
| Tài liệu báo không có quyền | Sửa quyền chia sẻ ở Drive/OneDrive. StudyFlow chỉ lưu URL. |
| Muốn sửa cả chuỗi lịch lặp | Bản hiện tại sửa từng buổi độc lập; chưa có chỉnh sửa toàn chuỗi. |

Không commit bản sao lưu chứa ghi chú cá nhân lên repository public. Khi báo lỗi, hãy dùng dữ liệu giả và che thông tin riêng tư.
