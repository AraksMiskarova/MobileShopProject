import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import React from 'react';
import ProductList from '../../components/MultiComponentsIC/ProductList/ProductList';
import UserList from '../../components/MultiComponentsIC/UserList/UserList';

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function MenageProducts() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log('value', value);
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

export default MenageProducts;
