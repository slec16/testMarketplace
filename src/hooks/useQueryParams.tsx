// hooks/useQueryParams.ts
import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router'

export const useQueryParams = () => {
    const location = useLocation()
    const navigate = useNavigate()

    // Получаем текущие параметры из URL
    const queryParams = useMemo(() => {
        return new URLSearchParams(location.search)
    }, [location.search])

    // Установка параметров
    const setQueryParams = (params: Record<string, string>) => {

        const newParams = new URLSearchParams(location.search)

        Object.entries(params).forEach(([key, value]) => {
            if (value === '' || value === null || value === undefined) {
                newParams.delete(key)
            } else {
                newParams.set(key, value)
            }
        })
        navigate({ search: newParams.toString() }, { replace: true })
    }

    return {
        queryParams,
        setQueryParams,
        getParam: (key: string) => queryParams.get(key),
        currentParams: Object.fromEntries(queryParams.entries())
    }
}