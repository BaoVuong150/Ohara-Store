# KẾ HOẠCH TRIỂN KHAI HỆ THỐNG THƯƠNG MẠI ĐIỆN TỬ TOÀN DIỆN (WEB + MOBILE)
## TẬN DỤNG CƠ SỞ HẠ TẦNG MODULAR MONOLITH & FEATURE-BASED ARCHITECTURE

Tài liệu này vạch ra kế hoạch phân rã công việc (WBS) chi tiết để phát triển hệ thống Thương mại điện tử (E-commerce) hoàn chỉnh 100% ở cả phiên bản Web và Mobile App, sử dụng chung hạ tầng Backend và chia sẻ tối đa logic mã nguồn ở Frontend.

---

## 🗺️ DANH SÁCH CÁC EPIC & PHÂN RÃ CHI TIẾT CÁC TASK

---

### EPIC 1: PROJECT INITIALIZATION & INFRASTRUCTURE EXPANSION
* **Mục đích:** Khởi tạo môi trường lập trình đồng bộ cho 3 đầu sản phẩm: Backend API, Frontend Web và Mobile App (React Native), thiết lập kết nối cơ sở dữ liệu và cơ chế chia sẻ tài nguyên.
* **Mục tiêu đạt được:** 3 dự án chạy độc lập nhưng dùng chung mô hình dữ liệu (Types/DTOs) và kết nối mượt mà tới các dịch vụ Docker (PostgreSQL, Redis).

#### Task 1.1: Khởi tạo mã nguồn dự án mới (Scaffolding)
* **Mục đích:** Nhân bản bộ khung starter kit hiện tại sang dự án thương mại điện tử sạch sẽ bằng file tự động hóa `init-new-project.js`.
* **Mục tiêu:** Tạo ra 3 folder dự án độc lập: `backend/`, `frontend-web/`, và dự án di động mới `mobile-app/` (sử dụng Expo React Native).

#### Task 1.2: Thiết lập Schema Database PostgreSQL & EF Core Migrations
* **Mục đích:** Thiết kế và liên kết các thực thể dữ liệu chính của E-commerce bao gồm: Khách hàng, Sản phẩm, Biến thể (Variants), Giỏ hàng, Đơn hàng, và Giao dịch.
* **Mục tiêu:** Chạy thành công các câu lệnh Entity Framework Migrations, tạo lập đầy đủ các bảng dữ liệu có khóa ngoại tĩnh (không liên kết thực thể chéo module) trên PostgreSQL.

#### Task 1.3: Cấu hình phân vùng kết nối Redis cho E-commerce
* **Mục đích:** Thiết lập phân vùng lưu trữ cache cho các tác vụ tốc độ cao: quản lý session đăng nhập, lưu trữ giỏ hàng tạm thời, và tạo khóa phân tán (Distributed Lock) khi trừ hàng tồn kho.
* **Mục tiêu:** Redis kết nối ổn định với cờ chống sập kết nối (`abortConnect=false`), thiết lập các tiền tố key (`auth:`, `cart:`, `inventory:`) rõ ràng.

---

### EPIC 2: DYNAMIC PRODUCT CATALOG (QUẢN LÝ DANH MỤC & SẢN PHẨM ĐA BIẾN THỂ)
* **Mục đích:** Xây dựng hệ thống quản lý danh mục và hiển thị sản phẩm hỗ trợ nhiều thuộc tính tùy chọn (ví dụ: quần áo có size, màu sắc; đồ điện tử có dung lượng, phiên bản).
* **Mục tiêu đạt được:** Người dùng có thể lọc, tìm kiếm và chọn đúng biến thể sản phẩm mong muốn ở cả Web và Mobile.

#### Task 2.1: Xây dựng Database đa biến thể sản phẩm (Product & Variant Schema)
* **Mục đích:** Cho phép một sản phẩm có nhiều cấu hình khác nhau, mỗi cấu hình có giá tiền và số lượng hàng tồn kho (SKU) riêng biệt.
* **Mục tiêu:** Thiết lập các bảng quan hệ: `Products` (thông tin chung) -> `ProductVariants` (Size, Màu sắc, Giá bán, Hàng trong kho) -> `ProductImages` (bộ sưu tập ảnh riêng cho từng màu sắc).

#### Task 2.2: Xây dựng Backend API tìm kiếm, lọc và phân trang sản phẩm
* **Mục đích:** Cung cấp API tốc độ cao hỗ trợ tìm kiếm từ khóa, lọc theo danh mục, giá tiền, thương hiệu và phân trang dữ liệu (Pagination).
* **Mục tiêu:** Viết các câu lệnh truy vấn LINQ tối ưu, trả về DTO danh sách sản phẩm kèm theo thông tin biến thể dưới dạng JSON trong thời gian dưới 50ms.

