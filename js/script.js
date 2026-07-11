// =========================
// Aurora Hotel
// =========================

const searchInput = document.querySelector("#searchRoom");
const rooms = document.querySelectorAll(".room");
const buttons = document.querySelectorAll(".trang-thai button");

let currentFilter = "all";


// =========================
// Hàm lọc
// =========================

function filterRooms() {

    const keyword = searchInput.value.trim().toLowerCase();

    rooms.forEach(room => {

        const roomNumber = room.querySelector("h3").textContent.toLowerCase();
        const roomStatus = room.querySelector("p").textContent.toLowerCase();

        // kiểm tra tìm kiếm
        const matchSearch =
            roomNumber.includes(keyword) ||
            roomStatus.includes(keyword);

        // kiểm tra bộ lọc
        let matchFilter = true;

        if (currentFilter !== "all") {
            matchFilter = room.classList.contains(currentFilter);
        }

        room.style.display =
            (matchSearch && matchFilter)
                ? "flex"
                : "none";

    });

}

// =========================
// Tìm kiếm
// =========================

searchInput.addEventListener("keyup", filterRooms);

// =========================
// Lọc trạng thái
// =========================

buttons.forEach(button => {

    button.addEventListener("click", () => {

        buttons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        currentFilter = button.dataset.status;

        filterRooms();

    });

});

// =========================
// Click phòng
// =========================

rooms.forEach(room => {

    room.addEventListener("click", () => {

        const number = room.querySelector("h3").textContent;
        const status = room.querySelector("p").textContent;

        const khach = danhSachKhach.find(item => item.phong === number);

        if (khach) {

            alert(
                "Số phòng: " + number +
                "\nTrạng thái: " + status +
                "\n\nHọ tên: " + khach.ten +
                "\nCCCD: " + khach.cccd +
                "\nSĐT: " + khach.sdt
            );

        } else {

            alert(
                "Số phòng: " + number +
                "\nTrạng thái: " + status +
                "\n\nChưa có khách."
            );

        }

    });

});

// Khởi tạo
filterRooms();
capNhatPhong();
rooms.forEach(room=>{

    const soPhong = room.querySelector("h3").textContent;

    const phong = danhSachPhong.find(p=>p.so===soPhong);

    if(!phong) return;

    room.className = "room";

    switch(phong.trangThai){

        case "Trống":
            room.classList.add("empty");
            break;

        case "Đã đặt":
            room.classList.add("booked");
            break;

        case "Đang ở":
            room.classList.add("using");
            break;

        case "Đang dọn":
            room.classList.add("cleaning");
            break;

        case "Đang sửa":
            room.classList.add("repair");
            break;

    }

    room.querySelector("p").textContent = phong.trangThai;

});