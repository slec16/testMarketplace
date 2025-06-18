export class HttpService {

    baseApi = ''

    constructor(baseApiPath: string){
        this.baseApi = baseApiPath
    }

    protected async get(path: string){

        const response = await fetch(`${this.baseApi}/${path}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        return response.json()
    }

    protected async post(path: string, body: any) {
        const stringifiedData = JSON.stringify(body);

        const response = await fetch(`${this.baseApi}/${path}`, {
            method: 'POST',
            body: stringifiedData,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.json();
    }

    protected async delete(path: string){

        const response = await fetch(`${this.baseApi}/${path}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        return response.json()
    }

    protected async patch(path: string, body: any) {
        const stringifiedData = JSON.stringify(body);

        const response = await fetch(`${this.baseApi}/${path}`, {
            method: 'PATCH',
            body: stringifiedData,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.json();
    }

    async _handleResponse(response: any) {
        const parsedData = await response.json()

        if( response.ok ) {
            return parsedData
        }
        throw parsedData
    }
}