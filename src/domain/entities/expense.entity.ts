interface Entity {
  id: string;
  name: string;
  category: string;
  quantity: number;
  date: Date;
}

export class Expense {
  public id: string;
  public name: string;
  public category: string;
  public quantity: number;
  public date: Date;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.name = entity.name;
    this.category = entity.category;
    this.quantity = entity.quantity;
    this.date = entity.date;
  }
}
