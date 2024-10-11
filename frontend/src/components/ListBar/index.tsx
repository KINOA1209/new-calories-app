import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
  } from "@mui/material";
  import { blue } from "@mui/material/colors";
  import { useLocation, useNavigate } from "react-router-dom";
  
  interface ListBarProps {
    link: string;
    icon: React.ReactNode;
    label: string;
  }
  
  export const ListBar: React.FC<ListBarProps> = ({ link, label, icon }) => {
    const navigate = useNavigate();
    const onClick = (path: string) => navigate(path);
    const location = useLocation();
    return (
      <ListItem
        disablePadding
        sx={{
          borderRight:
            location.pathname === link ? `4px solid ${blue[500]}` : null,
        }}
      >
        <ListItemButton onClick={() => onClick(link)}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={label} />
        </ListItemButton>
      </ListItem>
    );
  };
  