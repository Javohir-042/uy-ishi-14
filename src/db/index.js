import { Pool } from "pg";

const pg = new Pool({
    connectionString: 'postgres://postgres:1234@localhost/n23'
});

export default pg;