import { useState, useEffect } from 'react'
import Pagination from '../components/Pagination'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import OrdersList from './OrdersList'
import type { IOrders, IPaginationData } from '../interfaces'
import ApiService from '../services/api-service'

const Orders = () => {

    const [orders, setOrders] = useState<IOrders[]>([])
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [page, setPage] = useState(1)
    const [paginationData, setPaginationData] = useState<IPaginationData>({
        first: null,
        items: null,
        last: null,
        next: null,
        pages: null,
        prev: null
    })



    const handleChangePage = (newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (rowsPerPage: number) => {
        setRowsPerPage(rowsPerPage)
        setPage(1)
    }


    let priceSort = [
        "По убыванию",
        "По возрастанию",
    ]

    const [anchorElPrice, setAnchorElPrice] = useState<HTMLButtonElement | null>(null)
    const [selectedPriceSort, setSelectedPriceSort] = useState(0)
    const openPrice = Boolean(anchorElPrice)

    const openPriceMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorElPrice(event.currentTarget)
    }

    const handleClosePriceMenu = () => {
        setAnchorElPrice(null)
    }

    
    const handleMenuPriceClick = (index: number) => {
        setSelectedPriceSort(index)
        setAnchorElPrice(null)
    }

    const orderStatus = [
        "Создано",
        "Оплачено",
        "В пути",
        "В пункте выдачи",
        "Доставлено",
        "Архивиравано",
        "Возврат",
        "Все"
    ]

    const [anchorElStatus, setAnchorElStatus] = useState<HTMLButtonElement | null>(null)
    const [selectedStatus, setSelectedStatus] = useState(7)
    const openStatus = Boolean(anchorElStatus)
    const openSortMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorElStatus(event.currentTarget)
    }

    const handleCloseSortMenu = () => {
        setAnchorElStatus(null)
    }

    
    const handleMenuStatusClick = (index: number) => {
        setSelectedStatus(index)
        setAnchorElStatus(null)
    }

//http://localhost:3000/orders?_page=1&_per_page=5&_sort=-total&status=0
    const fetchFunc = async () => {
        const response = await ApiService.getOrders(page, rowsPerPage, selectedPriceSort, selectedStatus) 
        setOrders(response.data)
        const pagination = {
            first: response.first,
            items: response.items,
            last: response.last,
            next: response.next,
            pages: response.pages,
            prev: response.prev
        }
        setPaginationData(pagination)
    }

    useEffect(() => {
        fetchFunc()
    }, [selectedStatus, selectedPriceSort, page, rowsPerPage])




    return (
        <div>
            <div className="bg-slate-200 rounded-lg mb-5 flex flex-row items-center px-2">
                <p className='mr-1 '>Статус:</p>
                <button 
                    className='underline mr-3 text-sky-400'
                    onClick={openSortMenu}
                >{orderStatus[selectedStatus]}</button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorElStatus}
                    open={openStatus}
                    onClose={handleCloseSortMenu}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {orderStatus.map((option, index) => (
                        <MenuItem
                            key={option}
                            selected={index === selectedStatus}
                            onClick={() => handleMenuStatusClick(index)}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
                <p className='mr-1 '>Цена:</p>
                <button
                    className='underline text-sky-400'
                    onClick={openPriceMenu}
                >
                    {priceSort[selectedPriceSort]}
                </button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorElPrice}
                    open={openPrice}
                    onClose={handleClosePriceMenu}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {priceSort.map((option, index) => (
                        <MenuItem
                            key={option}
                            selected={index === selectedPriceSort}
                            onClick={() => handleMenuPriceClick(index)}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
                <div className="ml-auto mr-0">
                    <Pagination
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        paginationData={paginationData}
                    />
                </div>
            </div>
            {orders.length !== 0 &&
                <OrdersList 
                    orders={orders}
                />                
            }
        </div>
    )
}

export default Orders

