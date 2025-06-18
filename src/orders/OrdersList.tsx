import OrdersCard from "./OrdersCard"
import { type IOrders } from "../interfaces"

type OrdersProps = {
    orders: IOrders[]
}

const OrdersList = (props: OrdersProps) => {

    const orders = props.orders

    return(
        <div className="flex flex-col gap-y-2 h-full ">
            {orders.map(item => {
                return(
                    <OrdersCard 
                        key={item.id}
                        data={item}
                    />
                )
            })}
        </div>    
    )
}


export default OrdersList