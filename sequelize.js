
import Sequelize from 'sequelize';
import config from 'config';

const options = {
  "dialect": config.get("pg.dialect"),
  "host": config.get("pg.host"),
  "port": config.get("pg.port"),
  "database": config.get("pg.database"),
  "user": config.get("pg.user"),
  "password": config.get("pg.password")
}

export const sequelize = new Sequelize(options.database, options.user, options.password, {
  host: options.host,
  dialect: options.dialect,
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
export const Op = Sequelize.Op;
// Or you can simply use a connection uri
// export const sequelize = new Sequelize('postgres://postgres:123456@localhost:5432/postgres');
