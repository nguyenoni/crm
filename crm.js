$(document).ready(function () {
    // Function show data to client
    function show_data_to_client(data) {
        console.log(data);
        if (data) {
            $('#pagination').pagination({
                dataSource: data,
                pageSize: 10,
                autoHidePrevious: true,
                autoHideNext: true,
                callback: function (data, pagination) {
                    // template method of yourself
                    var tbody = $('tbody').empty();
                    data.forEach((item, index) => {

                        let tr = `
                        <tr>
                            <td>${index}</td>
                            <td>${item.id_customer}</td>
                            <td>${item.name}</td>
                            <td>${item.phone}</td>
                            <td><i class="far fa-check-circle ${ item.status ? 'status-checked' : 'status-check'}" title="${item.status ? 'Đã tạo vận đơn' : 'Chưa tạo vận đơn'}"></i></td>
                            
                            <td value="${item.id_customer}">${ item.status ? '' : '<a data-toggle="modal" data-target="#exampleModal"><i class="fas fa-plus-circle create-new-bill-order left" title="Tạo vận đơn"></i></a>'} 
                            <i class="fas fa-cog edit-order" title="Chỉnh sửa đơn hàng"></i>
                            <i class="far fa-trash-alt delete-order " title="Xóa đơn hàng">delete</i> </td>
                        </tr>
                        
                        `;
                        tbody.append(tr);
                    });
                }
            })
        }

    }
    // Function filter data search
    function flter_data(keyword, type) {
        const data = JSON.parse(localStorage.getItem("data"));
        //   console.log(data);
        let jsonArr;
        if (type !== "") {
            // search filter follow name customer
            if (type === "name_cus") {
                jsonArr = data.filter(item => item.name === keyword)

                // jsonArr.push(obj);
            } // Search follow with Order ID
            else if (type === "order_id") {
                jsonArr = data.filter(item => item.id_customer === keyword)

            } // Search follow with Phone
            else {
                jsonArr = data.filter(item => item.phone === keyword)

            }
        }
        // Call function show data to client
        show_data_to_client(jsonArr);
        // data.filter(x => x.name === "Blofeld");
    }
    // Event when search
    $('#key_search').keyup(e => {
        e.stopImmediatePropagation();
        let type_search = $('.type-search').find(":selected").val();
        if (e.target.value !== "") {
            flter_data(e.target.value, type_search);
        }

    });


});
// Base url
const url = "https://script.google.com/macros/s/AKfycbwvWDwAkJu--B1sJfMS3jJSt2kKC2johynPPN9YxEtlXHuGAJl6/exec";

// Function get data from API
async function get_data() {
    await fetch(url, {})
        .then(d => d.json())
        .then(d => {
            // load_data_to_front_end(d[0].data);
            if (localStorage.getItem("data") === null) {
                localStorage.setItem("data", JSON.stringify(d[0].data));
            } else {
                localStorage.removeItem("data");
                localStorage.setItem("data", JSON.stringify(d[0].data));
            }

            first_load_data_to_front_end(d[0].data);

        });


}
// Load data to show in client
window.onload = get_data();

function load_data_to_front_end() {
    // 

    if (localStorage.getItem("data")) {
        const data = JSON.parse(localStorage.getItem("data"));
        $('#pagination').pagination({
            dataSource: data,
            pageSize: 10,
            autoHidePrevious: true,
            autoHideNext: true,
            callback: function (data, pagination) {
                // template method of yourself
                var tbody = $('tbody').empty();
                data.forEach((item, index) => {

                    let tr = `
                    <tr>
                        <td>${item.row}</td>
                        <td>${item.id_customer}</td>
                        <td>${item.name}</td>
                        <td>${item.phone}</td>
                        <td><i class="far fa-check-circle ${ item.status ? 'status-checked' : 'status-check'}" title="${item.status ? 'Đã tạo vận đơn' : 'Chưa tạo vận đơn'}"></i></td>  
                        <td value="${item.id_customer}">${ item.status ? '' : '<a data-toggle="modal" data-target="#exampleModal"><i class="fas fa-plus-circle create-new-bill-order left" title="Tạo vận đơn"></i></a>'}  
                        <i class="fas fa-cog edit-order" title="Chỉnh sửa đơn hàng"></i>
                        <i class="far fa-trash-alt delete-order " title="Xóa đơn hàng">delete</i> </td>
                        
                    </tr>
                    
                    `;
                    tbody.append(tr);
                });
            }
        })
    }

}

function first_load_data_to_front_end(data) {
    // 

    if (data) {
        $('#pagination').pagination({
            dataSource: data,
            pageSize: 10,
            autoHidePrevious: true,
            autoHideNext: true,
            callback: function (data, pagination) {
                // template method of yourself
                var tbody = $('tbody').empty();
                data.forEach((item, index) => {

                    let tr = `
                    <tr>
                        <td>${item.row}</td>
                        <td>${item.id_customer}</td>
                        <td>${item.name}</td>
                        <td>${item.phone}</td>
                        <td><i class="far fa-check-circle ${ item.status ? 'status-checked' : 'status-check'}" title="${item.status ? 'Đã tạo vận đơn' : 'Chưa tạo vận đơn'}"></i></td>
                        <td value="${item.id_customer}">${ item.status ? '' : '<a data-toggle="modal" data-target="#exampleModal"><i  class="fas fa-plus-circle create-new-bill-order left" title="Tạo vận đơn"></i></a>'}  
                        <i class="fas fa-cog edit-order " title="Chỉnh sửa đơn hàng"></i>
                        <i class="far fa-trash-alt delete-order " title="Xóa đơn hàng"></i> </td>
                    </tr>
                    
                    `;
                    tbody.append(tr);
                });
            }
        })
    }

}




// function


//     // POST data
//     fetch(url, {
//         method: "GET",
//         mode: 'no-cors',
//         headers: {
//             'Content-Type': 'applycation/json'
//     },
//         redirect: 'follow',
//         body: JSON.stringify({ name: "Oni chan" })
// });


