"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let Delegate = class Delegate {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], Delegate.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Delegate.prototype, "firstName", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Delegate.prototype, "lastName", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 150,
        unique: true
    }),
    tslib_1.__metadata("design:type", String)
], Delegate.prototype, "email", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 20
    }),
    tslib_1.__metadata("design:type", String)
], Delegate.prototype, "phone", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Delegate.prototype, "country", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Delegate.prototype, "occupation", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Delegate.prototype, "organisation", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Delegate.prototype, "member", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Delegate.prototype, "referringChannel", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Delegate.prototype, "firstConference", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Delegate.prototype, "referrer", void 0);
tslib_1.__decorate([
    typeorm_1.CreateDateColumn({
        name: "createdAt",
        nullable: false
    }),
    tslib_1.__metadata("design:type", Date)
], Delegate.prototype, "createdAt", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        nullable: true
    }),
    tslib_1.__metadata("design:type", String)
], Delegate.prototype, "paid", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        type: "datetime",
        nullable: true
    }),
    tslib_1.__metadata("design:type", Date)
], Delegate.prototype, "paidAt", void 0);
tslib_1.__decorate([
    typeorm_1.UpdateDateColumn({
        name: "updatedAt",
        nullable: true
    }),
    tslib_1.__metadata("design:type", Date)
], Delegate.prototype, "updatedAt", void 0);
Delegate = tslib_1.__decorate([
    typeorm_1.Entity()
], Delegate);
exports.Delegate = Delegate;
