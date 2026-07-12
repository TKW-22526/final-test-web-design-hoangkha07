// =====================================
// Aurora Hotel - BUỒNG PHÒNG
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    capNhatPhong();
    hienThiPhong();
    thongKe();

});

// =====================================
// HIỂN THỊ DANH SÁCH PHÒNG
// =====================================

function hienThiPhong() {

    const bang = document.getElementById("bangBuongPhong");

    if (!bang) return;

    bang.innerHTML = "";

    danhSachPhong.forEach(phong => {

        const khach = danhSachKhach.find(k =>
            k.phong === phong.so &&
            k.trangThai !== "Đã trả phòng"
        );

        let ten = "-";
        let ngayNhan = "-";
        let ngayTra = "-";

        if (khach) {

            ten = khach.ten;
            ngayNhan = khach.ngayNhan;
            ngayTra = khach.ngayTra || "-";

        }

        let mau = "";
        let nut = "";

        switch (phong.trangThai) {

            case "Trống":

                mau = "#28a745";
                break;

            case "Đã đặt":

                mau = "#0d6efd";

            nut = `
                <button class="btn btn-nhan"
                onclick="nhanPhong('${phong.so}')">
                <i class="fa-solid fa-key"></i>
                Nhận phòng
                </button>
                `;
                break;

            case "Đang ở":

                mau = "#dc3545";
                break;

            case "Đang dọn":

                mau = "#fd7e14";
            nut = `
                <button class="btn btn-don"
                onclick="daDon('${phong.so}')">
                <i class="fa-solid fa-broom"></i>
                Đã dọn
                </button>
                `;
                break;

            case "Đang sửa":

                mau = "#6c757d";
                break;

        }

        bang.innerHTML += `

        <tr>

            <td>${phong.so}</td>

            <td>

                <span
                style="
                background:${mau};
                color:white;
                padding:6px 14px;
                border-radius:20px;
                font-weight:bold;
                ">
                ${phong.trangThai}
                </span>

            </td>

            <td>${ten}</td>

            <td>${ngayNhan}</td>

            <td>${ngayTra}</td>

            <td>${nut}</td>

        </tr>

        `;

    });

}

// =====================================
// NHẬN PHÒNG
// =====================================

function nhanPhong(soPhong) {

    const kh = danhSachKhach.find(k =>
        k.phong === soPhong &&
        k.trangThai === "Đã đặt"
    );

    if (!kh) return;

    kh.trangThai = "Đang ở";

    capNhatPhong();

    luuDuLieu();

    hienThiPhong();

    thongKe();

}

// =====================================
// ĐÃ DỌN
// =====================================

function daDon(soPhong) {

    const phong = danhSachPhong.find(p => p.so === soPhong);

    if (!phong) return;

    phong.trangThai = "Trống";

    luuDuLieu();

    hienThiPhong();

    thongKe();

}

// =====================================
// THỐNG KÊ
// =====================================

function thongKe() {

    document.getElementById("dangO").textContent =
        danhSachPhong.filter(p =>
            p.trangThai === "Đang ở"
        ).length;

    document.getElementById("canDon").textContent =
        danhSachPhong.filter(p =>
            p.trangThai === "Đang dọn"
        ).length;

    document.getElementById("phongTrong").textContent =
        danhSachPhong.filter(p =>
            p.trangThai === "Trống"
        ).length;

}