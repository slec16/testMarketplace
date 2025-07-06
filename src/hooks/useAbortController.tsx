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

    const abortSpecificController = (controllerToAbort: AbortController) => {
        console.log(controllerToAbort)
        abortControllers.current = abortControllers.current.filter(controller => {
            if (controller === controllerToAbort) {
                controller.abort();
                return false;
            }
            return true;
        });
    };

    useEffect(() => {
        return () => {
            abortControllers.current.forEach(controller => {
                controller.abort();
            });
            abortControllers.current = [];
        };
    }, [location.pathname]);

    return { createAbortController, abortSpecificController };
}