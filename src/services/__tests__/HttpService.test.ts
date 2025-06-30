// http.service.test.ts
import { HttpService } from '../http-service'

// Мокаем глобальный fetch
global.fetch = jest.fn() as jest.Mock

// Тестовый класс-наследник с публичными методами
class TestableHttpService extends HttpService {
  public exposedGet(path: string) {
    return this.get(path)
  }

  public exposedPost(path: string, body: any) {
    return this.post(path, body)
  }

  public exposedDelete(path: string) {
    return this.delete(path)
  }

  public exposedPatch(path: string, body: any) {
    return this.patch(path, body)
  }


}

describe('HttpService', () => {
  const BASE_URL = 'https://api.example.com'
  let httpService: TestableHttpService

  beforeEach(() => {
    jest.clearAllMocks()
    httpService = new TestableHttpService(BASE_URL)
  })

  describe('constructor', () => {
    it('should set baseApi correctly', () => {
      expect(httpService.baseApi).toBe(BASE_URL)
    })
  })

  describe('GET requests', () => {
    it('should make GET request with correct URL and headers', async () => {
      const mockData = { id: 1, name: 'Test' }
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve(mockData),
      };
      (fetch as jest.Mock).mockResolvedValue(mockResponse)

      const path = 'users/1'
      const result = await httpService.exposedGet(path)

      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/${path}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      expect(result).toEqual(mockData)
    })

    it('should handle GET request errors', async () => {
      const mockError = { error: 'Not found' };
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: () => Promise.resolve(mockError),
      })

      await expect(httpService.exposedGet('invalid-path')).rejects.toEqual(mockError)
    })
  })

  describe('POST requests', () => {
    it('should make POST request with correct data', async () => {
      const mockData = { success: true }
      const requestBody = { name: 'New User' };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      })

      const path = 'users'
      const result = await httpService.exposedPost(path, requestBody)

      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/${path}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      expect(result).toEqual(mockData)
    })
  })

  describe('DELETE requests', () => {
    it('should make DELETE request', async () => {
      const mockData = { deleted: true };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      })

      const path = 'users/1'
      const result = await httpService.exposedDelete(path)

      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/${path}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      expect(result).toEqual(mockData)
    })
  })

  describe('PATCH requests', () => {
    it('should make PATCH request with correct data', async () => {
      const mockData = { updated: true }
      const requestBody = { name: 'Updated Name' };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      })

      const path = 'users/1'
      const result = await httpService.exposedPatch(path, requestBody)

      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/${path}`, {
        method: 'PATCH',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      expect(result).toEqual(mockData)
    })
  })

})