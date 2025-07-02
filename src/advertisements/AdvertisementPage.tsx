import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import HideImageIcon from '@mui/icons-material/HideImage';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import CreateAdvertisement from './modalCreateAdvertisement'
import ApiService from '../services/api-service';
import { useAbortController } from '../hooks/useAbortController';
import { type IAdvertisement } from '../interfaces';

/*
    TODO:
    При переходе с роута объявы обранто в список сохранять в локал сторадже
    параметры поиска

*/

const AdvertisementPage = () => {

    const [product, setProduct] = useState<IAdvertisement | null>(null)
    const { createAbortController } = useAbortController()
    const controller = createAbortController()
    const [isDeleted, setIsDeleted] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const handleClosaEditModal = () => {
        setOpenEditModal(false)
        fetchFunc()
    }

    let { id } = useParams();

    const fetchFunc = async () => {
        if( id ) {
            const response = await ApiService.getAdvertisementsById(id, controller.signal)
            console.log(response)
            setProduct(response)
        }
    }

    useEffect( () => {
        fetchFunc()
    }, [])

    const editAdvertisement = () => {
        setOpenEditModal(true)
    }

    const deleteAdvertisement = async () => {
        if( id ) {
            console.log("delete")
            const response = await ApiService.deleteAdvertisementsById(id, controller.signal)
            console.log(response)
            response && setIsDeleted(true)
        }
    }

    return (
        <>
            { product && <>            
                {isDeleted && 
                    <p className="items-center text-2xl text-red-400">Объявление удалено</p>
                }
                <div 
                    className={`rounded-md flex flex-row p-3 ${isDeleted ? "opacity-50" : "" }`}
                >
                    { !product.imageUrl ? 
                        <div className='flex w-1/3 h-60 mr-2 border border-blue-200 rounded-lg items-center justify-center'>
                            <HideImageIcon 
                                fontSize='large'
                                color='primary'
                            />
                        </div>
                        :
                        <div className="w-1/3 mr-2 rounded-lg overflow-hidden">          
                            <img src={product.imageUrl} alt="Your Image" className="object-contain" />
                        </div>
                    }
                    <div className="flex flex-col px-3 justify-between w-full">
                        <div>
                            <div className="flex flex-row justify-between">
                                <h1
                                    className="text-2xl text-slate-700 font-bold mb-2"
                                >{ product.name }</h1>
                                <div>
                                    <IconButton disabled={isDeleted} onClick={editAdvertisement} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton disabled={isDeleted} onClick={deleteAdvertisement} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </div>
                            <p className='mb-3'>{ product.description }</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-row">
                                <div className="mr-5 flex items-center">
                                    <VisibilityIcon color="info" className='mr-1 opacity-50' />
                                    { product.views }
                                </div>
                                <div className="flex items-center">
                                    <ThumbUpIcon color="info" className='mr-1 opacity-50' />
                                    { product.likes }
                                </div>
                            </div>
                            <h3 className="text-xl font-medium text-gray-500">{ product.price }₽</h3>
                        </div>
                    </div>
                </div>
                <Modal
                    open={openEditModal}
                    onClose={handleClosaEditModal}
                >
                    <CreateAdvertisement 
                        openSnackBar={() => {}}
                        editModal={true}
                        currentData={product}
                        id={id}
                        onClose={handleClosaEditModal}
                    />
                </Modal>
            </> }
        </>
    )
}

export default AdvertisementPage