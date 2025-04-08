import { HttpService } from "../services/http-service";

class AdvertisementsApi extends HttpService {
    constructor() {
        super('/advertisements')
    }

    getAdvertisements(){
        return this.get()
    }
}

export default AdvertisementsApi;