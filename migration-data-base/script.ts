const { Pool } = require('pg');
const fs = require('fs');
console.log('-------------- INICIANDO MIGRACION ------------------');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'my_db',
  password: '1234',
  port: 5432,
});

console.log(
  '-------------- GENERANDO MIGRACION ------------------',
  pool.options
);
migration();

async function migration() {
    const dataFile = fs.readFileSync(`migration-data-base/data.sql`, {
        encoding: 'utf8',
        flag: 'r',
      });

  const resultados = await pool
    .query(dataFile)
    .then(
      function (user) {
        console.log('-------------- CREACION DE TABLAS ------------------', user.command);
        
        return user.command;
      },
      function (err) {console.log('-------------- ERROR AL CREAR TABLAS ------------------', err);
      }
    );
  return resultados;
}
