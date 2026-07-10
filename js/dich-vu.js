// =========================
// Aurora Hotel - Dịch vụ
// =========================

const tbody = document.getElementById("tableDichVu");
const searchInput = document.getElementById("searchDV");


// =========================
// Hiển thị
// =========================

function hienThi(ds = danhSachDichVu){

    tbody.innerHTML = "";

    ds.forEach((dv,index)=>{

        let soKhach = danhSachKhach.filter(khach=>

            khach.dichVu &&
            khach.dichVu.includes(dv.ma)

        ).length;

        tbody.innerHTML += `

        <tr class="fade">

            <td>${dv.ma}</td>

            <td>${dv.ten}</td>

            <td>${dv.gia.toLocaleString("vi-VN")} VNĐ</td>

            <td>${dv.donVi}</td>

            <td>${soKhach}</td>

            <td>

                <button class="btn xem"
                onclick="xemDichVu(${index})">

                Xem

                </button>

            </td>

        </tr>

        `;

    });

}



// =========================
// Tìm kiếm
// =========================

searchInput.addEventListener("input",function(){

    let tuKhoa = this.value.toLowerCase();

    let ketQua = danhSachDichVu.filter(dv=>

        dv.ma.toLowerCase().includes(tuKhoa)

        ||

        dv.ten.toLowerCase().includes(tuKhoa)

    );

    hienThi(ketQua);

});



// =========================
// Xem khách sử dụng
// =========================

function xemDichVu(index){

    let dv = danhSachDichVu[index];
    let dsKhach = danhSachKhach.filter(khach =>
        khach.dichVu &&
        khach.dichVu.includes(dv.ma)
    );
    if(dsKhach.length === 0){
        alert("Dịch vụ: " + dv.ten + "\n\nChưa có khách sử dụng dịch vụ này.");
        return;
    }
    let text = "DỊCH VỤ: " + dv.ten + "\n\n";
    text += "DANH SÁCH KHÁCH ĐANG SỬ DỤNG:\n\n";
    dsKhach.forEach((khach, i) => {
        text += (i + 1) + ". " + khach.ten +
                " - Phòng " + khach.phong + "\n";
    });

    alert(text);
}


// =========================
// Load
// =========================

window.onload=()=>{

    document.body.classList.add("loaded");

    hienThi();

};