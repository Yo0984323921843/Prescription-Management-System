const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./database.db");
const name = document.getElementById
console.log('hahahha ',name)
db.serialize(() => {
  db.run(`insert into customers(name,email_id,address,mobile_no) values `);
});
document.querySelector("#submit").addEventListener("click", async () => {});