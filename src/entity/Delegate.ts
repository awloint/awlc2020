import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Delegate {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column({
        type: "varchar",
        length: 150,
        unique: true
    })
    email!: string;

    @Column({
        type: "varchar",
        length: 20
    })
    phone!: string;

    @Column()
    country!: string;

    @Column()
    occupation!: string;

    @Column()
    organisation!: string;

    @Column()
    member!: string;

    @Column()
    referringChannel!: string;

    @Column()
    firstConference!: string;

    @Column()
    referrer!: string;

    @CreateDateColumn({
        name: "createdAt",
        nullable: false
    })
    createdAt!: Date;

    @Column({
        nullable: true
    })
    paid!: string;

    @Column({
        type: "datetime",
        nullable: true
    })
    paidAt!: Date;

    @UpdateDateColumn({
        name: "updatedAt",
        nullable: true
    })
    updatedAt!: Date;
}
