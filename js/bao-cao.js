// =====================================
// Aurora Hotel - BÁO CÁO
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    capNhatPhong();

    hienThiThoiGian();
    thongKePhong();
    thongKeKhach();
    thongKeDoanhThu();
    topDichVu();
    topKhach();

});

// =====================================
// THỜI GIAN
// =====================================

function hienThiThoiGian(){

    const now = new Date();

    document.getElementById("ngayLap").textContent =
        now.toLocaleDateString("vi-VN");

    document.getElementById("gioLap").textContent =
        now.toLocaleTimeString("vi-VN");

}

// =====================================
// THỐNG KÊ PHÒNG
// =====================================

function thongKePhong(){

    document.getElementById("tongPhong").textContent =
        danhSachPhong.length;

    document.getElementById("phongTrong").textContent =
        danhSachPhong.filter(p=>p.trangThai=="Trống").length;

    document.getElementById("dangO").textContent =
        danhSachPhong.filter(p=>p.trangThai=="Đang ở").length;

    document.getElementById("daDat").textContent =
        danhSachPhong.filter(p=>p.trangThai=="Đã đặt").length;

    document.getElementById("dangDon").textContent =
        danhSachPhong.filter(p=>p.trangThai=="Đang dọn").length;

    document.getElementById("dangSua").textContent =
        danhSachPhong.filter(p=>p.trangThai=="Đang sửa").length;

}

// =====================================
// THỐNG KÊ KHÁCH
// =====================================

function thongKeKhach(){

    document.getElementById("tongKhach").textContent =
        danhSachKhach.length;

    document.getElementById("khachDangO").textContent =
        danhSachKhach.filter(k=>k.trangThai=="Đang ở").length;

    document.getElementById("khachDaDat").textContent =
        danhSachKhach.filter(k=>k.trangThai=="Đã đặt").length;

    document.getElementById("khachDaTra").textContent =
        danhSachKhach.filter(k=>k.trangThai=="Đã trả phòng").length;

}

// =====================================
// DOANH THU
// =====================================

function thongKeDoanhThu(){

    const giaPhong = 360000;

    let tienPhong = 0;
    let tienDV = 0;

    danhSachKhach.forEach(kh=>{

        if(kh.trangThai!="Đã trả phòng") return;

        tienPhong += giaPhong;

        if(kh.dichVu){

            kh.dichVu.forEach(ma=>{

                const dv =
                danhSachDichVu.find(x=>x.ma==ma);

                if(dv){

                    tienDV += dv.gia;

                }

            });

        }

    });

    document.getElementById("tienPhong").textContent =
        tienPhong.toLocaleString("vi-VN")+" đ";

    document.getElementById("tienDV").textContent =
        tienDV.toLocaleString("vi-VN")+" đ";

    document.getElementById("tongTien").textContent =
        (tienPhong+tienDV).toLocaleString("vi-VN")+" đ";

}

// =====================================
// TOP DỊCH VỤ
// =====================================

