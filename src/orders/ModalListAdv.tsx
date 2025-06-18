import Card from "../advertisements/Card"
import { type IAdvertisement } from "../interfaces"

type ModalListAdvProps = {
    items: IAdvertisement[]
}

const ModalListAdv = (props: ModalListAdvProps) => {
    
    const items = props.items

    return(
        <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-150 h-100 overflow-scroll rounded-lg bg-neutral-50">
            {items.map((item, index) => {
                // console.log(item)
                return(
                    <>
                        <Card 
                            key={item.id}
                            data={item}
                        />
                        { index !== items.length-1 &&
                            <div className="border border-slate-300 w-full"></div>
                        }
                    </>
                )
            })}
        </div>
    )
}


export default ModalListAdv