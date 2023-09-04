import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import * as crypto from 'crypto';


export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    /*findUser(email: string): boolean {
        return this.users.find(user => user.email === email)// return oq?
    }*/

    registerUser(user: User): void {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        user.id = crypto.randomUUID()
        this.users.push(user)
    }
/////////////////////////////////////////////////////////////////////////////////////////
    returnBike(rent: Rent, returnDate: Date): void { //rent do tipo Rent
        let irent = this.rents.findIndex(r => r === rent);

        if (irent === -1) {
            throw new Error('Rent not found.'); //verifica se existe
        }
        this.rents[irent].dateReturned = returnDate;
    }
    
    registerBike(bike: Bike): void {
        let newId = crypto.randomUUID();
        bike.id = newId;
        this.bikes.push(bike);
    }
    
    removeUser(user: User): void {
        let reuser = this.users.findIndex(rUser => rUser.email === user.email);
    
        if (reuser === -1) {
            throw new Error('User not found'); //mesma lógica do return bike
        }
        this.users.splice(reuser, 1);
    }
    
    rrentBike(bikeId: string, userEmail: string, startDate: Date, endDate: Date): void {
        const idbike = this.bikes.find(b => b.id === bikeId); //procuar a bike com id
        if (!idbike) {
            throw new Error('Bike not found.'); //n achou
        }
    
        const user_email = this.users.find(user => user.email === user_email); //verifica o email
        if (!user_email) {
            throw new Error('User not found.');
        }
    
        if (!Rent.canRent(this.rents, startDate, endDate)) { 
            throw new Error('Bike is not available for the selected dates.');
        }

        const verify_date =this.rents.filter(rent => rent.bike.id === bikeId);//ver se a data ta disponível
        if(!Rent.canRent(verify_date, startDate, endDate)){
            throw new Error('Bike is not available for the selected dates.');
        }
    
        const new_rent = Rent.create(this.rents, idbike, user_email, startDate, endDate);
        this.rents.push(new_rent);//cria novo aluguel
    }

}