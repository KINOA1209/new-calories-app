// UserList.tsx
import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

interface UserListProps {
  users: any[];
  onUserClick: (user: any) => void;
}

export const UserList: React.FC<UserListProps> = ({ users, onUserClick }) => {
  return (
    <List component="nav" aria-label="user list" sx={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: 3 }}>
      <Typography variant="h6" sx={{ padding: '16px', fontWeight: 'bold', color: '#333' }}>User List</Typography>
      {users.map((user) => (
        <ListItem
          button
          key={user.uuid}
          onClick={() => onUserClick(user)}
          sx={{
            padding: '12px',
            '&:hover': {
              backgroundColor: '#efefef',
            },
          }}
        >
          <ListItemText primary={user.name} sx={{ fontSize: '16px', color: '#000' }} />
        </ListItem>
      ))}
    </List>
  );
};