#### Task 2.3: Phát triển giao diện Showroom & Chi tiết sản phẩm trên Web
* **Mục đích:** Xây dựng giao diện giới thiệu sản phẩm đẹp mắt, responsive và trang chi tiết sản phẩm cho phép người dùng bấm chọn đổi Size/Màu sắc để cập nhật giá tiền tương ứng.
* **Mục tiêu:** Sử dụng Ant Design phối hợp Tailwind CSS tạo hiệu ứng chuyển ảnh mượt mà, vô hiệu hóa các biến thể đã hết hàng trong kho.

#### Task 2.4: Phát triển màn hình Danh sách & Chi tiết sản phẩm trên Mobile App (React Native/Expo)
* **Mục đích:** Chuyển đổi và tối ưu hóa giao diện danh sách và chi tiết sản phẩm phù hợp với màn hình điện thoại di động (sử dụng màn hình cuộn mượt mà FlatList).
* **Mục tiêu:** Tái sử dụng các DTOs và API Service của Web, thiết kế thao tác vuốt chọn ảnh sản phẩm trực quan, thời gian load trang dưới 100ms.

---

### EPIC 3: SHOPPING CART & INVENTORY MANAGEMENT (GIỎ HÀNG VÀ KIỂM SOÁT HÀNG TỒN)
* **Mục đích:** Xây dựng hệ thống lưu trữ giỏ hàng động và kiểm soát hàng tồn kho thời gian thực, ngăn chặn tuyệt đối tình trạng quá bán (hết hàng nhưng khách vẫn thanh toán được).
* **Mục tiêu đạt được:** Giỏ hàng tự động đồng bộ giữa các thiết bị khi đăng nhập, hệ thống tự động khóa hàng tồn kho tạm thời khi người dùng tiến hành thanh toán.

#### Task 3.1: Xây dựng logic Giỏ hàng lai (Hybrid Cart Logic)
* **Mục đích:** Cho phép khách vãng lai (chưa đăng nhập) thêm hàng vào giỏ (lưu ở LocalStorage/RAM), khi họ đăng nhập thành công, hệ thống tự động gộp giỏ hàng này vào tài khoản của họ lưu ở Database/Redis.
* **Mục tiêu:** Thiết lập các API: `POST /cart/sync` để gộp giỏ hàng, `POST /cart/add` và `DELETE /cart/remove` hoạt động tức thì.

#### Task 3.2: Xây dựng cơ chế khóa hàng tồn kho bằng Redis Distributed Lock (Redlock)
* **Mục đích:** Khi 2 người dùng cùng bấm nút thanh toán sản phẩm duy nhất còn lại, hệ thống sử dụng Redis Lock để chỉ cho phép 1 người trừ kho thành công, người thứ hai sẽ nhận thông báo hết hàng.
* **Mục tiêu:** Đảm bảo tính nhất quán dữ liệu tuyệt đối dưới tải cao, không bao giờ xảy ra lỗi âm số lượng tồn kho trong database.

#### Task 3.3: Phát triển giao diện Giỏ hàng tương tác (Interactive Cart UI)
* **Mục đích:** Hiển thị danh sách sản phẩm đã chọn, cho phép tăng giảm số lượng trực tiếp với hiệu ứng cập nhật giá tiền tức thì (Optimistic Updates) ở cả Web và Mobile.
* **Mục tiêu:** Người dùng không cảm thấy độ trễ mạng khi thay đổi số lượng sản phẩm; hiển thị cảnh báo nếu số lượng chọn vượt quá hàng tồn kho thực tế.

---

### EPIC 4: ORDER LIFECYCLE & CHECKOUT SYSTEM (ĐƠN HÀNG & QUY TRÌNH CHECKOUT)
* **Mục đích:** Quản lý toàn bộ vòng đời của một đơn hàng từ lúc khởi tạo, vận chuyển, giao thành công, cho đến hủy đơn hoặc hoàn tiền.
* **Mục tiêu đạt được:** Khách hàng theo dõi được hành trình đơn hàng; Admin/Nhà kho quản lý được luồng đóng gói và bàn giao vận chuyển.

#### Task 4.1: Phát triển API xử lý Đơn hàng & Tính toán hóa đơn (Checkout Engine)
* **Mục đích:** Tiếp nhận đơn đặt hàng, tính toán tổng tiền hàng, áp dụng mã giảm giá (Vouchers), cộng phí vận chuyển (Shipping Fee) và thuế VAT.
* **Mục tiêu:** Tạo bản ghi đơn hàng ở trạng thái `Pending` (Chờ thanh toán) trong bảng `Orders` và khóa tạm thời các sản phẩm trong bảng `ProductVariants`.

