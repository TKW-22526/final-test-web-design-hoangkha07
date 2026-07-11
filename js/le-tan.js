// =====================================
// Aurora Hotel - LỄ TÂN
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    hienThiPhong();
    hienThiKhach();
    thongKe();

});

// =====================================
// HIỂN THỊ PHÒNG TRỐNG
// =====================================

function hienThiPhong(){

    // Luôn cập nhật trạng thái phòng trước
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

    const ten = document.getElementById("ten").value.trim();
    const cccd = document.getElementById("cccd").value.trim();
    const sdt = document.getElementById("sdt").value.trim();
    const phong = document.getElementById("phong").value;
    const ngayNhan = document.getElementById("ngayNhan").value;
    const ngayTra = document.getElementById("ngayTra").value;

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

        ma: taoMaKhach(),

        ten: ten,

        cccd: cccd,

        sdt: sdt,

        phong: phong,

        ngayNhan: ngayNhan,

        ngayTra: ngayTra,

        trangThai: "Đã đặt",

        dichVu: [],

        moiThem: true

    });

    capNhatPhong();

    luuDuLieu();

    document.getElementById("ten").value="";
    document.getElementById("cccd").value="";
    document.getElementById("sdt").value="";
    document.getElementById("phong").value="";
    document.getElementById("ngayNhan").value="";
    document.getElementById("ngayTra").value="";

    hienThiPhong();
    hienThiKhach();
    thongKe();

}

// =====================================
// HIỂN THỊ KHÁCH
// =====================================

function hienThiKhach(){

    const bang = document.getElementById("bangLeTan");

    if(!bang) return;

    bang.innerHTML="";

    danhSachKhach.forEach((kh,index)=>{

        bang.innerHTML += `

        <tr>

            <td>${kh.ma}</td>

            <td>${kh.ten}</td>

            <td>${kh.cccd || "-"}</td>

            <td>${kh.sdt || "-"}</td>

            <td>${kh.phong}</td>

            <td>${kh.ngayNhan}</td>

            <td>${kh.ngayTra || "-"}</td>

            <td>
                <span class="status">
                    ${kh.trangThai}
                </span>
            </td>

            <td>
                ${
                    kh.dichVu.length
                    ? kh.dichVu.join(", ")
                    : "Không"
                }
            </td>

            <td>
                <button class="btn tra" onclick="traPhong(${index})">
                    Trả
                </button>

                <button class="btn xoa"
                onclick="xoaKhachLeTan(${index})">
                Xóa
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

    capNhatPhong();

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

    document.getElementById("tongKhach").textContent =
    danhSachKhach.length;

    document.getElementById("dangO").textContent =
    danhSachKhach.filter(
        kh=>kh.trangThai=="Đang ở"
    ).length;

    document.getElementById("daTra").textContent =
    danhSachKhach.filter(
        kh=>kh.trangThai=="Đã trả phòng"
    ).length;

}