/**
 * Execute sql queries
 *
 * @param sql
 * @param params
 *
 * @returns {resolve} results
 */

import SQLite from 'react-native-sqlite-storage';

//SQLite.DEBUG(true);
SQLite.enablePromise(false);
//SQLite.DEBUG(true);

global.db = SQLite.openDatabase(
    {
        name: 'inmob.db',
        location: 'default',
        createFromLocation: '~inmob.db',
    },
    () => {
    },
    error => {
       // console.log('ERROR: ' + error);
    },
);


const queryRows = (rows) => {
    const result = [];

    for (let i = 0; i < rows.length; i++) {
        let item = rows.item(i);
        result.push(item);
    }

    return result;
};

/*DATA BASE*/

const ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
    db.transaction((trans) => {
        trans.executeSql(sql, params, (trans, results) => {
                resolve(results);
            },
            (error) => {
               // console.log(error);
                reject(error);
            });
    });
});

/*Create tables*/

export const CreateTable = async () => {
    await ExecuteQuery('CREATE TABLE IF NOT EXISTS session (idSession VARCHAR(5) PRIMARY KEY NOT NULL, identificacion VARCHAR(10), email VARCHAR(50), clave VARCHAR(20), expirationToken VARCHAR(20),sessionStatus INTEGER)', []);
    await ExecuteQuery('CREATE TABLE IF NOT EXISTS avatarTable (uid VARCHAR(5) PRIMARY KEY NOT NULL, uriPath VARCHAR(200))', []);
};


/*PROCESS*/

const QUERY_SESSION = 'SELECT * FROM session';
const INSERT_CREDENTIALS = 'INSERT INTO session (idSession, identificacion, email, clave, expirationToken, sessionStatus) VALUES ( ?, ?, ?, ?, ?, ?)';
const UPDATE_SESSION = 'UPDATE session SET sessionStatus = ?, identificacion = ?, email = ?, clave = ? WHERE idSession = ?';
const UPDATE_SESSION_STATUS = 'UPDATE session SET sessionStatus = ? WHERE idSession = ?';

export const querySession = async () => {
    let selectQuery = await ExecuteQuery(QUERY_SESSION, []);

    let rows = selectQuery.rows;

    return queryRows(rows);
};

export const insertCredentials = async data => {
    await ExecuteQuery(INSERT_CREDENTIALS, data);
};

export const updateSession = async update => {
    await ExecuteQuery(UPDATE_SESSION, update);
};

export const updateSessionStatus = async update => {
    await ExecuteQuery(UPDATE_SESSION_STATUS, update);
};

/*LOCAL PICTURE*/

const QUERY_AVATAR_PATH = 'SELECT * FROM avatarTable';
const INSERT_AVATAR_PATH = 'INSERT INTO avatarTable (uid, uriPath) VALUES (?,?)';
const UPDATE_AVATAR_PATH = 'UPDATE avatarTable SET uriPath = ? WHERE uid = ?';

export const queryAvatar = async () => {
    let selectQuery = await ExecuteQuery(QUERY_AVATAR_PATH, []);

    let rows = selectQuery.rows;

    return queryRows(rows);
};

export const insertAvatarPath = async data => {
    await ExecuteQuery(INSERT_AVATAR_PATH, data);
};

export const updateAvatarPath = async update => {
    await ExecuteQuery(UPDATE_AVATAR_PATH, update);
};
