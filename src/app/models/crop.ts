import { Parcel } from "./parcel";

export class Crop {
    idCrop: number = 0;
    typeCrop: string = "";
    sowingDate: string = "";
    estimatedHarvestDate: Date = new Date();
    actualState: string = "";
    parcel: Parcel = new Parcel(); 
}