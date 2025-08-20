
export enum Severity {
  CRITICAL = 'Critical',
  WARNING = 'Warning',
  SUGGESTION = 'Suggestion',
  NITPICK = 'Nitpick'
}

export interface FeedbackItem {
  line: string;
  severity: Severity;
  comment: string;
  suggestion: string;
}

export interface ReviewResponse {
  feedback: FeedbackItem[];
}
