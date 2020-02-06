"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Delegate = class Delegate {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Delegate.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Delegate.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Delegate.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 150,
        unique: true
    }),
    __metadata("design:type", String)
], Delegate.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 20
    }),
    __metadata("design:type", String)
], Delegate.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Delegate.prototype, "country", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Delegate.prototype, "occupation", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Delegate.prototype, "organisation", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Delegate.prototype, "member", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true
    }),
    __metadata("design:type", String)
], Delegate.prototype, "membershipCode", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Delegate.prototype, "referringChannel", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Delegate.prototype, "firstConference", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Delegate.prototype, "referrer", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        name: "createdAt",
        nullable: false
    }),
    __metadata("design:type", Date)
], Delegate.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true
    }),
    __metadata("design:type", String)
], Delegate.prototype, "paid", void 0);
__decorate([
    typeorm_1.Column({
        type: "datetime",
        nullable: true
    }),
    __metadata("design:type", Date)
], Delegate.prototype, "paidAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        name: "updatedAt",
        nullable: true
    }),
    __metadata("design:type", Date)
], Delegate.prototype, "updatedAt", void 0);
Delegate = __decorate([
    typeorm_1.Entity()
], Delegate);
exports.Delegate = Delegate;
