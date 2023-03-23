export interface QuotationModel {
  id: string;
  day: Date;
  close: number;
  closeVariation: number;
  open: number;
  openVariation: number;
  high: number;
  highVariation: number;
  low: number;
  lowVariation: number;
  volume: number;
  volumeVariation: number;
}
