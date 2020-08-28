var sheet_name_get = "SALE_01";
var sheet_name_order = "DONHANG";
var sheet_name_declare = "KHAIBAO";

function parse_date(date) {
    var rs = "";
    if (date) {
        var date_s = new Date(date);//String(r[15]).slice(0, String(r[15]).indexOf(",", 0));

        var day = "";
        var month = "";
        if (String(date_s.getDate()).length == 1) {
            day = "0" + date_s.getDate();
        }
        else {
            day = date_s.getDate();
        }
        if (String(date_s.getMonth()).length == 1) {
            month = "0" + date_s.getMonth();
        }
        else {
            month = date_s.getMonth();
        }
        rs = date_s.getFullYear() + "-" + month + "-" + day;
    }
    return rs;
}

function get_data_order(email) {
    const jsonArray = [];
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ws = ss.getSheetByName(sheet_name_order);
    const data_range = ws.getRange(1, 1, ws.getLastRow(), 18).getValues();
    const headers = data_range.shift();

    for (var i = 0; i < data_range.length; i++) {
        var r = data_range[i];
        if (r[0] === "") {
            break;
        } else if (i !== 0 && r[12] === email) {

            jsonArray.push({
                row: i + 2, id: r[0], name_custumer: r[1], channel: r[2], status_cust: r[3], quantity: r[4],
                fee_ship: r[5], cash_order: r[6], sum_money: r[7], create_at: r[8], phone: r[9], address: r[10], note: r[11],
                who_make: r[12], price: parseInt(r[6]) / parseInt(r[4]), status_order: r[14], date_ship: parse_date(r[15]), ship_code: r[16], note: r[17]
            });
        }
    }

    return jsonArray;

}

function get_data_customer(full_name) {
    const jsonArray = [];
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ws = ss.getSheetByName(sheet_name_get);

    const data_range = ws.getRange("A3").getDataRegion().getValues();
    headers = data_range.shift();

    for (var i = 0; i < data_range.length; i++) {
        var r = data_range[i];
        if (r[0] === "") {
            break;
        } else if (i !== 0 && r[7] == full_name) {
            jsonArray.push({ row: r[0], date: r[1], id_customer: r[2], name: r[3], quantity: r[4], require: r[5], phone: r[6], name_sale_process: r[7], status_sale: r[8], note: r[9], creat_at: r[10], status: r[11] });
        }
    }

    return jsonArray;

}

function get_status_customer() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ws = ss.getSheetByName(sheet_name_declare);

    const range = ws.getRange(3, 24, ws.getLastRow(), 2).getValues();
    const jsonArr = [];

    for (var i = 0; i < range.length; i++) {
        var r = range[i];
        if (!r[1] == "") {
            jsonArr.push({
                key: r[1], value: r[1]
            });
        }
    }
    return jsonArr;
}
function get_status_order() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ws = ss.getSheetByName(sheet_name_declare);

    const range = ws.getRange(3, 27, ws.getLastRow(), 2).getValues();
    const jsonArr = [];

    for (var i = 0; i < range.length; i++) {
        var r = range[i];
        if (!r[1] == "") {
            jsonArr.push({
                key: r[1], value: r[1]
            });
        }
    }
    return jsonArr;

}

function doGet(e) {
    const response = { status: 200, data: {} };
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ws;
    //    Data from client
    const body = JSON.stringify(e.parameter);
    const data = JSON.parse(body);


    const dt = JSON.parse(body);
    //action get bill order
    if (data.action == "GET_BILL_ORDER") {
        //        Function get data from sheet DONHANG
        try {

            //        const result_data_order = ; 
            response.status = 200; response.data = { data_order: get_data_order(data.email), status_order: get_status_order() };
        }
        catch (e) {

            response.status = 400;

        }

    }
    else if (data.action == "GET_CUSTOMER") {
        try {

            //        const result_data_order = ; 
            response.status = 200; response.data = { data_cust: get_data_customer(data.full_name), status: get_status_customer() };
        }
        catch (e) {

            response.status = 400;

        }

    }

    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
    //    return ContentService.createTextOutput(body).setMimeType(ContentService.MimeType.JSON);
}

function change_status(row) {
    const sheetActive = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = sheetActive.getSheetByName('SALE_01');
    //    cong 2 dong do da mat 2 dong o dau lam tieu de
    row = parseInt(row) + 2;
    var range = "L" + row.toString();
    sheet.getRange(range).setValue(true);
}

function change_status_order(data) {
    const sheetActive = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = sheetActive.getSheetByName(sheet_name_order);

    //    var range = "N" + row.toString();
    //    sheet.getRange(range).setValue(value);
    var dt_update = [[
        data.status, data.shiping_date, data.id_order, data.note
    ]];
    sheet.getRange(data.row, 15, 1, 4).setValue(dt_update);

}

function delete_row(row, sheet_name) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (sheet_name == "SALE_01") {
        const sheet = ss.getSheetByName(sheet_name_get);
        if (row) {
            sheet.deleteRow(row);

        }

    }
    else if (sheet_name == "DONHANG") {
        const ws = ss.getSheetByName(sheet_name_order);
        if (row) {
            ws.deleteRow(row)
        }
    }


}

