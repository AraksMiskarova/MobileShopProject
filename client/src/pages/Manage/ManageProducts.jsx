import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from '../../components/MultiComponentsIC/ProductList/ProductList';
import UserList from '../../components/MultiComponentsIC/UserList/UserList';
import { useAccess } from '../../hook/useAccess';

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function ManageProducts() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const { isAdmin } = useAccess();
  const permission = isAdmin();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!permission) {
      return navigate('/');
    }
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
        height: 224,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Product" {...a11yProps(0)} />
        <Tab label="Users" {...a11yProps(1)} />
      </Tabs>
      {value === 0 && <ProductList />}
      {value === 1 && <UserList />}
    </Box>
  );
}

export default ManageProducts;
