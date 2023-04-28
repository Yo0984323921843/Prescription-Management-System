var dbmgr = require("./dbmgr");
var db = dbmgr.db;

exports.getUsers=()=>{
    const sql = "select email_id from users";
    let stmt = db.prepare(sql);
    let res = stmt.all();
    return res;

}