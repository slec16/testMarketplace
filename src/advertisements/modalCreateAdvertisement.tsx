import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import InputAdornment from '@mui/material/InputAdornment';
import LinkIcon from '@mui/icons-material/Link';
import useInput from '../hooks/useInput';
import DescriptionIcon from '@mui/icons-material/Description';
import TitleIcon from '@mui/icons-material/Title';
import { type IAdvertisement } from '../interfaces';


type CreateAdvertisementProps = {
    openSnackBar: (state: boolean) => void
    editModal?: boolean
    currentData?: IAdvertisement
    id?: string | undefined
    onClose?: () => void
}

const CreateAdvertisement = (props: CreateAdvertisementProps) => {

    const {openSnackBar, editModal, currentData, id, onClose} = props

    const urlInput = useInput()
    const nameInput = useInput()
    const descInput = useInput()
    const priceInput = useInput()

    let urlInputUpdate = useInput()
    let nameInputUpdate = useInput()
    let descInputUpdate = useInput()
    let priceInputUpdate = useInput()
    
    if(currentData){
        urlInputUpdate  = useInput(currentData.imageUrl)
        nameInputUpdate = useInput(currentData.name)
        descInputUpdate = useInput(currentData.description)
        priceInputUpdate = useInput(currentData.price as unknown as string) //TODO
    }

    const createAdvertisement = () => {
        fetch('http://localhost:3000/advertisements', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "name": `${nameInput.value}`,
                "price": `${Number(priceInput.value)}`,
                "createdAt": "",
                "views": 0,
                "likes": 0,
                "imageUrl": `${urlInput.value}`,
                "description": `${descInput.value}`
            })
        }).then(res => {
            return res.json()
        }).then(() => {
            openSnackBar(true)
        });
    }


    // исправить на patch метод
    const updateAdvertisement = () => {
        fetch(`http://localhost:3000/advertisements/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "name": `${nameInputUpdate.value}`,
                "price": `${Number(priceInputUpdate.value)}`,
                "createdAt": "",
                "views": 0,
                "likes": 0,
                "imageUrl": `${urlInputUpdate.value}`,
                "description": `${descInputUpdate.value}`
            })
        }).then(res => {
            return res.json()
        }).then(() => {
            onClose && onClose()
        });
    }

    return (
        <>
            { !editModal ? 
                <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-150 rounded-lg bg-neutral-50">
                    <h2 className='py-3 border-b border-slate-400 text-center text-2xl text-blue-800'>Новое объявление</h2>
                    <div className='p-5 grid grid-cols-2 grid-row-4'>
                        <p className="text-slate-600">URL изображения</p>
                        <Input 
                            {...urlInput}
                            endAdornment={
                                <InputAdornment position="end">
                                    <LinkIcon />
                                </InputAdornment>
                            }
                        />
                        <p className="text-slate-600">Название</p>
                        <Input 
                            {...nameInput} 
                            endAdornment={
                                <InputAdornment position="end">
                                    <TitleIcon />
                                </InputAdornment>
                            }
                        />
                        <p className="text-slate-600">Описание</p>
                        <Input 
                            {...descInput}
                            multiline
                            maxRows={4}
                            endAdornment={
                                <InputAdornment position="end">
                                    <DescriptionIcon />
                                </InputAdornment>
                            }
                        />
                        <p className="text-slate-600">Стоимость</p>
                        <Input  
                            {...priceInput}
                            type='number'
                            endAdornment={
                                <InputAdornment position="end">
                                    <CurrencyRubleIcon />
                                </InputAdornment>
                            }
                        />
                    </div>
                    <div className="w-full flex justify-center mb-3">
                        <Button onClick={createAdvertisement} variant="contained">Создать</Button>
                    </div>
                </div>
                :
                <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-150 rounded-lg bg-neutral-50">
                    <h2 className='py-3 border-b border-slate-400 text-center text-2xl text-blue-800'>Новое объявление</h2>
                    <div className='p-5 grid grid-cols-2 grid-row-4'>
                        <p className="text-slate-600">URL изображения</p>
                        <Input 
                            {...urlInputUpdate}
                            endAdornment={
                                <InputAdornment position="end">
                                    <LinkIcon />
                                </InputAdornment>
                            }
                        />
                        <p className="text-slate-600">Название</p>
                        <Input 
                            {...nameInputUpdate} 
                            endAdornment={
                                <InputAdornment position="end">
                                    <TitleIcon />
                                </InputAdornment>
                            }
                        />
                        <p className="text-slate-600">Описание</p>
                        <Input 
                            {...descInputUpdate}
                            multiline
                            maxRows={4}
                            endAdornment={
                                <InputAdornment position="end">
                                    <DescriptionIcon />
                                </InputAdornment>
                            }
                        />
                        <p className="text-slate-600">Стоимость</p>
                        <Input  
                            {...priceInputUpdate}
                            type='number'
                            endAdornment={
                                <InputAdornment position="end">
                                    <CurrencyRubleIcon />
                                </InputAdornment>
                            }
                        />
                    </div>
                    <div className="w-full flex justify-center mb-3">
                        <Button onClick={updateAdvertisement} variant="contained">Обновить</Button>
                    </div>
                </div>
            }
        </>
          
    )
}


export default CreateAdvertisement