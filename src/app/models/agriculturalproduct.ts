import { Crop } from "./crop"

export class AgriculturalProduct{
    idProduct:number=0
    name:string=""
    quantity:number=0
    unitMeasure:string=""
    harvestDate:Date=new Date()
    crop:Crop = new Crop
}