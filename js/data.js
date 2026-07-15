// =========================
// Aurora Hotel - DATA
// =========================


// =========================
// DỮ LIỆU KHÁCH MẶC ĐỊNH
// =========================

const duLieuMacDinh = [

    {
        ma:"KL001",
        ten:"Nguyễn Văn An",
        cccd:"079123456789",
        sdt:"0912345678",
        phong:"101",
        ngayNhan:"10/07/2026",
        ngayTra:"12/07/2026",
        trangThai:"Đang ở",
        dichVu:["DV001","DV003"]
    },

    {
        ma:"KL002",
        ten:"Trần Thị Bình",
        cccd:"079987654321",
        sdt:"0987654321",
        phong:"104",
        ngayNhan:"11/07/2026",
        ngayTra:"13/07/2026",
        trangThai:"Đã đặt",
        dichVu:["DV002"]
    },

    {
        ma:"KL003",
        ten:"Lê Minh Hoàng",
        cccd:"079456123789",
        sdt:"0905123456",
        phong:"201",
        ngayNhan:"12/07/2026",
        ngayTra:"14/07/2026",
        trangThai:"Đã đặt",
        dichVu:["DV001","DV006"]
    },

    {
        ma:"KL004",
        ten:"Phạm Quốc Nam",
        cccd:"079321654987",
        sdt:"0938123456",
        phong:"205",
        ngayNhan:"10/07/2026",
        ngayTra:"13/07/2026",
        trangThai:"Đang ở",
        dichVu:["DV005"]
    },

    {
        ma:"KL005",
        ten:"Võ Thị Mai",
        cccd:"079111222333",
        sdt:"0977111222",
        phong:"302",
        ngayNhan:"10/07/2026",
        ngayTra:"15/07/2026",
        trangThai:"Đang ở",
        dichVu:["DV001","DV007"]
    },

    {
        ma:"KL006",
        ten:"Đặng Gia Huy",
        cccd:"079222333444",
        sdt:"0918999888",
        phong:"303",
        ngayNhan:"12/07/2026",
        ngayTra:"15/07/2026",
        trangThai:"Đã đặt",
        dichVu:[]
    },

    {
        ma:"KL007",
        ten:"Huỳnh Khánh Linh",
        cccd:"079333444555",
        sdt:"0944222333",
        phong:"403",
        ngayNhan:"09/07/2026",
        ngayTra:"11/07/2026",
        trangThai:"Đang ở",
        dichVu:["DV003","DV006"]
    },

    {
        ma:"KL008",
        ten:"Ngô Thanh Tùng",
        cccd:"079444555666",
        sdt:"0966111222",
        phong:"404",
        ngayNhan:"11/07/2026",
        ngayTra:"13/07/2026",
        trangThai:"Đã đặt",
        dichVu:["DV007"]
    },

    {
        ma:"KL009",
        ten:"Lý Thu Trang",
        cccd:"079555666777",
        sdt:"0908666777",
        phong:"502",
        ngayNhan:"12/07/2026",
        ngayTra:"14/07/2026",
        trangThai:"Đã đặt",
        dichVu:["DV001","DV002","DV006"]
    },

    {
        ma:"KL010",
        ten:"Bùi Hoàng Long",
        cccd:"079666777888",
        sdt:"0916777888",
        phong:"504",
        ngayNhan:"09/07/2026",
        ngayTra:"12/07/2026",
        trangThai:"Đang ở",
        dichVu:[]
    }

];



// =========================
// KHÁCH HÀNG
// =========================

let danhSachKhach =
JSON.parse(localStorage.getItem("danhSachKhach"))
||
JSON.parse(JSON.stringify(duLieuMacDinh));


let thungRacKhach =
JSON.parse(localStorage.getItem("thungRacKhach"))
||
[];




// =========================
// DỊCH VỤ
// =========================

const danhSachDichVu = [

    {ma:"DV001",ten:"Ăn sáng Buffet",gia:150000,donVi:"Suất"},

    {ma:"DV002",ten:"Giặt ủi",gia:50000,donVi:"Kg"},

    {ma:"DV003",ten:"Spa thư giãn",gia:500000,donVi:"Lượt"},

    {ma:"DV004",ten:"Đưa đón sân bay",gia:300000,donVi:"Lượt"},

    {ma:"DV005",ten:"Thuê xe",gia:800000,donVi:"Ngày"},

    {ma:"DV006",ten:"Hồ bơi",gia:100000,donVi:"Vé"},

    {ma:"DV007",ten:"Phòng Gym",gia:120000,donVi:"Vé"}

];




const phongMacDinh = [

    {so:"101",trangThai:"Đang ở"},
    {so:"102",trangThai:"Đang sửa"},
    {so:"103",trangThai:"Trống"},
    {so:"104",trangThai:"Đã đặt"},
    {so:"105",trangThai:"Đang dọn"},

    {so:"201",trangThai:"Đã đặt"},
    {so:"202",trangThai:"Trống"},
    {so:"203",trangThai:"Đang dọn"},
    {so:"204",trangThai:"Đang sửa"},
    {so:"205",trangThai:"Đang ở"},

    {so:"301",trangThai:"Đang sửa"},
    {so:"302",trangThai:"Đang ở"},
    {so:"303",trangThai:"Đã đặt"},
    {so:"304",trangThai:"Trống"},
    {so:"305",trangThai:"Đang dọn"},

    {so:"401",trangThai:"Trống"},
    {so:"402",trangThai:"Đang dọn"},
    {so:"403",trangThai:"Đang ở"},
    {so:"404",trangThai:"Đã đặt"},
    {so:"405",trangThai:"Đang sửa"},

    {so:"501",trangThai:"Đang dọn"},
    {so:"502",trangThai:"Đã đặt"},
    {so:"503",trangThai:"Trống"},
    {so:"504",trangThai:"Đang ở"},
    {so:"505",trangThai:"Đang sửa"}

];

let danhSachPhong =
JSON.parse(localStorage.getItem("danhSachPhong")) ||
JSON.parse(JSON.stringify(phongMacDinh));




function luuDuLieu(){

    localStorage.setItem(
        "danhSachKhach",
        JSON.stringify(danhSachKhach)
    );

    localStorage.setItem(
        "thungRacKhach",
        JSON.stringify(thungRacKhach)
    );

    localStorage.setItem(
        "danhSachPhong",
        JSON.stringify(danhSachPhong)
    );

}



// =========================
// TẠO MÃ KHÁCH
// =========================

function taoMaKhach(){

    return "KL" +
    String(danhSachKhach.length+1)
    .padStart(3,"0");

}


function capNhatPhong(){

    // Khôi phục trạng thái gốc
    danhSachPhong = JSON.parse(JSON.stringify(phongMacDinh));

    danhSachKhach.forEach(kh=>{

        const phong = danhSachPhong.find(p=>p.so===kh.phong);

        if(!phong) return;

        if(kh.trangThai=="Đã đặt"){

            phong.trangThai="Đã đặt";

        }

        if(kh.trangThai=="Đang ở"){

            phong.trangThai="Đang ở";

        }

    });

    localStorage.setItem(
        "danhSachPhong",
        JSON.stringify(danhSachPhong)
    );

}

function khoiPhucDuLieu(){

    if(!confirm("Khôi phục dữ liệu ban đầu?")) return;

    localStorage.removeItem("danhSachKhach");
    localStorage.removeItem("danhSachPhong");
    localStorage.removeItem("thungRacKhach");

    location.reload();

}