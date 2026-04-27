
export interface DatasetField {
  name: string;
  meaning: string;
  type: string;
}

export interface Dataset {
  filename: string;
  fields: DatasetField[];
  sampleData: string[][];
}

export interface MultipleChoiceQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  dataset: Dataset;
  codeTemplate: string;
  expectedResults: string[];
  advancedTasks: string[];
  multipleChoiceQuestions?: MultipleChoiceQuestion[];
}
