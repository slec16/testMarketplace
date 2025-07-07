import Card from "../advertisements/Card"
import { type IAdvertisement } from "../interfaces"

type ModalListAdvProps = {
    items: IAdvertisement[]
}

const ModalListAdv = (props: ModalListAdvProps) => {
    
    const items = props.items

    return(
        <div className="flex flex-col absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-fit h-150 overflow-hidden justify-center rounded-lg bg-neutral-50 p-3">
            <h2 className="flex justify-center text-2xl text-slate-700 font-bold py-1 mb-2 border-b border-blue-300">Список товаров</h2>
            <div className="flex flex-col h-full overflow-y-auto ">
                {items.map((item, index) => {
                    // console.log(item)
                    return(
                            <div className="flex flex-col justify-center">
                                <Card 
                                    key={item.id}
                                    data={item}
                                    fromOrders={true}
                                />
                                { index !== items.length-1 &&
                                    <div className="border border-slate-300 w-full"></div>
                                }
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}


export default ModalListAdv