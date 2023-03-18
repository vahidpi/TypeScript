"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uri = exports.disconnect = exports.connect = void 0;
const mongodb_1 = require("mongodb");
const uri = "mongodb+srv://mongo:xxx@cluster0.bsyzi4a.mongodb.net/test";
exports.uri = uri;
const client = new mongodb_1.MongoClient(uri);
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("Connected to MongoDB Atlas");
        }
        catch (err) {
            console.error(err);
        }
    });
}
exports.connect = connect;
function disconnect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.close();
            console.log("Disconnected from MongoDB Atlas");
        }
        catch (err) {
            console.error(err);
        }
    });
}
exports.disconnect = disconnect;
//# sourceMappingURL=db.js.map