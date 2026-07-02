import { apiFetch } from './apiClient'
import type { FoodItemDto } from '~/types/api'

export const foodsService = {
  async getFoods(stage?: 'PREGNANT' | 'POSTPARTUM'): Promise<{ foods: FoodItemDto[] }> {
    return apiFetch<{ foods: FoodItemDto[] }>('/api/foods', {
      params: stage ? { stage } : undefined,
    })
  },
}
