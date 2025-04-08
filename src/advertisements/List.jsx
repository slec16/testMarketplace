import Card from "./Card"

const List = (props) => {

    const listItems = props.listOfAdvertisements.map(item => 
        <Card 
            key = {item.id}
            data = {item}
        />
    )
    
    return(
        <div className="flex flex-col gap-y-2">
            {listItems}
        </div>
    )
}

export default List