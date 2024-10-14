// FoodManageContainer.tsx
import React, { useEffect, useState } from 'react';
import { AppActions, useAppDispatch, useAppSelector } from 'store';
import { Grid, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { UserList, FoodTable, FoodModal } from "components";

export const FoodManageContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, food } = useAppSelector(store => store.admin);
  const [selectedUser, setSelectedUser] = useState({ uuid: '', name: '' });
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newFoodData, setNewFoodData] = useState({ uuid: '', date: null, food: '', calrory: 0 });
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(AppActions.admin.getUserListRequest());
  }, [dispatch]);

  useEffect(() => {
    if (selectedUser) {
      dispatch(AppActions.admin.getUserFoodRequest({ uuid: selectedUser.uuid }));
    }
  }, [dispatch, selectedUser]);

  const handleUserClick = (user: any) => setSelectedUser(user);

  const handleOpenModal = () => {
    setNewFoodData({ uuid: '', date: null, food: '', calrory: 0 });
    setIsEditing(false);
    setOpenModal(true);
  };

  const handleEditFood = (foodItem: any) => {
    setNewFoodData(foodItem);
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleSaveFood = async () => {
    if (selectedUser) {
      if (isEditing && newFoodData.uuid) {
        await dispatch(AppActions.admin.updateUserFoodRequest({
          uuid: newFoodData.uuid,
          date: newFoodData.date,
          food: newFoodData.food,
          calrory: newFoodData.calrory,
        }));
        toast.success("Food updated successfully");
      } else {
        await dispatch(AppActions.admin.addUserFoodRequest({ userId: selectedUser.uuid, ...newFoodData }));
        toast.success("Food added successfully");
      }
      dispatch(AppActions.admin.getUserFoodRequest({ uuid: selectedUser.uuid }));
      setOpenModal(false);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewFoodData(prevState => ({ ...prevState, [name]: value }));
  };

  const handlePageChange = (event: any, value: number) => setPage(value);
  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(Number(event.target.value) || 1);
    setPage(1);
  };

  const handleDeleteFood = (foodUuid: string) => {
    if (selectedUser) {
      dispatch(AppActions.admin.deleteUserFoodRequest({ uuid: foodUuid }));
      dispatch(AppActions.admin.getUserFoodRequest({ uuid: selectedUser.uuid }));
      toast.success("Food deleted successfully");
    }
  };

  const paginatedFood = food.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Grid container spacing={2} sx={{ backgroundColor: '#fff', padding: '20px' }}>
      <Grid item xs={4}>
        <UserList users={users} onUserClick={handleUserClick} />
      </Grid>
      <Grid item xs={8}>
        {selectedUser && (
          <>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: '16px' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>Food Log for {selectedUser.name}</Typography>
              <Button
                onClick={handleOpenModal}
                variant="contained"
                sx={{
                  backgroundColor: '#000',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#333' },
                }}
              >
                Add Food
              </Button>
            </Grid>
            <FoodTable
              food={food}
              paginatedFood={paginatedFood}
              page={page}
              rowsPerPage={rowsPerPage}
              onEditFood={handleEditFood}
              onDeleteFood={handleDeleteFood}
              handlePageChange={handlePageChange}
              handleRowsPerPageChange={handleRowsPerPageChange}
            />
          </>
        )}
      </Grid>

      <FoodModal
        openModal={openModal}
        isEditing={isEditing}
        newFoodData={newFoodData}
        handleCloseModal={() => setOpenModal(false)}
        handleSaveFood={handleSaveFood}
        handleInputChange={handleInputChange}
      />
    </Grid>
  );
};