function topDichVu(){

    const tbody =
    document.getElementById("topDichVu");

    tbody.innerHTML="";

    const dem = {};

    danhSachDichVu.forEach(dv=>{

        dem[dv.ma]=0;

    });

    danhSachKhach.forEach(kh=>{

        if(kh.dichVu){

            kh.dichVu.forEach(ma=>{

                if(dem[ma]!=undefined){

                    dem[ma]++;

                }

            });

        }

    });

    const ds = [...danhSachDichVu];

    ds.sort((a,b)=>dem[b.ma]-dem[a.ma]);

    ds.forEach(dv=>{

        tbody.innerHTML += `

        <tr>

            <td>${dv.ma}</td>

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

    const tbody =
    document.getElementById("topKhach");

    tbody.innerHTML="";

    const ds=[...danhSachKhach];

    ds.sort((a,b)=>
        (b.dichVu?b.dichVu.length:0)-
        (a.dichVu?a.dichVu.length:0)
    );

    ds.slice(0,5).forEach(kh=>{

        tbody.innerHTML += `

        <tr>

            <td>${kh.ten}</td>

            <td>${kh.phong}</td>

            <td>${kh.dichVu ? kh.dichVu.length : 0}</td>

        </tr>

        `;

    });

}

// =====================================
// LÀM MỚI
// =====================================

function lamMoiBaoCao(){

    location.reload();

}

function xuatPDF() {

    const giaPhong = 360000;
    let tienPhong = 0;
    let tienDV = 0;


    danhSachKhach.forEach(kh => {

        if (kh.trangThai == "Đã trả phòng") {

            tienPhong += giaPhong;

            if (kh.dichVu) {

                kh.dichVu.forEach(ma => {

                    const dv = danhSachDichVu.find(x => x.ma == ma);

                    if (dv) tienDV += dv.gia;

                });

            }

        }

    });


    const tongTien = tienPhong + tienDV;


    const ngay = new Date();


    const win = window.open(
        "",
        "",
        "width=900,height=700"
    );



    win.document.write(`

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<title>Báo cáo Aurora Hotel</title>


<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}


body{

    font-family:Arial,sans-serif;
    background:#f2f4f8;
    padding:30px;

}


.baocao{

    max-width:850px;
    margin:auto;
    background:white;
    border-radius:12px;
    overflow:hidden;
    box-shadow:0 5px 20px rgba(0,0,0,.15);

}


.header{

    background:#0d6efd;
    color:white;
    padding:25px;

    display:flex;
    justify-content:space-between;
    align-items:center;

}


.header h1{

    font-size:32px;

}


.content{

    padding:30px;

}


.title{

    color:#0d6efd;
    margin:25px 0 10px;
    font-size:22px;

}


table{

    width:100%;
    border-collapse:collapse;
    margin-top:10px;

}


th{

    background:#0d6efd;
    color:white;

}


th,td{

    padding:12px;
    border:1px solid #ddd;
    text-align:center;

}


.tong{

    font-size:24px;
    font-weight:bold;
    color:#e53935;

}


.footer{

    margin-top:40px;
    text-align:center;
    color:#777;

}



.kyten{

    margin-top:40px;
    text-align:right;
    padding-right:40px;
    color:#333;

}



.btn{

    margin-top:20px;
    padding:12px 25px;

    border:none;
    border-radius:6px;

    background:#0d6efd;
    color:white;

    cursor:pointer;

}



@media print{

    body{
        background:white;
    }


    .baocao{

        box-shadow:none;

    }


    .btn{

        display:none;

    }

}


</style>


</head>



<body>


<div class="baocao">



<div class="header">


<div>

<h1>🏨 Aurora Hotel</h1>

<h3>BÁO CÁO TỔNG HỢP KHÁCH SẠN</h3>

</div>



<div>

Ngày lập

<br>

<b>${ngay.toLocaleDateString("vi-VN")}</b>

</div>


</div>




<div class="content">



<h2 class="title">
📊 Thống kê phòng
</h2>


<table>


<tr>

<th>Tổng phòng</th>
<th>Trống</th>
<th>Đang ở</th>
<th>Đã đặt</th>
<th>Đang sửa</th>

</tr>



<tr>

<td>${danhSachPhong.length}</td>

<td>${danhSachPhong.filter(p=>p.trangThai=="Trống").length}</td>

<td>${danhSachPhong.filter(p=>p.trangThai=="Đang ở").length}</td>

<td>${danhSachPhong.filter(p=>p.trangThai=="Đã đặt").length}</td>

<td>${danhSachPhong.filter(p=>p.trangThai=="Đang sửa").length}</td>

</tr>


</table>





<h2 class="title">
👥 Thống kê khách hàng
</h2>


<table>


<tr>

<th>Tổng khách</th>
<th>Đang ở</th>
<th>Đã đặt</th>
<th>Đã trả phòng</th>

</tr>



<tr>

<td>${danhSachKhach.length}</td>

<td>${danhSachKhach.filter(k=>k.trangThai=="Đang ở").length}</td>

<td>${danhSachKhach.filter(k=>k.trangThai=="Đã đặt").length}</td>

<td>${danhSachKhach.filter(k=>k.trangThai=="Đã trả phòng").length}</td>

</tr>


</table>





<h2 class="title">
💰 Doanh thu
</h2>



<table>


<tr>

<td><b>Tiền phòng</b></td>

<td>${tienPhong.toLocaleString()} đ</td>

</tr>



<tr>

<td><b>Tiền dịch vụ</b></td>

<td>${tienDV.toLocaleString()} đ</td>

</tr>



<tr>

<td class="tong">
TỔNG DOANH THU
</td>


<td class="tong">

${tongTien.toLocaleString()} đ

</td>


</tr>


</table>




<div class="footer">


<p>
Báo cáo được lập tự động từ hệ thống quản lý khách sạn.
</p>



<div class="kyten">


<p>
Trà Vinh, ngày ${ngay.getDate()} tháng ${ngay.getMonth()+1} năm ${ngay.getFullYear()}
</p>


<br>


<p>
<b>QUẢN LÝ KHÁCH SẠN</b>
</p>


<p>
(Ký, ghi rõ họ tên)
</p>


<br><br><br>


<p>
<b>Nguyễn Văn A</b>
</p>


</div>



<button class="btn" onclick="window.print()">

🖨️ In báo cáo

</button>



</div>



</div>


</div>



</body>

</html>


`);



    win.document.close();

}