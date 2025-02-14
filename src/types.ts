export interface HealthData {
  timestamp: Date;
  temperature: number;
  humidity: number;
  spo2: number;
  prediction: string;
}

export interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  trend: number;
  prediction: string;
}