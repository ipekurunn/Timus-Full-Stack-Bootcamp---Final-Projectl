"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbProvider = void 0;
const db_service_1 = require("./db.service");
const constants_1 = require("../constants");
exports.dbProvider = {
    provide: constants_1.PG_CONNECTION,
    useFactory: (dbService) => dbService.getPool(),
    inject: [db_service_1.DbService],
};
