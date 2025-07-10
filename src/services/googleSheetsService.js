import { google } from 'googleapis';
import config from '../config/env.js';

const sheets = google.sheets('v4');

async function addRowToSheet(auth, spreadsheetId, values) {
    const request = {
        spreadsheetId,
        range: 'reservas',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            values: [values],
        },
        auth,
    };

    try {
        const response = await sheets.spreadsheets.values.append(request);
        return response.data;
    } catch (error) {
        console.error('Error al agregar fila:', error);
        throw error;
    }
}

const appendToSheet = async (data) => {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: config.GCP_CREDENTIALS,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const authClient = await auth.getClient();
        const spreadsheetId = config.SPREADSHEET_ID;

        await addRowToSheet(authClient, spreadsheetId, data);
        return 'Datos correctamente agregados';
    } catch (error) {
        console.error('Error en appendToSheet:', error);
        throw error;
    }
};

export default appendToSheet;