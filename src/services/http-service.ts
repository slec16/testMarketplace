export class HttpService {

    baseApi = ''

    constructor(baseApiPath: string){
        this.baseApi = baseApiPath
    }

    protected async get(path: string, signal?: AbortSignal){

        try{
            const response = await fetch(`${this.baseApi}/${path}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                signal  
            })

            return this._handleResponse(response)
        } catch (err: any) {
            if (err.name == 'AbortError') {
                console.log('Fetch users request was aborted')
                return
            }
        }
        
    }

    protected async post(path: string, body: any, signal?: AbortSignal) {

        try{
            const stringifiedData = JSON.stringify(body)
    
            const response = await fetch(`${this.baseApi}/${path}`, {
                method: 'POST',
                body: stringifiedData,
                headers: {
                    'Content-Type': 'application/json',
                },
                signal
            })

            return this._handleResponse(response)
        } catch (err: any) {
            if (err.name == 'AbortError') {
                console.log('Fetch users request was aborted')
                return
            }
        }

    }

    protected async delete(path: string, signal?: AbortSignal){

        try{
            const response = await fetch(`${this.baseApi}/${path}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                signal
            })

            return this._handleResponse(response)
        } catch (err: any) {
            if (err.name == 'AbortError') {
                console.log('Fetch users request was aborted')
                return
            }
        } 

    }

    protected async patch(path: string, body: any, signal?: AbortSignal) {

        try{
            const stringifiedData = JSON.stringify(body)
    
            const response = await fetch(`${this.baseApi}/${path}`, {
                method: 'PATCH',
                body: stringifiedData,
                headers: {
                    'Content-Type': 'application/json',
                },
                signal
            })

            return this._handleResponse(response)
        } catch (err: any) {
            if (err.name == 'AbortError') {
                console.log('Fetch users request was aborted')
                return
            }
        }

    }

    private async _handleResponse(response: any) {
        const parsedData = await response.json()

        if( response.ok ) {
            return parsedData
        }
        throw parsedData
    }
}