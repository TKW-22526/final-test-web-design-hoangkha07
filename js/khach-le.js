// =========================
// Aurora Hotel - Khách lẻ
// =========================

const tbody = document.getElementById("tableKhach");
const searchInput = document.getElementById("searchKhach");


// Hiển thị danh sách
function hienThi(ds = danhSachKhach){

    tbody.innerHTML = "";

    ds.forEach((khach)=>{

        const index = danhSachKhach.findIndex(
            item => item.ma === khach.ma
        );

        tbody.innerHTML += `

        <tr class="fade">

            <td>${khach.ma}</td>
            <td>${khach.ten}</td>
            <td>${khach.cccd}</td>
            <td>${khach.sdt}</td>
            <td>${khach.phong}</td>
            <td>${khach.ngayNhan}</td>
            <td>${khach.ngayTra}</td>
            <td>
                <span class="status">
                    ${khach.trangThai}
                </span>
            </td>

            <td>

                <button class="btn xem"
                onclick="xemKhach(${index})">
                Xem
                </button>


                <button class="btn sua"
                onclick="suaKhach(${index})">
                Sửa
                </button>


                <button class="btn xoa"
                onclick="xoaKhach(${index})">
                Xóa
                </button>

            </td>

        </tr>

        `;

    });

}

// Tìm kiếm
searchInput.addEventListener(
"input",
function(){

    let tuKhoa = this.value
    .toLowerCase()
    .trim();
    let ketQua = danhSachKhach.filter(khach =>

        khach.ten.toLowerCase()
        .includes(tuKhoa)

        ||

        khach.cccd.includes(tuKhoa)

        ||

        khach.phong.includes(tuKhoa)

    );
    hienThi(ketQua);

});

// Xem thông tin
function xemKhach(index){

    let khach = danhSachKhach[index];
    alert(
`Mã khách: ${khach.ma}
Họ tên: ${khach.ten}
CCCD: ${khach.cccd}
SĐT: ${khach.sdt}
Phòng: ${khach.phong}
Ngày nhận: ${khach.ngayNhan}
Ngày trả: ${khach.ngayTra}
Trạng thái: ${khach.trangThai}`
    );

}

// Sửa khách
function suaKhach(index){

    let khach = danhSachKhach[index];


    let tenMoi = prompt(
        "Nhập họ tên mới:",
        khach.ten
    );

    if(!tenMoi) return;

    let cccdMoi = prompt(
        "Nhập CCCD mới:",
        khach.cccd
    );

    if(!cccdMoi) return;

    let sdtMoi = prompt(
        "Nhập số điện thoại mới:",
        khach.sdt
    );
    if(!sdtMoi) return;

    khach.ten = tenMoi;
    khach.cccd = cccdMoi;
    khach.sdt = sdtMoi;

    luuDuLieu();
    hienThi();

}

// Xóa khách
function xoaKhach(index){
    if(confirm(
    "Bạn có chắc muốn xóa khách này?"
    )){
        let khachXoa =
        danhSachKhach[index];
        // đưa vào thùng rác
        thungRacKhach.push(khachXoa);
        // xóa khỏi danh sách
        danhSachKhach.splice(index,1);
        luuDuLieu();
        hienThi();


    }

}

// Khôi phục khách đã xóa
function khoiPhucKhach(){
    if(thungRacKhach.length === 0){
        alert(
        "Không có khách nào để khôi phục!"
        );
        return;

    }
    danhSachKhach.push(
        ...thungRacKhach
    );
    thungRacKhach = [];
    luuDuLieu();
    hienThi();
    alert(
    "Đã khôi phục khách đã xóa!"
    );

}

// Hiệu ứng load
window.onload = ()=>{

    document.body.classList.add(
        "loaded"
    );

    hienThi();

};