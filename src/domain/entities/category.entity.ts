interface Entity {
  id: string;
  label: string;
}
export class Category {
  public id: string;
  public label: string;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.label = entity.label;
  }
}
