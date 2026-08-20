export interface CategoryResponse {
    id: number;
    name: string;
}

export type CategoryCreateRequest = Omit<CategoryResponse, 'id'>;