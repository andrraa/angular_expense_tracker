export interface CreateExpenseRequest {
  type_id: number;
  category_id: number;
  name: string;
  amount: string;
}

export interface ExpenseSuccess {
  id: number;
  type_id: number;
  category_id: number;
  name: string;
  amount: string;
  date: string;
}

export interface ExpenseTypeSuccess {
  id: number;
  name: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}
