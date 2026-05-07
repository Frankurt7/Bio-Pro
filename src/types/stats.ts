export interface BodyEntry {
  id: string;
  date: string; // ISO string
  weight: number;
  bmi: number;
  bodyFatPercent: number;
  bodyFatWeight: number;
  skeletalMusclePercent: number;
  skeletalMuscleWeight: number;
  musclePercent: number;
  muscleWeight: number;
  waterPercent: number;
  waterWeight: number;
  visceralFat: number;
  boneMass: number;
  bmr: number;
  proteinPercent: number;
  obesityDegree: number;
  metabolicAge: number;
  fatFreeWeight: number;
}

export enum StatRating {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  OBESE = 'obese',
  PERFECT = 'perfect'
}
