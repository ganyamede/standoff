const Pool = require("pg").Pool;
const pool = new Pool({
    user: 'postgres',
    password: '999988qq',
    host: 'localhost',
    port: 5432,
    database: 'dbname'
});

pool.query(`CREATE TABLE IF NOT EXISTS "vk_acc" (
    id INTEGER,
    login TEXT,
    password TEXT
)`)

pool.query(`CREATE TABLE IF NOT EXISTS "userss" (
    id TEXT,
    username TEXT,
    value INTEGER
)`)



async function Delete(id) {
    pool.query(`DELETE FROM userss WHERE id = '${id}'`)
}

async function Update(id, value) {
    await pool.query(`UPDATE userss SET value = value + ${value} WHERE id = '${id}'`)
}

async function Insert(id, login, password) {
    await pool.query(`INSERT INTO vk_acc (id, login, password) VALUES ($1, $2, $3)`, [id, login, password] );
}

async function InsertAccout(id, username) {
    await pool.query(`INSERT INTO userss (id, username, value) VALUES ($1, $2, $3)`, [id, username, 0]);
}

async function Select() {
    var result = await pool.query(`SELECT * FROM vk_acc`);
    return result.rows
}

async function SelectWhereID(id) {
    var result = await pool.query(`SELECT * FROM userss WHERE id = '${id}'`);
    return result.rows
}

async function SelectAccount() {
    var result = await pool.query(`SELECT * FROM userss`);
    return result.rows
}

module.exports = {InsertAccout, Insert, Select,SelectAccount, Update, SelectWhereID, Delete, pool}