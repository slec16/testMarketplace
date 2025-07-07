import {
  Link,
} from 'react-router'
import HideImageIcon from '@mui/icons-material/HideImage'
import FavoriteIcon from '@mui/icons-material/Favorite'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { type IAdvertisement } from '../interfaces'

type CardProps = {
    data: IAdvertisement;
    key: string;
    fromOrders?: boolean
}

const Card = (props: CardProps) => {

    const {id, description, imageUrl, likes, name, price, views} = props.data

    const collapseText = (text: string) => {
        if ( text ) {
            let expText = ''
            if ( text.length > 100 ) {
                expText = text.slice(0, 100) + "..."
                return expText
            }
            return text
        }
        return ''
    }

    return(
        <Link to={`/advertisements/${id}`} >
            <div
                className={
                    "first:mt-3 last:mb-3 border border-slate-100  rounded-2xl bg-slate-200 hover:bg-slate-300 py-2 px-3"+
                    ` ${props.fromOrders ? 'w-90 h-120' : 'w-100 h-130'} `
                }
            >
                <div className='h-full w-full flex flex-col'>
                    <div className='h-1/2 p-2'>
                        { imageUrl.length == 0 ? 
                            <div className='flex h-full border border-blue-300 rounded-lg items-center justify-center text-7xl'>
                                <HideImageIcon 
                                    fontSize='inherit'
                                    color='primary'
                                />
                            </div>
                            :
                            <div className="flex h-full rounded-lg overflow-hidden items-center justify-center">          
                                {/* TODO я че то тут хотел сделать с onError */}
                                <img src={imageUrl} alt="Your Image" className="object-cover" onError={() => console.log("alt image ", name)}/>
                            </div>
                        }
                    </div>
                    <div className='h-1/2'>
                        <div className='flex flex-col justify-between h-full'>
                            <div>
                                <h1
                                    className="text-2xl text-slate-700 font-bold mb-2"
                                >{ name }</h1>
                                <p data-testid="card-description">{ collapseText( description ) }</p>
                            </div>
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row">
                                    <div className="mr-5 flex items-center">
                                        <VisibilityIcon color="info" className='mr-1 opacity-50' />
                                        { views }
                                    </div>
                                    <div className="flex items-center">
                                        <FavoriteIcon color="info" className='mr-1 opacity-50' />
                                        { likes }
                                    </div>
                                </div>
                                <h3 className="text-xl font-medium text-gray-500">{ price }₽</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card