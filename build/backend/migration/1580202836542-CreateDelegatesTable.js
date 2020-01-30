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
class CreateDelegatesTable1580202836542 {
    constructor() {
        this.name = 'CreateDelegatesTable1580202836542';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query("CREATE TABLE `delegate` (`id` int NOT NULL AUTO_INCREMENT, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `email` varchar(150) NOT NULL, `phone` varchar(20) NOT NULL, `country` varchar(255) NOT NULL, `occupation` varchar(255) NOT NULL, `organisation` varchar(255) NOT NULL, `member` varchar(255) NOT NULL, `referringChannel` varchar(255) NOT NULL, `firstConference` varchar(255) NOT NULL, `referrer` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `paid` varchar(255) NULL, `paidAt` datetime NULL, `updatedAt` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_25a0a573102df045065d2ac19f` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query("DROP INDEX `IDX_25a0a573102df045065d2ac19f` ON `delegate`", undefined);
            yield queryRunner.query("DROP TABLE `delegate`", undefined);
        });
    }
}
exports.CreateDelegatesTable1580202836542 = CreateDelegatesTable1580202836542;
