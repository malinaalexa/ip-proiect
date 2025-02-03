export default class RewardModel {
    constructor({ id, name, image, pointsRequired, stock }) {
      this.id = id;
      this.name = name;
      this.image = image;
      this.pointsRequired = pointsRequired;
      this.stock = stock;
    }
  
    static fromServerResponse(data) {
      return new RewardModel({
        id: data.id,
        name: data.name,
        image: data.image,
        pointsRequired: data.points_required,
        stock: data.stock,
      });
    }
  }
  