import { initSpreadSheet, addRow, deleteRow } from "./crudSheet.mjs"

import 'dotenv/config'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { serviceAccountAuth } from "./auth.js"
import fs from 'fs'

try {
    const configPath = process.env.CONFIG_PATH;
    const content = await fs.promises.readFile(configPath);
    const config = JSON.parse(content);

    const doc = await initSpreadSheet();

    const workers = doc.sheetsByTitle[config.workers.title];
    const tasks = doc.sheetsByTitle[config.tasks.title];
    const days = doc.sheetsByTitle[config.days.title];

    let worker = {
        ID : 1,
        Name: "Massi",
        DayOff: 2,
        AbleToWork: "5,3,7",
        CannotWork: 11

    }
    const row = await addRow(workers,worker);
    console.log(row);
    //deleteRow(workers,2);
}
catch (err) {
    console.log(err);
}

