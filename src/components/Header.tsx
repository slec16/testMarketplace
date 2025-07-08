import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ChatIcon from '@mui/icons-material/Chat'
import { blue } from '@mui/material/colors'

function Header(){
    return (
        <header className='py-7'>
            <div className="flex justify-between items-center">
                <h1 className='text-4xl text-slate-600'>
                    Marketplace <span className="whitespace-pre text-sky-400 italic">seller</span>
                </h1>
                <div className='invisible sm:visible'>
                    <ChatIcon fontSize="large" className="mr-2" sx={{ color: blue[300] }}></ChatIcon>
                    <AccountCircleIcon fontSize="large" sx={{ color: blue[300] }}></AccountCircleIcon>
                </div>
            </div>
        </header>   
    )
}

export default Header