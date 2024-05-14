# Mô Hình Phần Mềm Quản Lý Kho

## 1. Cấu Trúc Dữ Liệu Cơ Sở

### a. Bảng **Products** (Sản phẩm)
- `product_id`: int (Primary Key)
- `name`: varchar
- `description`: text
- `price`: decimal
- `unit`: varchar
- `category_id`: int (Foreign Key)

### b. Bảng **Categories** (Danh mục)
- `category_id`: int (Primary Key)
- `name`: varchar

### c. Bảng **Inventory** (Tồn kho)
- `inventory_id`: int (Primary Key)
- `product_id`: int (Foreign Key)
- `quantity`: int
- `warehouse_id`: int (Foreign Key)

### d. Bảng **Purchase_Orders** (Đơn nhập kho)
- `purchase_order_id`: int (Primary Key)
- `supplier_id`: int (Foreign Key)
- `order_date`: datetime
- `status`: varchar (e.g., 'pending', 'approved', 'received')

### e. Bảng **Purchase_Order_Details** (Chi tiết đơn nhập kho)
- `purchase_order_detail_id`: int (Primary Key)
- `purchase_order_id`: int (Foreign Key)
- `product_id`: int (Foreign Key)
- `quantity`: int
- `price`: decimal

### f. Bảng **Sales_Orders** (Đơn xuất kho)
- `sales_order_id`: int (Primary Key)
- `customer_id`: int (Foreign Key)
- `order_date`: datetime
- `status`: varchar (e.g., 'pending', 'approved', 'shipped')

### g. Bảng **Sales_Order_Details** (Chi tiết đơn xuất kho)
- `sales_order_detail_id`: int (Primary Key)
- `sales_order_id`: int (Foreign Key)
- `product_id`: int (Foreign Key)
- `quantity`: int
- `price`: decimal

### h. Bảng **Inventory_Transactions** (Giao dịch kho)
- `transaction_id`: int (Primary Key)
- `product_id`: int (Foreign Key)
- `quantity`: int
- `transaction_type`: varchar (e.g., 'import', 'export')
- `transaction_date`: datetime
- `order_id`: int (Foreign Key) - liên kết đến `Purchase_Orders` hoặc `Sales_Orders`
- `remarks`: text

### i. Bảng **Suppliers** (Nhà cung cấp)
- `supplier_id`: int (Primary Key)
- `name`: varchar
- `contact_info`: text

### j. Bảng **Customers** (Khách hàng)
- `customer_id`: int (Primary Key)
- `name`: varchar
- `contact_info`: text

### k. Bảng **Warehouses** (Kho)
- `warehouse_id`: int (Primary Key)
- `location`: varchar

## 2. Chức Năng Cụ Thể

### a. Quản lý đơn nhập kho
- **Tạo đơn nhập kho**: Form để chọn nhà cung cấp, thêm sản phẩm, số lượng và giá.
- **Duyệt đơn nhập kho**: Xác nhận đơn nhập, cập nhật trạng thái từ 'pending' sang 'approved'.
- **Nhập kho thực tế**: Khi hàng về, cập nhật trạng thái đơn nhập kho sang 'received', cập nhật số lượng tồn kho.

### b. Quản lý đơn xuất kho
- **Tạo đơn xuất kho**: Form để chọn khách hàng, thêm sản phẩm, số lượng và giá.
- **Duyệt đơn xuất kho**: Xác nhận đơn xuất, cập nhật trạng thái từ 'pending' sang 'approved'.
- **Xuất kho thực tế**: Khi hàng xuất đi, cập nhật trạng thái đơn xuất kho sang 'shipped', cập nhật số lượng tồn kho.

### c. Quản lý giao dịch kho
- **Ghi nhận giao dịch nhập/xuất kho**: Tự động ghi nhận mỗi khi có giao dịch nhập hoặc xuất kho.
- **Theo dõi lịch sử giao dịch**: Xem danh sách giao dịch, chi tiết sản phẩm, số lượng và ngày giao dịch.

## 3. Giao Diện Người Dùng (UI)

