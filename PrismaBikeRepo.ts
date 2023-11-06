//renata moura barreto - 163983

import { Bike } from "../../../src/bike";
import prisma from "../../../src/external/database/db";
import { PrismaBikeRepo } from "../../../src/external/database/prisma-bike-repo";

describe('PrismaBikeRepo', () => {
  beforeEach(async () => {
    await prisma.bike.deleteMany({});
  });

  afterAll(async () => {
    await prisma.bike.deleteMany({});
  });

  it('adiciona uma bicicleta no banco de dados', async () => {
    const bikeToBePersisted = new Bike(
      'mountain bike',
      'mountain',
      20,
      100,
      10,
      'mountain bike',
      5,
      ['http://image1.com', 'http://image2.com'],
    );

    // Instancia o repositório Prisma para bicicletas
    const repo = new PrismaBikeRepo();

    // Adiciona a bicicleta ao banco de dados.
    const bikeId = await repo.add(bikeToBePersisted);

    //verifica se o ID da bicicleta foi atribuído
    expect(bikeId).toBeDefined();

    //verifica se os dados são os mesmos.
    const persistedBike = await repo.find(bikeId);
    expect(persistedBike.name).toEqual(bikeToBePersisted.name);
    expect(persistedBike.imageUrls.length).toEqual(2);
  });

  it('remove uma bicicleta do banco de dados', async () => {
    const bikeToBePersisted = new Bike(
      'mountain bike',
      'mountain',
      20,
      100,
      10,
      'mountain bike',
      5,
      ['http://image1.com', 'http://image2.com'],
    );
    const repo = new PrismaBikeRepo();
    const bikeId = await repo.add(bikeToBePersisted);

    await repo.remove(bikeId);

    const removedBike = await repo.find(bikeId);
    expect(removedBike).toBeNull();
  });

  it('lista bicicletas no banco de dados', async () => {
    // Cria e adiciona duas bicicletas ao banco de dados
    const bike1 = new Bike(
      'mountain bike',
      'mountain',
      20,
      100,
      10,
      'mountain bike',
      5,
      ['http://image1.com', 'http://image2.com'],
    );
    const bike2 = new Bike(
      'road bike',
      'road',
      18,
      150,
      8,
      'road bike',
      3,
      ['http://image3.com', 'http://image4.com'],
    );

    const repo = new PrismaBikeRepo();
    await repo.add(bike1);
    await repo.add(bike2);

//verifica se o número esperado foi retornado
    const bikeList = await repo.list();
    expect(bikeList.length).toEqual(2);
  });

  it('deve atualizar a disponibilidade de bicicleta no banco de dados', async () => {
    // Cria e adiciona uma bicicleta ao banco de dados
    const bikeToBePersisted = new Bike(
      'mountain bike',
      'mountain',
      20,
      100,
      10,
      'mountain bike',
      5,
      ['http://image1.com', 'http://image2.com'],
    );
    const repo = new PrismaBikeRepo();
    const bikeId = await repo.add(bikeToBePersisted);

    // Atualiza a disponibilidade da bicicleta para "false" no banco de dados
    await repo.updateAvailability(bikeId, false);

    // Verifica se a disponibilidade foi atualizada corretamente.
    const updatedBike = await repo.find(bikeId);
    expect(updatedBike.available).toBeFalsy();
  });

  it('deve atualizar a localização da bicicleta no banco de dados', async () => {
    const bikeToBePersisted = new Bike(
      'mountain bike',
      'mountain',
      20,
      100,
      10,
      'mountain bike',
      5,
      ['http://image1.com', 'http://image2.com'],
    );
    const repo = new PrismaBikeRepo();
    const bikeId = await repo.add(bikeToBePersisted);

    await repo.updateLocation(bikeId, 10.5, 20.5);

  });
});



