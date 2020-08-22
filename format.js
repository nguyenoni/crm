var sheet_name_get = "SALE_01";
function doGet(e) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ws = ss.getSheetByName(sheet_name_get);

    const data = ws.getRange("A3").getDataRegion().getValues();
    const headers = data.shift();
    const jsonArray = [];

    for (var i = 0; i < data.length; i++) {
        var r = data[i];
        if (r[0] === "") {
            break;
        } else if (i !== 0) {
            jsonArray.push({ row: r[0], date: r[1], id_customer: r[2], name: r[3], quantity: r[4], require: r[5], phone: r[6], name_sale_process: r[7], status_sale: r[8], note: r[9], creat_at: r[10], status: r[11] });
        }
    }

    const response = [{ status: 200, data: jsonArray }];
    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
}

function change_status(row) {
    const sheetActive = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = sheetActive.getSheetByName('SALE_01');
    let range = "L" + row.toString();
    sheet.getRange(range).setValue(TRUE);
}

function doPost(e) {


    const response = { status: 400, message: "" };
    const body = JSON.stringify(e.parameter);
    const data = JSON.parse(body);


    //
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

    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);


}