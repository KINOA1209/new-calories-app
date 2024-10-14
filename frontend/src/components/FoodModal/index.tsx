// FoodModal.tsx
import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

interface FoodModalProps {
  openModal: boolean;
  isEditing: boolean;
  newFoodData: any;
  handleCloseModal: () => void;
  handleSaveFood: () => void;
  handleInputChange: (e: any) => void;
}

export const FoodModal: React.FC<FoodModalProps> = ({
  openModal, isEditing, newFoodData, handleCloseModal, handleSaveFood, handleInputChange
}) => {
  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box sx={{ padding: 4, backgroundColor: 'white', borderRadius: 3, margin: 'auto', marginTop: '10%', width: '400px', boxShadow: 24 }}>
        <Typography variant="h5" sx={{ marginBottom: '16px', fontWeight: 'bold' }}>{isEditing ? 'Edit Food' : 'Add New Food'}</Typography>
        <TextField
          label="Date"
          name="date"
          type="date"
          value={newFoodData.date}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ marginBottom: '16px' }}
        />
        <TextField label="Food" name="food" value={newFoodData.food} onChange={handleInputChange} fullWidth margin="normal" />
        <TextField label="Calory" name="calrory" value={newFoodData.calrory} onChange={handleInputChange} fullWidth margin="normal" />
        <Button
          onClick={handleSaveFood}
          variant="contained"
          sx={{
            marginTop: '16px',
            backgroundColor: '#1976d2',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#115293',
            },
          }}
          fullWidth
        >
          Save
        </Button>
        <Button
          onClick={handleCloseModal}
          variant="outlined"
          color="secondary"
          sx={{ marginTop: '8px', borderColor: '#d32f2f', color: '#d32f2f' }}
          fullWidth
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};


