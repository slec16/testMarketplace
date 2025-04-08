import {
  Link,
  matchPath,
  useLocation,
  useParams 
} from 'react-router';
import React, { useState, useEffect, useContext } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VisibilityIcon from '@mui/icons-material/Visibility';

const AdvertisementPage = () => {

    const [product, setProduct] = useState({})

    let { id } = useParams();
    useEffect( () => {
        fetch(`http://localhost:3000/advertisements/${id}`).then(res => {
          return res.json()
        }).then(result => {
            setProduct(result)
        })
      },[])


    return (
        <div 
            className="rounded-md flex flex-row p-3 "
        >
            <div>
                <img src={product.imageUrl} className="w-30 h-40 rounded-md"/>
            </div>
            <div className="flex flex-col px-3 justify-between w-full">
                <div>
                    <h1
                        className="text-2xl font-bold mb-2"
                    >{ product.name }</h1>
                    <p>{ product.description  }</p>
                </div>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row">
                        <div className="mr-5 flex items-center">
                            <VisibilityIcon className='mr-1' />
                            { product.views }
                        </div>
                        <div className="flex items-center">
                            <ThumbUpIcon className='mr-1' />
                            { product.likes }
                        </div>
                    </div>
                    <h3 className="text-xl font-medium text-gray-500">{ product.price }₽</h3>
                </div>
            </div>
        </div>
    )
}

export default AdvertisementPage