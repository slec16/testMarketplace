// hooks/useAbortController.ts
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

export const useAbortController = () => {
    const location = useLocation();
    const abortControllers = useRef<AbortController[]>([]);

    const createAbortController = () => {
        const controller = new AbortController();
        abortControllers.current.push(controller);
        return controller;
    };

    useEffect(() => {
        return () => {
            abortControllers.current.forEach(controller => {
                controller.abort();
            });
            abortControllers.current = [];
        };
    }, [location]);

    return { createAbortController };
}