#### Task 4.2: Xây dựng màn hình CMS quản lý đơn hàng dành cho Admin (Receptionist/Admin Dashboard)
* **Mục đích:** Cho phép tiếp tân hoặc chủ cửa hàng xem danh sách đơn hàng mới, cập nhật trạng thái đơn hàng (Đã xác nhận -> Đang đóng gói -> Đang giao -> Đã giao).
* **Mục tiêu:** Giao diện dạng bảng (Table) kết hợp bộ lọc trạng thái thông minh, hỗ trợ xuất hóa đơn PDF và gửi email tự động cho khách khi đổi trạng thái đơn.

#### Task 4.3: Phát triển giao diện Theo dõi Đơn hàng dành cho khách hàng (Order Tracking UI)
* **Mục đích:** Khách hàng có thể vào lịch sử mua hàng để xem tiến trình đơn hàng của mình trực quan dạng dòng thời gian (Timeline).
* **Mục tiêu:** Đồng bộ trạng thái từ Backend về giao diện Web & Mobile ngay lập tức; cho phép khách bấm nút "Hủy đơn" nếu đơn hàng chưa chuyển sang trạng thái giao.

---

### EPIC 5: SECURE PAYMENT GATEWAY INTEGRATION (TÍCH HỢP CỔNG THANH TOÁN ONLINE)
* **Mục đích:** Tích hợp cổng thanh toán trực tuyến (VNPay/MoMo cho thị trường nội địa, Stripe cho quốc tế) để tự động hóa khâu thu tiền.
* **Mục tiêu đạt được:** Hệ thống tự động xác nhận đơn hàng đã thanh toán thành công ngay khi khách chuyển khoản xong mà không cần tiếp tân kiểm tra tài khoản ngân hàng.

#### Task 5.1: Xây dựng API tích hợp cổng thanh toán & Bộ kiểm tra chữ ký (Signature Verifier)
* **Mục đích:** Tạo link thanh toán gửi về cho client, đồng thời viết các API tiếp nhận cuộc gọi ngược tự động (Webhooks/IPN) từ cổng thanh toán để cập nhật trạng thái đơn hàng.
* **Mục tiêu:** Sử dụng mã hóa SHA256 để đối chiếu chữ ký số bảo mật gửi kèm từ cổng thanh toán, ngăn chặn hacker giả mạo kết quả thanh toán.

#### Task 5.2: Xây dựng giao diện chọn cổng thanh toán & Điều hướng (Payment UI)
* **Mục đích:** Cung cấp màn hình cho khách hàng chọn phương thức thanh toán (COD, VNPay, MoMo, Thẻ tín dụng) và thực hiện chuyển hướng an toàn sang app/web thanh toán.
* **Mục tiêu:** Thiết lập các trang trung gian `PaymentCallbackPage` trên cả Web và Mobile để đón khách quay lại sau khi thanh toán, hiển thị thông báo kết quả giao dịch rõ ràng.

---

### EPIC 6: MOBILE DEVICE SYNC & ADVANCED NOTIFICATIONS (ĐỒNG BỘ DI ĐỘNG & THÔNG BÁO)
* **Mục đích:** Tối ưu hóa ứng dụng di động chạy bằng React Native, đồng bộ dữ liệu thời gian thực và gửi thông báo trực tiếp lên màn hình điện thoại (Push Notifications).
* **Mục tiêu đạt được:** Ứng dụng di động hoạt động mượt mà như app gốc (Native App), tự động gửi thông báo nhắc nhở khi đơn hàng đang trên đường giao.

#### Task 6.1: Đồng bộ hóa toàn bộ Services & Zustand Store từ Web sang Mobile
* **Mục đích:** Thiết lập cấu hình kết nối API dùng chung cho Mobile, đảm bảo các cơ chế đính kèm token tự động và silent refresh hoạt động hoàn hảo trên môi trường di động.
* **Mục tiêu:** Tái sử dụng 100% cấu hình [axiosClient.ts](file:///c:/workplace/ASPdotNET/New%20folder/frontend/src/config/axiosClient.ts) và [useAuthStore.ts](file:///c:/workplace/ASPdotNET/New%20folder/frontend/src/features/auth/store/useAuthStore.ts) sang dự án Mobile mà không bị lỗi tương thích.

#### Task 6.2: Tích hợp hệ thống gửi thông báo đẩy (Expo Push Notifications / FCM)
* **Mục đích:** Đăng ký thiết bị di động của người dùng với máy chủ thông báo và lưu trữ mã định danh (Push Token) của họ vào database.
* **Mục tiêu:** Backend tự động kích hoạt gửi thông báo đẩy lên điện thoại khách hàng khi tiếp tân bấm đổi trạng thái đơn hàng trên CMS Admin.
