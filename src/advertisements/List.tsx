import Card from "./Card"
import { type IAdvertisement } from "../interfaces"

type ListProps = {
    arrayOfAdvertisements: IAdvertisement[];
    arrayOfFiltered: IAdvertisement[]
}

const List = (props: ListProps) => {
    
    const {arrayOfAdvertisements, arrayOfFiltered} = props

    let listOfAdv


    arrayOfAdvertisements.length === arrayOfFiltered.length ? listOfAdv = arrayOfAdvertisements.map(item => {
        return(
            <Card 
                key = {item.id}
                data = {item}
            />
        )
    }) :
    listOfAdv = arrayOfFiltered.map(item => {
        return(
            <Card 
                key = {item.id}
                data = {item}
            />
        )
    })

    
    return(
        <div className="flex flex-col gap-y-2 h-full ">
            {listOfAdv}
        </div>
    )
}

export default List