"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
const sqllite3 = require('sqlite3');
const child_process_1 = require("child_process");
new sqllite3.Database('./database/db.todo', sqllite3.OPEN_READWRITE | sqllite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    }
    else {
        (0, child_process_1.exec)('node ace migration:refresh');
        console.log('Connected to database.');
    }
});
Route_1.default.group(() => {
    Route_1.default.resource('/notas', 'NotasController').apiOnly();
}).prefix('/api');
//# sourceMappingURL=routes.js.map