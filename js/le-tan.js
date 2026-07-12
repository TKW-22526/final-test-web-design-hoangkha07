// =====================================
// Aurora Hotel - LỄ TÂN
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    capNhatPhong();
    hienThiPhong();
    hienThiKhach();
    thongKe();

});

function hienThiPhong(){

    capNhatPhong();

    const select = document.getElementById("phong");

    if(!select) return;

    select.innerHTML =
    `<option value="">-- Chọn phòng trống --</option>`;

    danhSachPhong.forEach(phong=>{

        if(phong.trangThai === "Trống"){

            select.innerHTML += `
                <option value="${phong.so}">
                    Phòng ${phong.so}
                </option>
            `;

        }

    });

}

// =====================================
// THÊM KHÁCH
// =====================================

function themKhach(){

    const ten=document.getElementById("ten").value.trim();
    const cccd=document.getElementById("cccd").value.trim();
    const sdt=document.getElementById("sdt").value.trim();
    const phong=document.getElementById("phong").value;
    const ngayNhan=document.getElementById("ngayNhan").value;
    const ngayTra=document.getElementById("ngayTra").value;

    const dichVu=[];

    document.querySelectorAll(
        "#dichVu input[type='checkbox']:checked"
    ).forEach(item=>{

        dichVu.push(item.value);

    });

    if(
        ten=="" ||
        cccd=="" ||
        sdt=="" ||
        phong=="" ||
        ngayNhan==""
    ){

        alert("Vui lòng nhập đầy đủ thông tin.");

        return;

    }

    danhSachKhach.push({

        ma:taoMaKhach(),

        ten:ten,

        cccd:cccd,

        sdt:sdt,

        phong:phong,

        ngayNhan:ngayNhan,

        ngayTra:ngayTra,

        trangThai:"Đã đặt",

        dichVu:dichVu,

        moiThem:true

    });

    capNhatPhong();

    luuDuLieu();

    document.getElementById("ten").value="";
    document.getElementById("cccd").value="";
    document.getElementById("sdt").value="";
    document.getElementById("phong").value="";
    document.getElementById("ngayNhan").value="";
    document.getElementById("ngayTra").value="";

    document.querySelectorAll(
        "#dichVu input[type='checkbox']"
    ).forEach(item=>{

        item.checked=false;

    });

    hienThiPhong();
    hienThiKhach();
    thongKe();

}

// =====================================
// HIỂN THỊ KHÁCH
// =====================================

function hienThiKhach(){

    const bang=document.getElementById("bangLeTan");

    if(!bang) return;

    bang.innerHTML="";

    danhSachKhach.forEach((kh,index)=>{

        bang.innerHTML+=`

        <tr>

            <td>${kh.ma}</td>

            <td>${kh.ten}</td>

            <td>${kh.cccd}</td>

            <td>${kh.sdt}</td>

            <td>${kh.phong}</td>

            <td>${kh.ngayNhan}</td>

            <td>${kh.ngayTra || "-"}</td>

            <td>${kh.trangThai}</td>

            <td>
                ${
                    kh.dichVu && kh.dichVu.length
                    ? kh.dichVu.join(", ")
                    : "Không"
                }
            </td>

            <td>

                ${
                    kh.trangThai!="Đã trả phòng"
                    ?
                    `<button class="btn tra"
                        onclick="traPhong(${index})">
                        Trả
                    </button>`
                    :
                    ""
                }

                <button class="btn xoa"
                    onclick="xoaKhachLeTan(${index})">
                    Xóa
                </button>

               <button class="btn hoadon" onclick="inHoaDon(${index})">
                 <i class="fa-solid fa-file-invoice-dollar"></i>
                     Hóa đơn
                </button>
            </td>

        </tr>

        `;

    });

}

// =====================================
// NHẬN PHÒNG
// =====================================

function nhanPhong(index){

    danhSachKhach[index].trangThai="Đang ở";

    capNhatPhong();

    luuDuLieu();

    hienThiPhong();
    hienThiKhach();
    thongKe();

}

// =====================================
// TRẢ PHÒNG
// =====================================

function traPhong(index){

    danhSachKhach[index].trangThai="Đã trả phòng";

    const phong =
    danhSachPhong.find(
        p=>p.so==danhSachKhach[index].phong
    );

    if(phong){

        phong.trangThai="Đang dọn";

    }

    luuDuLieu();

    hienThiPhong();

    hienThiKhach();

    thongKe();

}

// =====================================
// XÓA KHÁCH
// =====================================

function xoaKhachLeTan(index){

    if(!confirm("Bạn muốn xóa khách này?")) return;

    thungRacKhach.push(danhSachKhach[index]);

    danhSachKhach.splice(index,1);

    capNhatPhong();

    luuDuLieu();

    hienThiPhong();
    hienThiKhach();
    thongKe();

}

