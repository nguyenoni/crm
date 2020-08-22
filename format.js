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
// 
function doPost(e) {
    //const body = e.postData;
    //const bodyJSON = JSON.parse(body)
    Logger.log(JSON.stringify(e));

    const response = [{ status: 200, data: "post" }];

    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);

}