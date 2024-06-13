import 'dotenv/config'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { serviceAccountAuth } from "./auth.js"
import fs from 'fs'



async function initSpreadSheet() {
    const sheetIdPath = process.env.SHEET_ID_PATH;
    const configPath = process.env.CONFIG_PATH;
    try {
        const content = await fs.promises.readFile(sheetIdPath);
        const sheetId = JSON.parse(content);
        
        const content2 = await fs.promises.readFile(configPath);
        const config = JSON.parse(content2);
        //read the speadsheet document
        const doc = new GoogleSpreadsheet(sheetId.id, serviceAccountAuth);
        await doc.loadInfo(); // loads document properties and worksheets

        let sheet = doc.sheetsByTitle[config.workers.title];
        if (!sheet) {
            const newSheet1 = await doc.addSheet({ title: config.workers.title, headerValues: config.workers.headers});
        }
        sheet = doc.sheetsByTitle[config.tasks.title];
        if (!sheet) {
            const newSheet2 = await doc.addSheet({ title: config.tasks.title, headerValues: config.tasks.headers});
        }
        sheet = doc.sheetsByTitle[config.days.title];
        if (!sheet) {
            const newSheet3 = await doc.addSheet({ title: config.days.title, headerValues: config.days.headers });
        }
        return doc;
    }
    catch (err)
    {
        console.log(`Error: ${err}`);
        return null;
    }
}

async function addRow(sheet,data){
    const rows = await sheet.getRows();
    data.ID = ++rows.length;
    return await sheet.addRow(data,{raw : true});;
}

async function deleteRow(sheet,id){
    const rows = await sheet.getRows();
    rows[id].delete();
}

export {initSpreadSheet, addRow, deleteRow}