const { Pool } = require("pg");

module.exports = new Pool({
  connectionString: 'postgres://koyeb-adm:lyJoY6wTX8FP@ep-silent-fire-a45vprnf.us-east-1.pg.koyeb.app/koyebdb',
  ssl: { rejectUnauthorized: false }
});