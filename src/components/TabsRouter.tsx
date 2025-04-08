import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {
  Link,
  matchPath,
  useLocation,
} from 'react-router';


function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

function MyTabs() {

  const routeMatch = useRouteMatch(['/advertisements', '/orders']);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Tabs value={currentTab}>
      <Tab label="Заказы" value="/orders" to="/orders" component={Link} />
      <Tab label="Объявления" value="/advertisements" to="/advertisements" component={Link} />
    </Tabs>
  );
}



export default function TabsRouter() {
  return (
      <Box sx={{ width: '100%' }}>
        <div className='border-b-1 border-gray-300 mb-5'>
          <MyTabs />
        </div>
      </Box>

  );
}
