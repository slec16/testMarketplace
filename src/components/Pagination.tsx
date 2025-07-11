import { useState, useEffect } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { type IPaginationData } from '../interfaces'

type PaginationProps = {
    page: number;
    onPageChange: (newPage: number) => void;
    rowsPerPage: number
    onRowsPerPageChange: (rowsPerPage: number) => void;
    paginationData: IPaginationData
}

const Pagination = (props: PaginationProps) => {

    const { page, onPageChange, rowsPerPage, onRowsPerPageChange, paginationData } = props
    
    const { items, next, prev } = paginationData

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

    const openSort = Boolean(anchorEl)
 
    let options = [ 5, 10, 15, 25, 50 ]

    const [startRange, setStartRange] = useState(0) 
    const [endRange, setEndRange] = useState(0)

    useEffect(() => {
        let start, limit
        page === 1 ? start = 1 : start = ((page-1) * rowsPerPage)+1
        items && rowsPerPage*page > items ? limit = items : limit = (rowsPerPage*page)
        setStartRange(start)
        setEndRange(limit)
    }, [page, rowsPerPage])

    const openOptionsMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget)
    }
    
    const handleCloseSortMenu = () => {
        setAnchorEl(null)
    }

    const handleChangeOptions = (newPerPage: number) => {
        onRowsPerPageChange(newPerPage)
    }

    const prevPage = () => {
        if(page === 1) return
        onPageChange(page-1)
    }

    const nextPage = () => {    
        onPageChange(page+1)
    }


    return (
        <div className="flex flex-row items-center justify-between">
            <div className='flex flex-row items-center '>
                <p className='mr-1'>Строк на странице</p>
                <button
                    className='hover:bg-slate-300 px-3 rounded-full text-sky-400'
                    onClick={ (e) => openOptionsMenu(e) }
                >
                    {rowsPerPage}
                </button>
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
                {options.map((option) => (
                    <MenuItem
                        key={option}
                        selected={option === rowsPerPage}
                        onClick={() => handleChangeOptions(option)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>

            <p>{startRange}-{endRange} из {items}</p>
            <div>    
                <IconButton
                    aria-label="previous page" 
                    onClick={ prevPage }
                    disabled={prev == null}
                >
                    <ArrowBackIcon color='primary' />
                </IconButton>
                <IconButton 
                    aria-label="next page"
                    onClick={ nextPage }
                    disabled={next == null}
                >
                    <ArrowForwardIcon color='primary' />
                </IconButton>
            </div>
        </div>
    )

}


export default Pagination