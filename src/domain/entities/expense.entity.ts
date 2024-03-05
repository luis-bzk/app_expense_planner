interface Entity {
  id: string;
  name: string;
  category: string;
  quantity: number;
}

export class Expense {
  public id: string;
  public name: string;
  public category: string;
  public quantity: number;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.name = entity.name;
    this.category = entity.category;
    this.quantity = entity.quantity;
  }
}
