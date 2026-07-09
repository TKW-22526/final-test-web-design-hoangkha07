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

        alert(
            "Số phòng: " + number +
            "\nTrạng thái: " + status
        );

    });

});

// Khởi tạo
filterRooms();