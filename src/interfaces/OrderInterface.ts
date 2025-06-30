import { type IAdvertisement } from "./AdvertisementInterfsace"

export interface IOrders {
    id: string;
    status: number;
    createdAt: string;
    finishedAt: string;
    total: number;
    deliveryWay: string;
    items: IAdvertisement[]
}