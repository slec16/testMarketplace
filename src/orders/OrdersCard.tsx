import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import HideImageIcon from '@mui/icons-material/HideImage'
import Modal from '@mui/material/Modal'
import ModalListAdv from "./ModalListAdv"
import { type IOrders } from '../interfaces'

type OrdersCardProps = {
    data: IOrders;
    key: string
}

const OrdersCard = (props: OrdersCardProps) => {

    const {id, status, createdAt, finishedAt, total, deliveryWay, items} = props.data

    const [openModal, setOpenModal] = useState(false)
    const openOrderModal = () => setOpenModal(true)
    const closeModal = () => setOpenModal(false)

    const dateCreate = (new Date(Date.parse(createdAt))).toUTCString()
    let dateFinish 
    finishedAt ? dateFinish = (new Date(Date.parse(finishedAt))).toUTCString() : dateFinish = "-"
    
    const orderStatus = new Map<number, string>([
        [0, "Создан"],
        [1, "Оплачен"],
        [2, "В пути"],
        [3, "В пункте выдачи"],
        [4, "Доставлен"],
        [5, "Архивировано"],
        [6, "Возврат"],
    ])


    const dataStyle = "text-sm md:text-xl font-medium text-gray-700"



    return(
        <>
            <div
                onClick={openOrderModal}
                className="first:mt-3 last:mb-3 rounded-md flex flex-col md:flex-row p-3 bg-slate-50 hover:bg-slate-200 border border-blue-200"
            > 
                <div className="rounded-lg bg-white md:bg-slate-100 w-full md:w-96 md:h-72 flex flex-row justify-around md:justify-between flex-wrap gap-y-5 p-2">
                    {items.map((item, index) => {
                        if(index < 3) {   
                            return(
                                <div className=''>
                                    { item.imageUrl.length == 0 ? 
                                        <div className='flex w-30 h-30 md:w-32 md:h-32 border border-blue-200 rounded-lg items-center justify-center'>
                                            <HideImageIcon 
                                                fontSize='large'
                                                color='primary'
                                            />
                                        </div>
                                        :
                                        <div className="w-30 h-30 md:w-32 md:h-32 rounded-lg overflow-hidden">          
                                            <img src={item.imageUrl} alt="Your Image" className="object-contain" />
                                        </div>
                                    }
                                </div>
                            )
                        } 
                    })}
                    {items.length >= 4 && 
                        <div className='flex w-30 h-30 md:w-32 md:h-32 border border-blue-200 rounded-lg items-center justify-center'>
                            <p className='text-2xl text-blue-400'>+{items.length - 3}</p>
                        </div>
                    }
                </div>
                <div className="flex flex-col px-3 justify-between w-full">
                    <p className={dataStyle}>Заказ № <p className='text-slate-500'>{id}</p></p>
                    <p className={dataStyle}>Количество товаров: <p className='text-slate-500'>{items.length}</p></p>
                    <p className={dataStyle}>Дата создания: <p className='text-slate-500'>{ dateCreate }</p></p>
                    <p className={dataStyle}>Дата доставки: <p className='text-slate-500'>{dateFinish}</p></p>
                    <p className={dataStyle}>Способ доставки: <p className='text-slate-500'>{deliveryWay}</p></p>
                    <div className="flex flex-row">
                        <p className={twMerge(dataStyle, "mr-1")}>Статус:</p>
                        <p className={twMerge(dataStyle, "text-sky-400")}>{orderStatus.get(status)}</p>
                    </div>
                    <p className="flex justify-end text-xl font-medium text-gray-500">{total}₽</p>
                </div>
            </div>
            <Modal
                open={openModal}
                onClose={closeModal}
            >
                <ModalListAdv 
                    items={items}
                />
            </Modal>
        </>
        
    )
}

export default OrdersCard

