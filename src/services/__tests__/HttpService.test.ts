import { HttpService } from '../http-service'

// Мок для fetch
global.fetch = jest.fn() as jest.Mock

describe('HttpService', () => {
    const BASE_URL = 'https://api.example.com'
    let httpService: HttpService

    beforeEach(() => {
        (fetch as jest.Mock).mockClear()
        httpService = new HttpService(BASE_URL)
    })

    describe('get', () => {
        it('should make GET request with correct URL and headers', async () => {
            const mockResponse = { data: 'test' };
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockResponse),
            })

            const path = 'users'
            // @ts-ignore - тестируем protected метод
            const result = await httpService.get(path)

            expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/${path}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            expect(result).toEqual(mockResponse)
        })

        it('should handle AbortError', async () => {
            const abortError = new Error('Aborted')
            abortError.name = 'AbortError';
            (fetch as jest.Mock).mockRejectedValueOnce(abortError)

            const consoleSpy = jest.spyOn(console, 'log')
            const path = 'users'
            // @ts-ignore - тестируем protected метод
            const result = await httpService.get(path)

            expect(consoleSpy).toHaveBeenCalledWith('Fetch users request was aborted')
            expect(result).toBeUndefined()
        })
    })

    describe('post', () => {
        it('should make POST request with correct URL, body and headers', async () => {
            const mockResponse = { id: 1 }
            const requestBody = { name: 'John' };
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockResponse),
            })

            const path = 'users'
            // @ts-ignore - тестируем protected метод
            const result = await httpService.post(path, requestBody)

            expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/${path}`, {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            expect(result).toEqual(mockResponse)
        })
        it('should handle AbortError', async () => {
            const requestBody = { name: 'John' }
            const abortError = new Error('Aborted')
            abortError.name = 'AbortError';
            (fetch as jest.Mock).mockRejectedValueOnce(abortError)

            const consoleSpy = jest.spyOn(console, 'log')
            const path = 'users'
            // @ts-ignore - тестируем protected метод
            const result = await httpService.post(path, requestBody)

            expect(consoleSpy).toHaveBeenCalledWith('Fetch users request was aborted')
            expect(result).toBeUndefined()
        })
    })

    describe('patch', () => {
        it('should make PATCH request with correct URL, body and headers', async () => {
            const mockResponse = { id: 1, name: 'Updated' }
            const requestBody = { name: 'Updated' };
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockResponse),
            })

            const path = 'users/1'
            // @ts-ignore - тестируем protected метод
            const result = await httpService.patch(path, requestBody)

            expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/${path}`, {
                method: 'PATCH',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            expect(result).toEqual(mockResponse)
        })
        it('should handle AbortError', async () => {
            const requestBody = { name: 'Updated' }
            const abortError = new Error('Aborted')
            abortError.name = 'AbortError';
            (fetch as jest.Mock).mockRejectedValueOnce(abortError)

            const consoleSpy = jest.spyOn(console, 'log')
            const path = 'users/1'
            // @ts-ignore - тестируем protected метод
            const result = await httpService.patch(path, requestBody)

            expect(consoleSpy).toHaveBeenCalledWith('Fetch users request was aborted')
            expect(result).toBeUndefined()
        })
    })

    describe('delete', () => {
        it('should make DELETE request with correct URL and headers', async () => {
            const mockResponse = { success: true };
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockResponse),
            })

            const path = 'users/1'
            // @ts-ignore - тестируем protected метод
            const result = await httpService.delete(path)

            expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/${path}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            expect(result).toEqual(mockResponse)
        })
        it('should handle AbortError', async () => {
            const abortError = new Error('Aborted')
            abortError.name = 'AbortError';
            (fetch as jest.Mock).mockRejectedValueOnce(abortError)

            const consoleSpy = jest.spyOn(console, 'log')
            const path = 'users.1'
            // @ts-ignore - тестируем protected метод
            const result = await httpService.delete(path)

            expect(consoleSpy).toHaveBeenCalledWith('Fetch users request was aborted')
            expect(result).toBeUndefined()
        })
    })

    describe('_handleResponse', () => {
        it('should return parsed data when response is ok', async () => {
            const mockResponse = { data: 'test' }
            const response = {
                ok: true,
                json: () => Promise.resolve(mockResponse),
            }

            // @ts-ignore - тестируем protected метод
            const result = await httpService._handleResponse(response)
            expect(result).toEqual(mockResponse)
        })

        it('should throw error when response is not ok', async () => {
            const errorResponse = { error: 'Not found' }
            const response = {
                ok: false,
                json: () => Promise.resolve(errorResponse),
            }

            // @ts-ignore - тестируем protected метод
            await expect(httpService._handleResponse(response)).rejects.toEqual(errorResponse)
        })
    })

})