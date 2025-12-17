import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import api from '@/services/api'

export function useApiQuery<T>(
  key: string[],
  endpoint: string,
  options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>
) {
  return useQuery<T>({
    queryKey: key,
    queryFn: async () => {
      const { data } = await api.get(endpoint)
      return data
    },
    ...options,
  })
}

export function useApiMutation<T, V>(
  endpoint: string,
  options?: UseMutationOptions<T, Error, V>
) {
  return useMutation<T, Error, V>({
    mutationFn: async (variables) => {
      const { data } = await api.post(endpoint, variables)
      return data
    },
    ...options,
  })
}

