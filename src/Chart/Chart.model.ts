export interface ChartData {
  name: string;
  values: ChartValues[];
}

interface ChartValues {
  temperature: number;
  date: Date;
}
