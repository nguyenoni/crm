$(document).ready(function() {
 
    // Fakes the loading setting a timeout
      setTimeout(function() {
          $('body').addClass('loaded');
      }, 3500);
   
  });

const url = "https://script.google.com/macros/s/AKfycbwvWDwAkJu--B1sJfMS3jJSt2kKC2johynPPN9YxEtlXHuGAJl6/exec";


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
                        <td>${item.name}</td>
                        <td>${item.phone}</td>
                        <td><i class="material-icons ${ item.status ? 'status-checked' : 'status-check'}" title="${item.status ? 'Đã tạo đơn hàng' : 'Chưa tạo đơn hàng'}">check_box</i></td>
                        <td>${ item.status ? '' : '<a class="waves-effect waves-light btn"><i class="material-icons left">create</i>Tạo đơn hàng</a>'}</td>
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
                        <td>${item.name}</td>
                        <td>${item.phone}</td>
                        <td><i class="material-icons ${ item.status ? 'status-checked' : 'status-check'}" title="${item.status ? 'Đã tạo đơn hàng' : 'Chưa tạo đơn hàng'}">check_box</i></td>
                        <td>${ item.status ? '' : '<a class="waves-effect waves-light btn"><i class="material-icons left">create</i>Tạo đơn hàng</a>'}</td>
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


