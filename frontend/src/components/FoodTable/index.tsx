// FoodTable.tsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid, TextField, Pagination } from '@mui/material';

interface FoodTableProps {
  food: any[];
  paginatedFood: any[];
  page: number;
  rowsPerPage: number;
  onEditFood: (foodItem: any) => void;
  onDeleteFood: (foodUuid: string) => void;
  handlePageChange: (event: any, value: number) => void;
  handleRowsPerPageChange: (event: any) => void;
}

export const FoodTable: React.FC<FoodTableProps> = ({
  food, paginatedFood, page, rowsPerPage, onEditFood, onDeleteFood, handlePageChange, handleRowsPerPageChange
}) => {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: 3, padding: '16px' }}>
      <Table>
        <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Food</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Calory</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedFood.map((foodItem) => (
            <TableRow key={foodItem.uuid}>
              <TableCell>{foodItem.date}</TableCell>
              <TableCell>{foodItem.food}</TableCell>
              <TableCell>{foodItem.calrory}</TableCell>
              <TableCell>
                <Button variant="text" sx={{ color: '#1976d2' }} onClick={() => onEditFood(foodItem)}>Edit</Button>
                <Button variant="text" sx={{ color: '#d32f2f' }} onClick={() => onDeleteFood(foodItem.uuid)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Grid container alignItems="center" justifyContent="space-between" sx={{ marginTop: '16px' }}>
        <Grid item>
          <TextField
            label="Rows per page"
            type="number"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            inputProps={{ min: 1 }}
          />
        </Grid>
        <Grid item>
          <Pagination
            count={Math.ceil(food.length / rowsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Grid>
      </Grid>
    </TableContainer>
  );
};


