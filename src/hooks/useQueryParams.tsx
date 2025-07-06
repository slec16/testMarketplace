// import { useMemo } from 'react';
// import { useLocation, useNavigate, } from 'react-router'

// function useQueryParams(options: string[][] | Record<string, string> | string | URLSearchParams) {
//     const { search } = useLocation();

//     const navigate = useNavigate();

//     const queryParams = useMemo(() => {
//         const stringParams = new URLSearchParams(options)
//         return stringParams
//     }, [search]);

//     console.log(queryParams.toString())

//     navigate({
//         search: queryParams.toString()
//     }, {
//         replace: true 
//     });

//   return { queryParams };
// };

// export default useQueryParams;

import { useMemo, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

function useQueryParams() {
    const location = useLocation();
    const navigate = useNavigate();


    // Получаем текущие параметры из URL (без побочных эффектов)
    const queryParams = useMemo(() => {
        return new URLSearchParams(location.search);
    }, [location.search]);

      // Получаем текущие параметры из URL
    const getCurrentParams = () => {
        return Object.fromEntries(new URLSearchParams(location.search));
    };

    const saveParamsBeforeLeave = () => {
        sessionStorage.setItem(
            `prevParams_${location.pathname}`,
            JSON.stringify(queryParams)
        );
    };

    // Функция для безопасного обновления параметров
    const setQueryParams = (params: Record<string, string | null>) => {
        const newParams = new URLSearchParams(location.search);
        
        Object.entries(params).forEach(([key, value]) => {
            if (value === null || value === undefined || value === '') {
            newParams.delete(key);
            } else {
            newParams.set(key, value);
            }
        });

            
        // Обновляем URL только если параметры действительно изменились
        setTimeout(() => {
            if (newParams.toString() !== location.search.slice(1)) {
                console.log(newParams.toString())
              navigate({ search: newParams.toString() }, { replace: true });
            }
        }, 500)

        saveParamsBeforeLeave()
      
    };

    useEffect(() => {
        const savedParams = sessionStorage.getItem(`prevParams_${location.pathname}`);
        if (savedParams) {
            const params = JSON.parse(savedParams);
            navigate({
                search: new URLSearchParams(params).toString()
            }, { replace: true });
        }
    }, [location.pathname]);

    //setInitalParams = () => {}

    return {
        queryParams,
        getCurrentParams,
        setQueryParams,
        saveParamsBeforeLeave,
        getQueryParam: (key: string) => queryParams.get(key),
        currentParams: Object.fromEntries(queryParams.entries())
    };
}

export default useQueryParams;