const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0FFMDVuZjJjZ1NJVHZhSmFJaFp4SDJIVGNKRWdVbWM4UmJrMklqWW0yOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUEJrMGltbVJYSjJQanlTSk9RZElHdlZBSU1sdjY3YlUwK3hPcjNENmZYYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXS3BzRDU5OEd2aG00MThlNmdyVE5xbTdOd3RuR0crTy9xT0h0bTVMWlgwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBUzJJNWRQdUJmUmZiWlNnbWFrNVZSWGRLVzdMU0xaenQ1Z3BZdHpjalZRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklLZ0o3UitadzBENTFRcllPSzg2NFBQWlRTTWlhT0h6bmk5RG9JYXJ4SHM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJWUmdpM3JtakRpRFZtZThiTEg4cExuUjZSV0FIa0pZVFZVQ2cyZkMwaUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUM2NVkzUEd6dXVOWTNlb1pVRkpiaHZ5MVFId1lNN09hVGxwSWxkVm0wTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FhdVpJTUhqM3RiaDVvK0RNUEI2RUZ1aUw3RXo1SFdzK3pGWW54SnB5Zz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkttdWdXc3hLUmJudkdhZk5BR2pxQ0RsdHMybWJCUlpRRm5LT3pod2ZBWkNOY3EzdTBMM2d2cEtSbzZWYVJXbWh5VFppTm5TRERqSXdRYVlrSUpjTkJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTMsImFkdlNlY3JldEtleSI6IllNT3J4NXM2MUg3NmdaZy9BckcrSnZFWFJmd0pyMlZRRk90cWtjaityU1E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjc3MzYyNjc3NjhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiODYzMUZDODEwOTY2QkMzNkUzQjBDRjEyQjJEN0RBRjIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMTMyNDkyMX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoidmNWTFZuSzVTYWFUV1ZuOHVDUFNZUSIsInBob25lSWQiOiJlNzU3ZDYxMi1hOTQ1LTQ3NmEtYjAyNi0wODlmOTIyM2VkOTUiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSEVCeFNVRmJkQWpPRTV4bFYzV1ZVbE1xcTAwPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imp3ejl5dFR0c3RiOGVYWDBjWjMyLzR6R3Vpaz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJBUE1URlFSTiIsIm1lIjp7ImlkIjoiMjc3MzYyNjc3Njg6NjhAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi4oCUU2xhZGXigJQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BTZzVoOFE2S3JsdEFZWUFpQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlF5RlhvZm0yNENBVFVJK09QaldOZ1BMN0thZU1xQno5OHlYVXBuYUt6UTQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImZuSS9tT1pIb0QveGZsanpyQTRFcHl0Mk51NTlCK056NndmQXFNd3dJWjN1aWdJMllIZjJySzliUzBUNDkzYkxwMWtGRXVNU1BHdVpCaDlCckJtZkJBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI2VU5RSnpuZEwvRTdSYWJ6K2o1enJuQjhlakdGbnBJSFdRbGlMcXEzN2MrWmFjemJsRjNmV1Rxbm5jK1N3RU16UFVSeWlTVXRVclpHNFlyUmlLV0xBQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI3NzM2MjY3NzY4OjY4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVNaFY2SDV0dUFnRTFDUGpqNDFqWUR5K3ltbmpLZ2MvZk1sMUtaMmlzME8ifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjEzMjQ5MTYsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTnpRIn0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Tsepo Mohlomi",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "27736267768",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'Tsepo_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/dcce2ddee6cc7597c859a.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
