import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import {
    Link,
    matchPath,
    useParams,
    useLocation,
} from 'react-router'
import ApiService from '../services/api-service'
import{
    useEffect,
    useState
} from 'react'

const useRouteMatch = (patterns: readonly string[]) => {
    const { pathname } = useLocation()

    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i]
        if(!pattern) return
        const possibleMatch = matchPath(pattern, pathname)
        if (possibleMatch !== null) {
            return possibleMatch
        }
    }

    return null
}

const MyTabs = () => {
    const { pathname } = useLocation()
    const routeMatch = useRouteMatch(['/advertisements', '/orders', '/', '/advertisements/:id'])
    const isAdDetailPage = matchPath('/advertisements/:id', pathname)
    const currentTab = isAdDetailPage ? '/advertisements/:id' : routeMatch?.pattern?.path

    const [adTitle, setAdTitle] = useState('Детали объявления')
    const adId = isAdDetailPage?.params.id

    useEffect(() => {
        if (adId) {
            const fetchAdTitle = async () => {
                try {
                    const ad = await ApiService.getAdvertisementsById(adId)
                    setAdTitle(ad.name) 
                } catch (error) {
                    setAdTitle('Детали объявления')
                }
            }
            
            fetchAdTitle()
        }
    }, [adId])

    return (
        <Tabs value={currentTab}>
            <Tab label="Профиль" value="/" to="/" component={Link} />
            <Tab label="Заказы" value="/orders" to="/orders" component={Link} />
            <Tab label="Объявления" value="/advertisements" to="/advertisements" component={Link} />
            {isAdDetailPage && (
                <div className='border-r border-1 border-blue-500'></div>
            )}
            {isAdDetailPage && (
                <Tab 
                    label={adTitle}
                    value="/advertisements/:id" 
                    to={pathname} 
                    component={Link} 
                />
            )}
        </Tabs>
    )
}



export default function TabsRouter() {
    return (
        <Box sx={{ width: '100%' }}>
            <div className='border-b-1 border-gray-300 mb-5'>
                <MyTabs />
            </div>
        </Box>

    )
}
