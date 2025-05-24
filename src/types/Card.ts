export interface CardProps {
  id: string;
  name: string;
  number: string;
  expiry: string;
  frozen: boolean;
  cvv: string;
  availableBalance: number;
  currency: string;
  currentSpentAmount: number;
  maxLimit: number;
}
