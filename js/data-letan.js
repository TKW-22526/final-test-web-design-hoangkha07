// Aurora Hotel - DATA LỄ TÂN

let danhSachKhach = [

    {
        ma:"KH001",
        ten:"Nguyễn Văn An",
        phong:"101",
        ngayNhan:"2026-07-10",
        ngayTra:"2026-07-12",
        trangThai:"Đang ở",
        dichVu:["Ăn sáng"]
    },

    {
        ma:"KH002",
        ten:"Trần Thị Bình",
        phong:"102",
        ngayNhan:"2026-07-11",
        ngayTra:"2026-07-13",
        trangThai:"Đã đặt",
        dichVu:["Spa"]
    }

];


let danhSachPhong = [

    {
        so:"101",
        trangThai:"Đang sử dụng"
    },

    {
        so:"102",
        trangThai:"Trống"
    },

    {
        so:"103",
        trangThai:"Trống"
    },

    {
        so:"104",
        trangThai:"Trống"
    }

];


function taoMaKhach(){

    return "KH" + 
    String(danhSachKhach.length+1).padStart(3,"0");

}