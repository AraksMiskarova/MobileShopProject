import React, { useEffect, useState } from 'react';
import { Tab, Container } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import FormContacts from '../../components/MultiComponentsIC/FormCheckoutPage/FormContacts';
import ProductOrderInfo from '../../components/MultiComponentsIC/ProductOrderInfo/ProductOrderInfo';
import DeliveryPaymentInfo from '../../components/Smart/DeliveryPaymentInfo/DeliveryPaymentInfo';

export default function CheckoutPage() {
  const [value, setValue] = useState('1');

  const handleTabs = (event, newValue) => {
    setValue(newValue);
  };

  // Logic small Screen

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const handleScreenSize = () => {
    setIsSmallScreen(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleScreenSize();
    window.addEventListener('resize', handleScreenSize);
    return () => {
      window.removeEventListener('resize', handleScreenSize);
    };
  }, []);
  return (
    <Container maxWidth="lg">
      <TabContext value={value}>
        <TabList
          sx={{ padding: '20px 0' }}
          onChange={handleTabs}
          variant="fullWidth"
          centered
        >
          <Tab
            sx={{ fontSize: isSmallScreen ? 13 : 20, color: '#000000' }}
            label="Contacts"
            value="1"
          />
          <Tab
            sx={{ fontSize: isSmallScreen ? 13 : 20, color: '#000000' }}
            label="Delivery & Payment"
            value="2"
          />
          <Tab
            sx={{ fontSize: isSmallScreen ? 13 : 20, color: '#000000' }}
            label="Order Review"
            value="3"
          />
        </TabList>
        <TabPanel style={{ padding: '30px 20px' }} value="1">
          <FormContacts
            handelContinue={() => {
              setValue('2');
            }}
          />
        </TabPanel>
        <TabPanel style={{ padding: '30px 20px' }} value="2">
          <DeliveryPaymentInfo
            handelContinue={() => {
              setValue('3');
            }}
          />
        </TabPanel>
        <TabPanel style={{ padding: '30px 20px' }} value="3">
          <ProductOrderInfo />
        </TabPanel>
      </TabContext>
    </Container>
  );
}
