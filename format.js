var sheet_name_get = "SALE_01";
var sheet_name_order = "DONHANG";

function get_data_order() {
    const jsonArray = [];
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ws = ss.getSheetByName(sheet_name_order);
    const data_range = ws.getRange(1, 1, ws.getLastRow() - 1, 13).getValues();
    const headers = data_range.shift();

    for (var i = 0; i < data_range.length; i++) {
        var r = data_range[i];
        if (r[0] === "") {
            break;
        } else if (i !== 0) {
            jsonArray.push({
                row: i + 2, id: r[0], name_custumer: r[1], channel: r[2], status: r[3], quantity: r[4],
                fee_ship: r[5], cash_order: r[6], sum_money: r[7], create_at: r[8], phone: r[9], address: r[10], note: r[11], who_make: r[12]
            });
        }
    }

    return jsonArray;

}

function get_data_customer() {
    const jsonArray = [];
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ws = ss.getSheetByName(sheet_name_get);

    const data_range = ws.getRange("A3").getDataRegion().getValues();
    headers = data_range.shift();

    for (var i = 0; i < data_range.length; i++) {
        var r = data_range[i];
        if (r[0] === "") {
            break;
        } else if (i !== 0) {
            jsonArray.push({ row: r[0], date: r[1], id_customer: r[2], name: r[3], quantity: r[4], require: r[5], phone: r[6], name_sale_process: r[7], status_sale: r[8], note: r[9], creat_at: r[10], status: r[11] });
        }
    }

    return jsonArray;

}


function doGet(e) {
    const response = { status: 200, data: {} };
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ws;
    //    Data from client
    const body = JSON.stringify(e.parameter.action);
    const data = JSON.parse(body);


    const dt = JSON.parse(body);
    //action get bill order
    if (data == "GET_BILL_ORDER") {
        //        Function get data from sheet DONHANG
        try {

            //        const result_data_order = ; 
            response.status = 200; response.data = get_data_order();
        }
        catch (e) {

            response.status = 400;

        }

    }
    else if (data == "GET_CUSTOMER") {
        try {

            //        const result_data_order = ; 
            response.status = 200; response.data = get_data_customer();
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

function delete_row(row, sheet_name) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ws;
    if (sheet_name == "SALE_01") {
        ws = ss.getSheetByName(sheet_name_get);
        if (row) {
            ws.deleteRow(row);

        }

    }
    else if (sheet_name == "DONHANG") {
        ws = ss.getSheetByName(sheet_name_order);
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


function test() {
    //    dt = [
    //        ["DH009", "Nguyễn Thị Huyền", 1, "yeu cau", "0974492262", "Nguyễn Tiến Vượng", "Đã xử lý xong", "ghi chu", "8/24/2020, 3:46:40 PM"]
    //    ]
    //
    //    update_data_order(dt, 1996);
    var result = get_data_customer();
    Logger.log(result);
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
                data.fee_ship, data.money_box, data.sum_money_order, data.create_at, data.phone_number, data.address, data.note, data.email_user_edit]
            ];

            sheet.getRange(sheet.getLastRow() + 1, 1, 1, 13).setValues(dt_save);
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
    else if (data.action == "DELET_ORDER") {
        try {
            delete_row(data.row, sheet_name_order);
            response.status = 200; response.message = "Xóa đơn hàng thành công!";

        } catch (e) {

            response.status = 400; response.message = "Lỗi, có vẻ như hệ thống đang gặp vấn đề nào đó!";

        }


    }

    //

    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);


}