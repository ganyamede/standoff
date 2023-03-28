const Pool = require("pg").Pool;
const pool = new Pool({
    user: 'postgres',
    password: '999988qq',
    host: 'localhost',
    port: 5432,
    database: 'postgres'
});

pool.query(`CREATE TABLE IF NOT EXISTS "vk_acc" (
    id INTEGER,
    login TEXT,
    password TEXT
)`)

pool.query(`CREATE TABLE IF NOT EXISTS "usersss" (
    id TEXT,
    username TEXT,
    password TEXT,
    value INTEGER
)`)



async function Delete(id) {
    pool.query(`DELETE FROM usersss WHERE id = '${id}'`)
}

async function DeleteForm(id, login, password) {
     pool.query(`DELETE FROM vk_acc WHERE id = '${id}' and login = '${login}' and password = '${password}'`)
}

async function Update(id, value) {
    await pool.query(`UPDATE usersss SET value = value + ${value} WHERE id = '${id}'`)
}

async function Insert(id, login, password) {
    await pool.query(`INSERT INTO vk_acc (id, login, password) VALUES ($1, $2, $3)`, [id, login, password] );
}

async function InsertAccout(id, username, password) {
    await pool.query(`INSERT INTO usersss (id, username, password, value) VALUES ($1, $2, $3, $4)`, [id, username, password, 0]);
}

async function CheckPassword(password, id) {
    try {
        const select_password = await pool.query(`SELECT password FROM usersss WHERE id = '${id}'`)
        return select_password.rows[0].password===password

    } catch {
        return false
    }
}
async function Select() {
    var result = await pool.query(`SELECT * FROM vk_acc`);
    return result.rows
}

async function SelectWhereID(id) {
    var result = await pool.query(`SELECT * FROM usersss WHERE id = '${id}'`);
    return result.rows
}

async function SelectNameFromId(name) {
    var result = await pool.query(`SELECT id FROM usersss WHERE username = '${name}'`)
    return result.rows
}

async function SelectAccount() {
    var result = await pool.query(`SELECT * FROM usersss`);
    return result.rows
}

module.exports = {InsertAccout, Insert, CheckPassword, Select,SelectAccount, Update, SelectWhereID, Delete, pool, SelectNameFromId, DeleteForm}
