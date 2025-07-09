import { Crop } from "./crop";

export class Recommendation {
    idRecommendation: number = 0;
    type: string = "";
    description: string = "";
    issueDate: Date = new Date();
    source: string = "";
    crop: Crop = new Crop();
}