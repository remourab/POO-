import { App } from './app';
import { Bike } from './bike';
import { User } from './user';
import { Rent } from './rent';

describe('App', () => {
  let app: App;

  beforeEach(() => {
    app = new App();
  });

  it('É necessário registrar o usuário', async () => {
    const user = new User('test@example.com', 'password');
    const userId = await app.registerUser(user);
    expect(userId).toBeDefined();
    expect(app.users).toContain(user);
  });

  it('É necessário registrar a bike', () => {
    const bike = new Bike('Bike1', 10.0);
    const bikeId = app.registerBike(bike);
    expect(bikeId).toBeDefined();
    expect(app.bikes).toContain(bike);
  });

  it('É necessário alugar a bike para um usuário', () => {
    const bike = new Bike('Bike1', 10.0);
    const user = new User('test@example.com', 'password');
    app.registerUser(user);
    const bikeId = app.registerBike(bike);
    app.rentBike(bikeId, user.email);
    const rentedBike = app.rents.find((rent) => rent.bike.id === bikeId && !rent.end);
    expect(rentedBike).toBeDefined();
    expect(rentedBike?.user).toBe(user);
    expect(rentedBike?.bike).toBe(bike);
  });

  it('É necessário retornar a bike e calcular o aluguel', () => {
    const bike = new Bike('Bike1', 10.0);
    const user = new User('test@example.com', 'password');
    app.registerUser(user);
    const bikeId = app.registerBike(bike);
    app.rentBike(bikeId, user.email);

    const now = new Date();
    now.setHours(now.getHours() + 2);

    const rentAmount = app.returnBike(bikeId, user.email);
    expect(rentAmount).toBe(20.0); 
  });

});
