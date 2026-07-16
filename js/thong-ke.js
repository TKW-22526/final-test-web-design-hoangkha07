// =====================================
// Aurora Hotel - THỐNG KÊ
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    capNhatPhong();
    luuDuLieu();
    thongKePhong();
    thongKeKhach();
    thongKeDoanhThu();
    bieuDoPhong();
    topDichVu();
    topKhach();

});

// =====================================
// THỐNG KÊ PHÒNG
// =====================================

function thongKePhong(){

    const tong = danhSachPhong.length;

    const trong = danhSachPhong.filter(p=>p.trangThai=="Trống").length;
    const dangO = danhSachPhong.filter(p=>p.trangThai=="Đang ở").length;
    const daDat = danhSachPhong.filter(p=>p.trangThai=="Đã đặt").length;
    const dangDon = danhSachPhong.filter(p=>p.trangThai=="Đang dọn").length;
    const dangSua = danhSachPhong.filter(p=>p.trangThai=="Đang sửa").length;

    document.getElementById("tongPhong").textContent=tong;
    document.getElementById("phongTrong").textContent=trong;
    document.getElementById("dangO").textContent=dangO;
    document.getElementById("daDat").textContent=daDat;
    document.getElementById("dangDon").textContent=dangDon;
    document.getElementById("dangSua").textContent=dangSua;

}



// =====================================
// THỐNG KÊ KHÁCH
// =====================================

function thongKeKhach(){

    document.getElementById("tongKhach").textContent=danhSachKhach.length;

    document.getElementById("khachDangO").textContent=
    danhSachKhach.filter(k=>k.trangThai=="Đang ở").length;

    document.getElementById("khachDaDat").textContent=
    danhSachKhach.filter(k=>k.trangThai=="Đã đặt").length;

    document.getElementById("khachDaTra").textContent=
    danhSachKhach.filter(k=>k.trangThai=="Đã trả phòng").length;

}



// =====================================
// DOANH THU
// =====================================
function chuyenNgay(str){

    if(!str) return null;

    const [ngay, thang, nam] = str.split("/");

    return new Date(nam, thang - 1, ngay);

}
function thongKeDoanhThu(){

    const giaPhongMotNgay = 360000;

    let tienPhong = 0;
    let tienDV = 0;

    danhSachKhach.forEach(kh=>{

        if(kh.trangThai !== "Đã trả phòng") return;

        const ngayNhan = chuyenNgay(kh.ngayNhan);
        const ngayTra = chuyenNgay(kh.ngayTra);

        let soNgay = Math.ceil(
            (ngayTra - ngayNhan) /
            (1000 * 60 * 60 * 24)
        );

        if(isNaN(soNgay) || soNgay <= 0){

            soNgay = 1;

        }

        tienPhong += giaPhongMotNgay * soNgay;

        if(kh.dichVu){

            kh.dichVu.forEach(ma=>{

                const dv = danhSachDichVu.find(
                    d => d.ma === ma
                );

                if(dv){

                    tienDV += dv.gia;

                }

            });

        }

    });

    document.getElementById("tienPhong").textContent =
        tienPhong.toLocaleString("vi-VN") + " đ";

    document.getElementById("tienDV").textContent =
        tienDV.toLocaleString("vi-VN") + " đ";

    document.getElementById("tongTien").textContent =
        (tienPhong + tienDV).toLocaleString("vi-VN") + " đ";

}


// =====================================
// BIỂU ĐỒ
// =====================================

function bieuDoPhong(){

    const dem = {

        "Trống":0,
        "Đang ở":0,
        "Đã đặt":0,
        "Đang dọn":0,
        "Đang sửa":0

    };

    danhSachPhong.forEach(phong=>{

        if(dem[phong.trangThai] != undefined){

            dem[phong.trangThai]++;

        }

    });

    const max = Math.max(...Object.values(dem),5);

    setBar("barTrong",dem["Trống"],max);
    setBar("barDangO",dem["Đang ở"],max);
    setBar("barDaDat",dem["Đã đặt"],max);
    setBar("barDangDon",dem["Đang dọn"],max);
    setBar("barDangSua",dem["Đang sửa"],max);

}



function setBar(id,value,max){

    const bar = document.getElementById(id);

    if(!bar) return;

    const height = Math.max(20,(value/max)*160);

    bar.style.height = height + "px";

    bar.innerHTML = `
        <div style="
            color:#fff;
            text-align:center;
            font-weight:bold;
            padding-top:6px;
            font-size:18px;
        ">
            ${value}
        </div>
    `;

}
// =====================================
// TOP DỊCH VỤ
// =====================================

function topDichVu(){

    const tbody=document.getElementById("topDichVu");

    tbody.innerHTML="";

    const dem={};

    danhSachDichVu.forEach(dv=>{

        dem[dv.ma]=0;

    });

    danhSachKhach.forEach(kh=>{

        kh.dichVu.forEach(ma=>{

            if(dem[ma]!=undefined){

                dem[ma]++;

            }

        });

    });

    danhSachDichVu.forEach(dv=>{

        tbody.innerHTML+=`

        <tr>

            <td>${dv.ten}</td>

            <td>${dem[dv.ma]}</td>

        </tr>

        `;

    });

}



// =====================================
// TOP KHÁCH
// =====================================

function topKhach(){

    const tbody=document.getElementById("topKhach");

    tbody.innerHTML="";

    const ds=[...danhSachKhach];

    ds.sort((a,b)=>b.dichVu.length-a.dichVu.length);

    ds.slice(0,5).forEach(kh=>{

        tbody.innerHTML+=`

        <tr>

            <td>${kh.ten}</td>

            <td>${kh.phong}</td>

            <td>${kh.dichVu.length}</td>

        </tr>

        `;

    });

}