import { Parcel } from "./parcel";

export class Crop {
    idCrop: number = 0;
    typeCrop: string = "";
    sowingDate: string = "";
    estimatedHarvestDate: number = 0;
    actualState: string = "";
    parcel: Parcel = new Parcel(); 
}