### a. Quản lý đơn nhập kho
- **Form tạo đơn nhập kho**: Nhập thông tin nhà cung cấp, sản phẩm, số lượng, giá.
- **Danh sách đơn nhập kho**: Hiển thị tất cả các đơn nhập kho với trạng thái.
- **Chi tiết đơn nhập kho**: Hiển thị thông tin chi tiết của từng đơn nhập kho.
- **Duyệt đơn nhập kho**: Tùy chọn duyệt hoặc từ chối đơn nhập kho.

### b. Quản lý đơn xuất kho
- **Form tạo đơn xuất kho**: Nhập thông tin khách hàng, sản phẩm, số lượng, giá.
- **Danh sách đơn xuất kho**: Hiển thị tất cả các đơn xuất kho với trạng thái.
- **Chi tiết đơn xuất kho**: Hiển thị thông tin chi tiết của từng đơn xuất kho.
- **Duyệt đơn xuất kho**: Tùy chọn duyệt hoặc từ chối đơn xuất kho.

### c. Quản lý giao dịch kho
- **Danh sách giao dịch kho**: Hiển thị tất cả các giao dịch nhập/xuất kho.
- **Chi tiết giao dịch kho**: Hiển thị thông tin chi tiết của từng giao dịch.

## 4. Quy Trình và Bảo Mật

### a. Quy trình nhập kho
1. Nhân viên tạo đơn nhập kho.
2. Quản lý duyệt đơn nhập kho.
3. Hàng về kho, nhân viên cập nhật trạng thái đơn nhập kho và số lượng tồn kho.

### b. Quy trình xuất kho
1. Nhân viên tạo đơn xuất kho.
2. Quản lý duyệt đơn xuất kho.
3. Hàng xuất kho, nhân viên cập nhật trạng thái đơn xuất kho và số lượng tồn kho.

### c. Bảo mật
- Phân quyền rõ ràng, chỉ có quản lý mới có quyền duyệt đơn nhập/xuất kho. Nhân viên chỉ có quyền tạo và xem đơn.

## 5. Công Nghệ và Công Cụ
- **Backend**: Node.js với Express hoặc Python với Django/Flask.
- **Frontend**: React.js hoặc Angular.
- **Database**: MySQL, PostgreSQL hoặc MongoDB.
- **Authentication**: JWT (JSON Web Tokens) để bảo vệ các API.
- **Hosting**: AWS, Heroku hoặc DigitalOcean để triển khai ứng dụng.

## Ví Dụ Cụ Thể

### a. Purchase Order Flow (Luồng đơn nhập kho)
1. **Tạo đơn nhập kho**:
   ```sql
   INSERT INTO Purchase_Orders (supplier_id, order_date, status) VALUES (1, '2024-05-14', 'pending');
   INSERT INTO Purchase_Order_Details (purchase_order_id, product_id, quantity, price) VALUES (1, 2, 100, 20.5);
 
2. **Duyệt đơn nhập kho:**:
   ```sql
   UPDATE Purchase_Orders SET status = 'approved' WHERE purchase_order_id = 1;

3. **Nhập kho thực tế**:
   ```sql
   UPDATE Purchase_Orders SET status = 'received' WHERE purchase_order_id = 1;

   UPDATE Inventory SET quantity = quantity + 100 WHERE product_id = 2;
   
   INSERT INTO Inventory_Transactions (product_id, quantity, transaction_type, transaction_date, order_id) VALUES (2, 100, 'import', '2024-05-15', 1);


### b. Sales Order Flow (Luồng đơn xuất kho)
1. **Tạo đơn xuất kho**:
   ```sql
   INSERT INTO Sales_Orders (customer_id, order_date, status) VALUES (1, '2024-05-14', 'pending');

    INSERT INTO Sales_Order_Details (sales_order_id, product_id, quantity, price) VALUES (1, 2, 50, 30.0);

 
2. **Duyệt đơn xuất kho**:
   ```sql
   UPDATE Sales_Orders SET status = 'approved' WHERE sales_order_id = 1;


3. **Xuất kho thực tế**:
   ```sql
   UPDATE Sales_Orders SET status = 'shipped' WHERE sales_order_id = 1;
   
   UPDATE Inventory SET quantity = quantity - 50 WHERE product_id = 2;
   
   INSERT INTO Inventory_Transactions (product_id, quantity, transaction_type, transaction_date, order_id) VALUES (2, 50, 'export', '2024-05-15', 1);



