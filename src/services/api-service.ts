import { API_PATH } from "./constant";
import { HttpService } from "./http-service"


class ApiService extends HttpService {

    constructor() {
        super(API_PATH)
    }

    getAdvertisements(page: number, rowsPerPage: number, sort: string, signal?: AbortSignal) {
        const getAdvertisementsPath = `advertisements?_page=${page}&_per_page=${rowsPerPage}&_sort=-${sort}`
        return this.get(getAdvertisementsPath, signal)
    }

    getAdvertisementsById(id: string, signal?: AbortSignal) {
        return this.get(`advertisements/${id}`, signal)
    }

    deleteAdvertisementsById(id: string, signal?: AbortSignal) {
        return this.delete(`advertisements/${id}`, signal)
    }

    postAdvertisements(body: any, signal?: AbortSignal) {
        return this.post("advertisements", body, signal)
    }

    patchAdvertisements(id: string, body: any, signal?: AbortSignal) {
        return this.patch(`advertisements/${id}`, body, signal)
    }

    getOrders(page: number, rowsPerPage: number, selectedPriceSort: number, selectedStatus: number, signal?: AbortSignal) {
        const getOrdersPath = `orders?_page=${page}&_per_page=${rowsPerPage}&_sort=${selectedPriceSort == 0 ? "-" : ""}total&status=${selectedStatus == 7 ? "" : selectedStatus}`
        return this.get(getOrdersPath, signal)
    }





}

export default new ApiService