function update_data_order(dt, row) {
    const sheetActive = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = sheetActive.getSheetByName('SALE_01');
    if (dt) {
        sheet.getRange(row, 3, 1, 9).setValues(dt);

    }

}
//

function encode_password(p) {

    const base64data = Utilities.base64Encode(p, Utilities.Charset.UTF_8);
    return base64data;

}
function decode_password(p) {

    const decoded = Utilities.base64Decode(p, Utilities.Charset.UTF_8);
    const input = Utilities.newBlob(decoded).getDataAsString();


    return input;
}

function test() {
    //    dt = [
    //        ["DH009", "Nguyễn Thị Huyền", 1, "yeu cau", "0974492262", "Nguyễn Tiến Vượng", "Đã xử lý xong", "ghi chu", "8/24/2020, 3:46:40 PM"]
    //    ]
    //
    //    update_data_order(dt, 1996);
    //    var a = get_data_customer("Nguyễn Oni");
    //    delete_row(14,sheet_name_order);
    //    Logger.log(result);
    //change_status_order(12, "Hoàn thành")
    //const a = decode_password("VG9pZGljb2RlZEAw");
    //const a = encode_password("linhhuong@123");
    //    const a = check_user_login("ngocch", "");

    const a = get_data_order("onibilladen@gmail.com");
    Logger.log(a);
}

function check_user_login(u, p) {
    const sheetActive = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = sheetActive.getSheetByName('USER');
    const range = sheet.getRange(2, 1, sheet.getLastRow() - 1, 4).getValues();
    var rs = { status: 400, message: "Lỗi! vui lòng kiểm tra lại username và mật khẩu.", user: {} };
    //    range = range.shift();
    for (var c = 0; c < range.length; c++) {
        var r = range[c];
        var pass = encode_password(p);
        if (r[0] === u && r[1] === pass) {
            var obj = { user: r[0], email: r[2] };
            rs.status = 200; rs.message = "ok"; rs.user = { user: r[0], email: r[2], full_name: r[3] };
            break;

        }
    }

    return rs;
}

function doPost(e) {


    const response = { status: 400, message: "" };
    const body = JSON.stringify(e.parameter);
    const data = JSON.parse(body);
    //Add new bill order in sheet DONHANG
    if (data.action == "ADD") {
        const sheetActive = SpreadsheetApp.getActiveSpreadsheet();
        const sheet = sheetActive.getSheetByName('DONHANG');

        try {
            var dt_save = [
                [data.customer_id, data.customer_name, data.kind_contact, data.sale_status, data.quantity,
                data.fee_ship, data.money_box, data.sum_money_order, data.create_at, data.phone_number, data.address, data.note, data.email_user_edit, "", "Chưa xác nhận đơn hàng"]
            ];

            sheet.getRange(sheet.getLastRow() + 1, 1, 1, 15).setValues(dt_save);
            change_status(data.row);

            response.status = 200; response.message = "Tạo vận đơn thành công!";

        } catch (e) {
            response.status = 400; response.message = "Lỗi, có vẻ như hệ thống đang gặp vấn đề nào đó!";

        }
    }// Delete order
    else if (data.action == "DELETE") {

        try {
            delete_row(data.row, sheet_name_get);
            response.status = 200; response.message = "Xóa đơn hàng thành công!";

        } catch (e) {

            response.status = 400; response.message = "Lỗi, có vẻ như hệ thống đang gặp vấn đề nào đó!";

        }

    }// Edit order
    else if (data.action == "EDIT") {
        try {
            var dt_update = [
                [data.customer_id, data.custumer_name, data.order_quantity, data.require, data.phone_number, data.name_sale, data.sale_status, data.note, data.create_at]
            ];
            update_data_order(dt_update, parseInt(data.row));
            response.status = 200; response.message = "Cập nhật đơn hàng thành công";
        }
        catch (e) {
            response.status = 400; response.message = "Lỗi, có vẻ như hệ thống đang gặp vấn đề nào đó!";

        }

    }
    else if (data.action == "DELETE_ORDER") {
        try {
            delete_row(data.row, sheet_name_order);
            response.status = 200; response.message = "Xóa đơn hàng thành công!";

        } catch (e) {

            response.status = 400; response.message = "Lỗi, có vẻ như hệ thống đang gặp vấn đề nào đó!";

        }


    }
    else if (data.action == "EDIT_STATUS_ORDER") {
        try {
            change_status_order(data);

            response.status = 200; response.message = "Cập nhật trạng thái vận đơn thành công!";

        } catch (e) {

            response.status = 400; response.message = "Lỗi, có vẻ như hệ thống đang gặp vấn đề nào đó!";

        }


    }
    else if (data.action == "LOGIN") {
        try {

            var res = check_user_login(data.user_name, data.password);
            response.status = res.status; response.message = res.message; response.user = res.user;

        } catch (e) {

            response.status = 400; response.message = "Lỗi, có vẻ như hệ thống đang gặp vấn đề nào đó!";

        }

    }

    //

    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);


}