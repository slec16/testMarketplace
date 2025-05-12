import Card from "../advertisements/Card"


const ModalListAdv = (props) => {
    
    const items = props.items
    console.log(items)
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