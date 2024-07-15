export interface CreateCategoryRequest {
  name: string;
}

export interface CreateCategorySuccess {
  id: number;
  user_id: number;
  name: string;
  is_active: number;
}
