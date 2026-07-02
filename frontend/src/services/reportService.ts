import api from "./api";

export interface WeeklyReport {
  moodSummary: string;
  journalSummary: string;
  achievements: string[];
  stressTriggers: string[];
  positiveHabits: string[];
  recommendations: string[];
  actionPlan: string;
}

export const getWeeklyReport = () =>
  api.get<{ report: WeeklyReport }>("/reports/weekly");
