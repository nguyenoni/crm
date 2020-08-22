// Const

const url_api = "https://script.google.com/macros/s/AKfycbwvWDwAkJu--B1sJfMS3jJSt2kKC2johynPPN9YxEtlXHuGAJl6/exec";


$(document).ready(function(){
    // $('select').formSelect();

    // Fakes the loading setting a timeout
    setTimeout(function () {
        $('body').addClass('loaded');
    }, 3500);


});

$('.btn-save').on("click", (e)=>{
    e.preventDeafault();
    save_data(url_api, { answer: 42 })
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
    });



})

// function save_data(){
//     fetch(url_api, {
//         method: 'POST',
//         mode: 'no-cors',
//         headers: {
//             'Contetn-Type': 'application/json'
//         },
//         redirect: 'follow',
//         body: JSON.stringify({name:"Kim bum"})

//     }).then(function(d){
//         return d.json();
//     }).then(function(data){
//         console.log(data)
//     })
// }


async function save_data(url, data) {

 
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
    //   referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