// =====================================
// THỐNG KÊ
// =====================================

function thongKe(){

    document.getElementById("tongKhach").textContent=
    danhSachKhach.length;

    document.getElementById("dangO").textContent=
    danhSachKhach.filter(
        kh=>kh.trangThai=="Đang ở"
    ).length;

    document.getElementById("daTra").textContent=
    danhSachKhach.filter(
        kh=>kh.trangThai=="Đã trả phòng"
    ).length;

}
function inHoaDon(index){

    const kh = danhSachKhach[index];

    const giaPhong = 360000;

    let tienDV = 0;
    let htmlDV = "";

    if(kh.dichVu.length==0){

        htmlDV=`
        <tr>
            <td colspan="3" style="text-align:center">
                Không sử dụng dịch vụ
            </td>
        </tr>`;

    }else{

        kh.dichVu.forEach(ma=>{

            const dv = danhSachDichVu.find(x=>x.ma==ma);

            if(dv){

                tienDV += dv.gia;

                htmlDV += `
                <tr>
                    <td>${dv.ma}</td>
                    <td>${dv.ten}</td>
                    <td style="text-align:right">
                        ${dv.gia.toLocaleString()} đ
                    </td>
                </tr>
                `;

            }

        });

    }

    const tong = giaPhong + tienDV;

    const win = window.open("", "", "width=900,height=700");

    win.document.write(`

<!DOCTYPE html>

<html lang="vi">

<head>

<meta charset="UTF-8">

<title>Hóa đơn Aurora Hotel</title>

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

.hoadon{

    max-width:800px;
    margin:auto;
    background:#fff;
    border-radius:10px;
    box-shadow:0 5px 20px rgba(0,0,0,.15);
    overflow:hidden;

}

.header{

    background:#0d6efd;
    color:#fff;
    padding:25px;
    display:flex;
    justify-content:space-between;
    align-items:center;

}

.header h1{

    font-size:32px;

}

.header h3{

    font-weight:normal;

}

.content{

    padding:30px;

}

.info{

    display:grid;
    grid-template-columns:1fr 1fr;
    gap:12px;
    margin-bottom:25px;

}

.info div{

    font-size:16px;

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

}

tfoot td{

    font-weight:bold;

}

.tong{

    font-size:24px;
    color:#e53935;
    font-weight:bold;

}

.footer{

    text-align:center;
    margin-top:40px;
    color:#777;

}

.btnPrint{

    margin-top:30px;
    background:#0d6efd;
    color:white;
    border:none;
    padding:12px 25px;
    font-size:16px;
    border-radius:6px;
    cursor:pointer;

}

.btnPrint:hover{

    background:#0b5ed7;

}

@media print{

    body{

        background:white;

    }

    .hoadon{

        box-shadow:none;

    }

    .btnPrint{

        display:none;

    }

}

</style>

</head>

<body>

<div class="hoadon">

<div class="header">

<div>

<h1>🏨 Aurora Hotel</h1>

<h3>HÓA ĐƠN THANH TOÁN</h3>

</div>

<div>

Ngày in<br>

<b>${new Date().toLocaleDateString("vi-VN")}</b>

</div>

</div>

<div class="content">

<div class="info">

<div><b>Mã khách:</b> ${kh.ma}</div>

<div><b>Phòng:</b> ${kh.phong}</div>

<div><b>Khách hàng:</b> ${kh.ten}</div>

<div><b>CCCD:</b> ${kh.cccd}</div>

<div><b>SĐT:</b> ${kh.sdt}</div>

<div><b>Ngày nhận:</b> ${kh.ngayNhan}</div>

<div><b>Ngày trả:</b> ${kh.ngayTra || "-"}</div>

</div>

<h3>Chi tiết dịch vụ</h3>

<table>

<thead>

<tr>

<th>Mã DV</th>

<th>Tên dịch vụ</th>

<th>Thành tiền</th>

</tr>

</thead>

<tbody>

${htmlDV}

</tbody>

</table>

<br>

<table>

<tr>

<td><b>Tiền phòng</b></td>

<td style="text-align:right">

${giaPhong.toLocaleString()} đ

</td>

</tr>

<tr>

<td><b>Tiền dịch vụ</b></td>

<td style="text-align:right">

${tienDV.toLocaleString()} đ

</td>

</tr>

<tr>

<td class="tong">TỔNG THANH TOÁN</td>

<td class="tong" style="text-align:right">

${tong.toLocaleString()} đ

</td>

</tr>

</table>

<div class="footer">

<p><b>Cảm ơn Quý khách đã sử dụng dịch vụ của Aurora Hotel!</b></p>

<p>Hẹn gặp lại Quý khách trong thời gian sớm nhất.</p>

<button class="btnPrint" onclick="window.print()">

🖨️ In hóa đơn

</button>

</div>

</div>

</div>

</body>

</html>

`);

    win.document.close();

}