// src/main-pages/Management.tsx
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Card, CardContent, Box } from '@mui/material';
import { useQuery, useMutation } from '@apollo/client';
import { GET_COMPANIES, GET_RESTAURANTS, GET_WAREHOUSES } from '../query/queries';
import { ADD_COMPANY, ADD_RESTAURANT, ADD_WAREHOUSE } from '../query/mutations';

const Management: React.FC = () => {
  const { data: companiesData, refetch: refetchCompanies } = useQuery(GET_COMPANIES);
  const { data: restaurantsData, refetch: refetchRestaurants } = useQuery(GET_RESTAURANTS);
  const { data: warehousesData, refetch: refetchWarehouses } = useQuery(GET_WAREHOUSES);

  const [addCompany] = useMutation(ADD_COMPANY);
  const [addRestaurant] = useMutation(ADD_RESTAURANT);
  const [addWarehouse] = useMutation(ADD_WAREHOUSE);

  const [newCompanyName, setNewCompanyName] = useState('');
  const [newVatNumber, setNewVatNumber] = useState('');
  const [newRestaurantName, setNewRestaurantName] = useState('');
  const [newWarehouseName, setNewWarehouseName] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState('');

  const handleAddCompany = async () => {
    await addCompany({ variables: { name: newCompanyName, vatNumber: newVatNumber } });
    setNewCompanyName('');
    setNewVatNumber('');
    refetchCompanies();
  };

  const handleAddRestaurant = async () => {
    await addRestaurant({ variables: { name: newRestaurantName, companyId: selectedCompanyId } });
    setNewRestaurantName('');
    refetchRestaurants();
  };

  const handleAddWarehouse = async () => {
    await addWarehouse({ variables: { name: newWarehouseName, companyId: selectedCompanyId } });
    setNewWarehouseName('');
    refetchWarehouses();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Management
      </Typography>

      <Card style={{ marginTop: 20 }}>
        <CardContent>
          <Typography variant="h6">Add Company</Typography>
          <TextField
            label="Company Name"
            value={newCompanyName}
            onChange={(e) => setNewCompanyName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="VAT Number"
            value={newVatNumber}
            onChange={(e) => setNewVatNumber(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleAddCompany}>
            Add Company
          </Button>
        </CardContent>
      </Card>

      <Card style={{ marginTop: 20 }}>
        <CardContent>
          <Typography variant="h6">Add Restaurant</Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel id="select-company-label">Select Company</InputLabel>
            <Select
              labelId="select-company-label"
              value={selectedCompanyId}
              onChange={(e) => setSelectedCompanyId(e.target.value)}
            >
              {companiesData?.companies.map((company) => (
                <MenuItem key={company.id} value={company.id}>
                  {company.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Restaurant Name"
            value={newRestaurantName}
            onChange={(e) => setNewRestaurantName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleAddRestaurant} disabled={!selectedCompanyId}>
            Add Restaurant
          </Button>
        </CardContent>
      </Card>

      <Card style={{ marginTop: 20 }}>
        <CardContent>
          <Typography variant="h6">Add Warehouse</Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel id="select-company-label">Select Company</InputLabel>
            <Select
              labelId="select-company-label"
              value={selectedCompanyId}
              onChange={(e) => setSelectedCompanyId(e.target.value)}
            >
              {companiesData?.companies.map((company) => (
                <MenuItem key={company.id} value={company.id}>
                  {company.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Warehouse Name"
            value={newWarehouseName}
            onChange={(e) => setNewWarehouseName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleAddWarehouse} disabled={!selectedCompanyId}>
            Add Warehouse
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Management;
