

Quản lý kho hàng

     1 Product
      - id
      - name
      -idSuplier
      - idUnit (đơn vị tính)

    2 Unit (đơn vị tính)
      - id 
      - name

    3 Suplier (Nhà cung cấp)
     - id 
     - name
     - phone
     - email
     - address
     - MoreInformation
     - ContractDate

    4 Customer (khách)
     - id 
     - name
     - address
     - phone
     - email
     - MoreInformation
     

    5 Input (phiếu nhập)
     - id 
     - dateOutput


    8 InputInfo(thông tin phiếu nhập)
      - id
      - idProduct
      - IdInput
      - count
      - inputPrice
      - outputPrice
    - status

    6 Output(phiếu xuất)
     - id 
     - dateOutput


    7 OutputInfo (thông tin phiếu nhập)
      - id
      - idProduct
      - IdInputInfo
      - count
    - idCustomer
    - dateOutput
      - status
       
