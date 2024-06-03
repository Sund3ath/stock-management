// src/main-pages/Rezepturen.tsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Alert, MenuItem, Select, InputLabel, FormControl, Card, CardContent, CardHeader, Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS, GET_PRODUCT_MATERIALS, GET_MATERIALS } from '../query/queries';
import { ADD_PRODUCT, UPDATE_PRODUCT_MATERIALS, ADD_RECIPE_MATERIAL, REMOVE_RECIPE_MATERIAL } from '../query/mutations';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const Rezepturen: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { data: productData, loading: productLoading, error: productError, refetch: refetchProducts } = useQuery(GET_PRODUCTS);
  const { data: materialListData } = useQuery(GET_MATERIALS);
  const [getProductMaterials, { data: materialData, loading: materialLoading, error: materialError, refetch: refetchMaterials }] = useLazyQuery(GET_PRODUCT_MATERIALS);
  const [addProduct] = useMutation(ADD_PRODUCT);
  const [updateProductMaterials] = useMutation(UPDATE_PRODUCT_MATERIALS);
  const [addRecipeMaterial] = useMutation(ADD_RECIPE_MATERIAL);
  const [removeRecipeMaterial] = useMutation(REMOVE_RECIPE_MATERIAL);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState({ id: '', name: '', quantity: 0, unit: '' });
  const [open, setOpen] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [alertMessage, setAlertMessage] = useState({ type: '', message: '' });

  useEffect(() => {
    if (selectedProduct) {
      getProductMaterials({ variables: { filterRecipeArgs: { productId: selectedProduct.id } } });
    }
  }, [selectedProduct, getProductMaterials]);

  useEffect(() => {
    if (materialData && materialData.recipes) {
      const formattedMaterials = materialData.recipes.map((recipe) => ({
        id: recipe.material.id,
        name: recipe.material.name,
        quantity: recipe.quantity,
        unit: recipe.unit,
      }));
      setMaterials(formattedMaterials);
    }
  }, [materialData]);

  const handleAddProduct = async () => {
    if (newProductName && user) {
      try {
        await addProduct({
          variables: {
            createProductInput: {
              name: newProductName,
              userId: user.id,
            },
          },
        });
        setNewProductName('');
        refetchProducts();
        setOpen(false);
      } catch (error) {
        setAlertMessage({ type: 'error', message: 'Error adding product' });
      }
    } else {
      setAlertMessage({ type: 'error', message: 'Please provide a product name and ensure you are logged in' });
    }
  };

  const handleRowClick = (params) => {
    setSelectedProduct(params.row);
  };

  const handleAddMaterial = () => {
    if (newMaterial.id && newMaterial.quantity > 0) {
      const selectedMaterial = materialListData.materials.find((material) => material.id === newMaterial.id);
      setMaterials([...materials, { ...newMaterial, name: selectedMaterial.name }]);
      setNewMaterial({ id: '', name: '', quantity: 0, unit: '' });
    }
  };

  const handleRemoveMaterial = (id) => {
    setMaterials(materials.filter((material) => material.id !== id));
  };

  const handleSubmitMaterials = async () => {
    if (selectedProduct && materials.length > 0) {
      try {
        for (const material of materials) {
          await updateProductMaterials({
            variables: {
              updateRecipeInput: {
                materialId: material.id,
                productId: selectedProduct.id,
                quantity: material.quantity,
                unit: material.unit,
              },
            },
          });
        }
        refetchMaterials();
      } catch (error) {
        setAlertMessage({ type: 'error', message: 'Error updating materials' });
      }
    }
  };

  const productColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90, align: 'right', headerAlign: 'right' },
    { field: 'name', headerName: 'Product Name', width: 150, editable: true, align: 'right', headerAlign: 'right' },
  ];

  const materialColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90, align: 'right', headerAlign: 'right' },
    { field: 'name', headerName: 'Material Name', width: 150, editable: true, align: 'right', headerAlign: 'right' },
    { field: 'quantity', headerName: 'Quantity', width: 150, editable: true, align: 'right', headerAlign: 'right' },
    { field: 'unit', headerName: 'Unit', width: 150, editable: true, align: 'right', headerAlign: 'right' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      align: 'right',
      headerAlign: 'right',
      renderCell: (params) => (
        <Button variant="contained" color="secondary" onClick={() => handleRemoveMaterial(params.id)}>
          Remove
        </Button>
      ),
    },
  ];

  if (productLoading) return <p>Loading...</p>;
  if (productError) return <p>Error: {productError.message}</p>;

  return (
    <>
      <Container style={{ marginTop: 20 }}>
        <Typography variant="h4" gutterBottom>
          {t('rezepturen.title')}
        </Typography>
        <Typography variant="body1">
          {t('rezepturen.welcome')}
        </Typography>

        {alertMessage.message && <Alert severity={alertMessage.type}>{alertMessage.message}</Alert>}

        <Card style={{ marginTop: 20 }}>
          <CardHeader
            title={t('rezepturen.selectProduct')}
            action={
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                {t('rezepturen.addProduct')}
                </Button>
              </Box>
            }
          />
          <CardContent>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={productData.products}
                columns={productColumns}
                pageSize={5}
                onRowClick={handleRowClick}
              />
            </div>
          </CardContent>
        </Card>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Product Name"
              fullWidth
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddProduct} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {selectedProduct && (
          <Card style={{ marginTop: 20 }}>
            <CardHeader
              title={`Materials for ${selectedProduct.name}`}
              action={
                <Box mt={2}>
                  <Button variant="contained" color="primary" onClick={handleAddMaterial}>
                    {t('rezepturen.addMaterial')}
                  </Button>
                </Box>
              }
            />
            <CardContent>
              <FormControl fullWidth margin="normal">
                <InputLabel id="material-select-label">Material</InputLabel>
                <Select
                  labelId="material-select-label"
                  id="material-select"
                  value={newMaterial.id}
                  onChange={(e) => setNewMaterial({ ...newMaterial, id: e.target.value as string })}
                >
                  {materialListData.materials.map((material) => (
                    <MenuItem key={material.id} value={material.id}>
                      {material.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Quantity"
                type="number"
                value={newMaterial.quantity}
                onChange={(e) => setNewMaterial({ ...newMaterial, quantity: Number(e.target.value) })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Unit"
                value={newMaterial.unit}
                onChange={(e) => setNewMaterial({ ...newMaterial, unit: e.target.value })}
                fullWidth
                margin="normal"
              />

              <div style={{ height: 400, width: '100%', marginTop: 20 }}>
                <DataGrid
                  rows={materials}
                  columns={materialColumns}
                  pageSize={5}
                  getRowId={(row) => row.id}
                />
              </div>

              <Button variant="contained" color="secondary" onClick={handleSubmitMaterials}>
                {t('rezepturen.saveRecipe')}
              </Button>
            </CardContent>
          </Card>
        )}
      </Container>
    </>
  );
};

export default Rezepturen;
