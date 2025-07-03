export interface CropsNeedingAttention {
  idCrop: number;
  typeCrop: string;
  name: string;
  sowingDate: string; // formato 'YYYY-MM-DD'
  actualState: string;
}