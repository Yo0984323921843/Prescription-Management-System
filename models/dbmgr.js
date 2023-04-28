const sqlite = require('better-sqlite3-with-prebuilds');
const db = new sqlite('../database.db');
exports.db = db;