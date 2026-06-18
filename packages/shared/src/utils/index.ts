import type { ApiResponse, Pagination } from '../types/index.js';

export function success<T>(data: T, message?: string): ApiResponse<T> {
  return { success: true, data, message };
}

export function successPaginated<T>(data: T, pagination: Pagination): ApiResponse<T> {
  return { success: true, data, pagination };
}

export function paginate(page: number, limit: number, total: number): Pagination {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}
