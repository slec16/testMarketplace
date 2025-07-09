import  { useState, useEffect } from 'react'
import List from "./List"
import { Input } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import Modal from '@mui/material/Modal'
import IconButton from '@mui/material/IconButton'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import InputAdornment from '@mui/material/InputAdornment'
import useInput from '../hooks/useInput'
import CreateAdvertisement from './modalCreateAdvertisement'
import Tooltip from '@mui/material/Tooltip'
import SortIcon from '@mui/icons-material/Sort'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import CachedIcon from '@mui/icons-material/Cached';
import Pagination from '../components/Pagination'
import { type IAdvertisement } from '../interfaces'
import { type IPaginationData } from '../interfaces'
import ApiService from '../services/api-service'
import { useAbortController } from '../hooks/useAbortController'
import { useQueryParams } from '../hooks/useQueryParams'


// TODO: add loaders

const Advertisements = () => {

    const { queryParams, setQueryParams, getParam } = useQueryParams()

    const [adv, setAdv] = useState<IAdvertisement[]>([])
    const [filtered, setFiltered] = useState<IAdvertisement[]>([])
    const { createAbortController } = useAbortController()
    const controller = createAbortController()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const page = getParam('page') || '1'
    const perPage = getParam('perPage') || '10'
    const sortOption = getParam('sort') || ''

    useEffect(() => {
        if (!queryParams.toString()) {
            setQueryParams({ page, perPage })
        }
    }, [])

    const [paginationData, setPaginationData] = useState<IPaginationData>({
        first: null,
        items: null,
        last: null,
        next: null,
        pages: null,
        prev: null
    })

    const searchInput = useInput()

    const [open, setOpen] = useState(false)
    const openModal = () => setOpen(true)
    const handleClose = () => {
        console.log('close modal')
        setOpen(false)
        fetchFunc()
    }

    const [openSnackBar, setOpenSnackBar] = useState(false)

    const handleCloseSnackBar = () => {
        setOpenSnackBar(false)
    }

    const handleSnackBarOpen = (state: boolean) => {
        setOpenSnackBar(state)
    }

    const options = [
        '',
        'price',
        'likes',
        'views'
    ]

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
    const openSort = Boolean(anchorEl)
    const openSortMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuItemClick = (index: number) => {
        setQueryParams({ sort: options[index] })
        setAnchorEl(null)
    }

    const handleCloseSortMenu = () => {
        setAnchorEl(null)
    }

    useEffect(() => {
        fetchFunc()
    }, [page, perPage, sortOption])



    const fetchFunc = async () => {
        setIsLoading(true)
        const response = await ApiService.getAdvertisements(Number(page), Number(perPage), sortOption, controller.signal)
        console.log(response)
        setAdv(response.data)
        const pagination = {
            first: response.first,
            items: response.items,
            last: response.last,
            next: response.next,
            pages: response.pages,
            prev: response.prev
        }
        setPaginationData(pagination)
        setIsLoading(false)
    }


    //search
    useEffect(() => {
        if (adv.length > 0) {
            const searched = adv.filter(el => el.name.toLowerCase().includes(searchInput.value))
            setFiltered(searched)
        }
    }, [searchInput.value.length, adv])

    const handleChangePage = (newPage: number) => {
        setQueryParams({ page: String(newPage) })
    }

    const handleChangeRowsPerPage = (rowsPerPage: number) => {
        setQueryParams({ perPage: String(rowsPerPage), page: String(1) })
    }

    return (
        <div className='flex-1 flex flex-col overflow-hidden sm:px-20 pb-5'>
            <div className='h-fit sm:h-15 bg-slate-200 rounded-lg mb-5 grid grid-cols-1 grid-rows-3 sm:grid-rows-1 sm:grid-cols-3 justify-items-stretch gap-0 px-3 py-2'>
                <div className='flex items-center ml-3 justify-between'>
                    <Input
                        {...searchInput}
                        className="w-full"
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                    <Tooltip title="Сортировать">
                        <IconButton onClick={ (event) => openSortMenu(event) }>
                            <SortIcon color='primary' fontSize='large' />
                        </IconButton>
                    </Tooltip>
                </div>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openSort}
                    onClose={handleCloseSortMenu}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {options.map((option, index) => (
                        <MenuItem
                            key={option}
                            selected={option === sortOption}
                            onClick={() => handleMenuItemClick( index )}
                        >
                            {option.length === 0 ? "-" : option}
                        </MenuItem>
                    ))}
                </Menu>
                <div className="grid grid-cols-3 content-center">
                    {sortOption !== '' ?
                        <p className="justify-self-start flex items-center text-slate-600">
                            {sortOption}
                        </p> :
                        <div></div>
                    }
                    <div className="justify-self-center ">
                        <Tooltip title="Новое объявление">
                            <IconButton onClick={openModal}>
                                <AddCircleOutlineIcon color='primary' fontSize='large'/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div></div>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <CreateAdvertisement 
                        openSnackBar={handleSnackBarOpen}
                        onClose={handleClose}
                    />
                </Modal>

                <Pagination
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    page={Number(page)}
                    rowsPerPage={Number(perPage)}
                    paginationData={paginationData}
                />
    
            </div>
            {isLoading ? 
                <div className='w-full h-full flex justify-center items-center'>
                    <div className='text-7xl'>
                        <CachedIcon 
                            color='primary'
                            className='animate-spin'
                            fontSize='inherit'
                        />
                    </div>
                </div> 
                : 
                <div className='flex flex-1 overflow-y-auto justify-center sm:bg-slate-50 sm:rounded-xl'>
                    <List
                        arrayOfAdvertisements={adv}
                        arrayOfFiltered={filtered}
                    />
                </div>
            }
            <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={openSnackBar}
                    onClose={handleCloseSnackBar}
                    autoHideDuration={3000}
                >
                <Alert
                    onClose={handleCloseSnackBar}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Объявление создано
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Advertisements