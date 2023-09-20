class NoRegister extends Error {
  constructor() {
    super('Bike not found.');
    this.name = 'NoRegister';
  }
}
