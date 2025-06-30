import { API_PATH } from "./constant"
import { HttpService } from "./http-service"


class ApiService extends HttpService {

    constructor() {
        super(API_PATH)
    }

    getAdvertisements(page: number, rowsPerPage: number, sort: string) {
        const getAdvertisementsPath = `advertisements?_page=${page}&_per_page=${rowsPerPage}&_sort=-${sort}`
        return this.get(getAdvertisementsPath)
    }

    getAdvertisementsById(id: string) {
        return this.get(`advertisements/${id}`)
    }

    deleteAdvertisementsById(id: string) {
        return this.delete(`advertisements/${id}`)
    }

    postAdvertisements(body: any) {
        return this.post("advertisements", body)
    }

    patchAdvertisements(id: string, body: any) {
        return this.patch(`advertisements/${id}`, body)
    }

    getOrders(page: number, rowsPerPage: number, selectedPriceSort: number, selectedStatus: number ) {
        const getOrdersPath = `orders?_page=${page}&_per_page=${rowsPerPage}&_sort=${selectedPriceSort == 0 ? "-" : ""}total&status=${selectedStatus == 7 ? "" : selectedStatus}`
        return this.get(getOrdersPath)
    }





}

export default new ApiService