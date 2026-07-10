// =========================
// Aurora Hotel - Dữ liệu khách
// =========================

const duLieuMacDinh = [
{
    ma: "KL001",
    ten: "Nguyễn Văn An",
    cccd: "079123456789",
    sdt: "0912345678",
    phong: "101",
    ngayNhan: "10/07/2026",
    ngayTra: "12/07/2026",
    trangThai: "Đang ở"
},
{
    ma: "KL002",
    ten: "Trần Thị Bình",
    cccd: "079987654321",
    sdt: "0987654321",
    phong: "104",
    ngayNhan: "11/07/2026",
    ngayTra: "13/07/2026",
    trangThai: "Đã đặt"
},
{
    ma: "KL003",
    ten: "Lê Minh Hoàng",
    cccd: "079456123789",
    sdt: "0905123456",
    phong: "201",
    ngayNhan: "12/07/2026",
    ngayTra: "14/07/2026",
    trangThai: "Đã đặt"
},
{
    ma: "KL004",
    ten: "Phạm Quốc Nam",
    cccd: "079321654987",
    sdt: "0938123456",
    phong: "205",
    ngayNhan: "10/07/2026",
    ngayTra: "13/07/2026",
    trangThai: "Đang ở"
},
{
    ma: "KL005",
    ten: "Võ Thị Mai",
    cccd: "079111222333",
    sdt: "0977111222",
    phong: "302",
    ngayNhan: "10/07/2026",
    ngayTra: "15/07/2026",
    trangThai: "Đang ở"
},
{
    ma: "KL006",
    ten: "Đặng Gia Huy",
    cccd: "079222333444",
    sdt: "0918999888",
    phong: "303",
    ngayNhan: "12/07/2026",
    ngayTra: "15/07/2026",
    trangThai: "Đã đặt"
},
{
    ma: "KL007",
    ten: "Huỳnh Khánh Linh",
    cccd: "079333444555",
    sdt: "0944222333",
    phong: "403",
    ngayNhan: "09/07/2026",
    ngayTra: "11/07/2026",
    trangThai: "Đang ở"
},
{
    ma: "KL008",
    ten: "Ngô Thanh Tùng",
    cccd: "079444555666",
    sdt: "0966111222",
    phong: "404",
    ngayNhan: "11/07/2026",
    ngayTra: "13/07/2026",
    trangThai: "Đã đặt"
},
{
    ma: "KL009",
    ten: "Lý Thu Trang",
    cccd: "079555666777",
    sdt: "0908666777",
    phong: "502",
    ngayNhan: "12/07/2026",
    ngayTra: "14/07/2026",
    trangThai: "Đã đặt"
},
{
    ma: "KL010",
    ten: "Bùi Hoàng Long",
    cccd: "079666777888",
    sdt: "0916777888",
    phong: "504",
    ngayNhan: "09/07/2026",
    ngayTra: "12/07/2026",
    trangThai: "Đang ở"
}
];

// Lấy dữ liệu đã lưu
let danhSachKhach =
JSON.parse(localStorage.getItem("danhSachKhach")) || 
[...duLieuMacDinh];


// Lấy danh sách khách đã xóa
let thungRacKhach =
JSON.parse(localStorage.getItem("thungRacKhach")) || [];


// Lưu dữ liệu
function luuDuLieu(){

    localStorage.setItem(
        "danhSachKhach",
        JSON.stringify(danhSachKhach)
    );

    localStorage.setItem(
        "thungRacKhach",
        JSON.stringify(thungRacKhach)
    );

}


// Khôi phục dữ liệu gốc
function khoiPhucDuLieu(){

    if(confirm("Khôi phục lại toàn bộ dữ liệu khách ban đầu?")){

        danhSachKhach = JSON.parse(
            JSON.stringify(duLieuMacDinh)
        );

        thungRacKhach = [];

        luuDuLieu();

        location.reload();

    }

}