// Aurora Hotel - JS LỄ TÂN


document.addEventListener("DOMContentLoaded",()=>{

    hienThiPhong();

    hienThiKhach();

    thongKe();

});



// hiện phòng trống

function hienThiPhong(){

    let select=document.getElementById("phong");

    select.innerHTML=
    `<option value="">Chọn phòng</option>`;


    danhSachPhong.forEach(p=>{

        if(p.trangThai=="Trống"){

            select.innerHTML+=
            `
            <option value="${p.so}">
            Phòng ${p.so}
            </option>
            `;

        }

    });

}



// thêm khách

function themKhach(){


    let ten=document.getElementById("ten").value;
    let phong=document.getElementById("phong").value;
    let nhan=document.getElementById("ngayNhan").value;
    let tra=document.getElementById("ngayTra").value;



    if(ten=="" || phong==""){

        alert("Nhập đầy đủ");

        return;

    }



    let khach={

        ma:taoMaKhach(),

        ten:ten,

        phong:phong,

        ngayNhan:nhan,

        ngayTra:tra,

        trangThai:"Đang ở",

        dichVu:[]

    };


    danhSachKhach.push(khach);



    let p=danhSachPhong.find(
        x=>x.so==phong
    );


    if(p){

        p.trangThai="Đang sử dụng";

    }



    hienThiKhach();

    hienThiPhong();

    thongKe();


}




// hiển thị khách


function hienThiKhach(){


    let bang=document.getElementById("bangLeTan");


    bang.innerHTML="";



    danhSachKhach.forEach((kh,index)=>{


        bang.innerHTML+=`

        <tr>

        <td>${kh.ma}</td>

        <td>${kh.ten}</td>

        <td>${kh.phong}</td>

        <td>${kh.ngayNhan}</td>

        <td>${kh.ngayTra}</td>

        <td>${kh.trangThai}</td>

        <td>
        ${kh.dichVu.join(",")}
        </td>


        <td>

        <button onclick="traPhong(${index})">
        Trả phòng
        </button>

        </td>


        </tr>

        `;


    });


}



// trả phòng


function traPhong(i){


    danhSachKhach[i].trangThai="Đã trả phòng";


    let p=danhSachPhong.find(
        x=>x.so==danhSachKhach[i].phong
    );


    if(p){

        p.trangThai="Trống";

    }



    hienThiPhong();

    hienThiKhach();

    thongKe();


}




// thống kê


function thongKe(){


    document.getElementById("tongKhach").innerHTML=
    danhSachKhach.length;



    document.getElementById("dangO").innerHTML=

    danhSachKhach.filter(
        x=>x.trangThai=="Đang ở"
    ).length;



    document.getElementById("daTra").innerHTML=

    danhSachKhach.filter(
        x=>x.trangThai=="Đã trả phòng"
    ).length;


}