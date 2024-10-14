import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

interface UserAverage {
  user: string;
  avg: number;
}

interface PaginationTableProps {
  data: UserAverage[];
}

export const StatisticsTableView: React.FC<PaginationTableProps> = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#212121', color: '#ffffff' }}>
            <TableCell sx={{ fontWeight: 'bold', color: '#ffffff', fontSize: '1.1rem' }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#ffffff', fontSize: '1.1rem' }}>Average Calories</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((userAverage) => (
            <TableRow key={userAverage.user} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f7f7f7' }, '&:hover': { backgroundColor: '#f0f0f0' } }}>
              <TableCell sx={{ fontSize: '1rem', padding: '10px 20px' }}>{userAverage.user}</TableCell>
              <TableCell sx={{ fontSize: '1rem', padding: '10px 20px' }}>{userAverage.avg}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        sx={{ '& .MuiTablePagination-toolbar': { backgroundColor: '#fafafa', color: '#333' }, '& .MuiTablePagination-select': { fontSize: '0.9rem' } }}
      />
    </TableContainer>
  );
};