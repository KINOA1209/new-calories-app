import { Assessment, Home, LunchDining } from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { PowerSettingsNew } from "@mui/icons-material";
import { ListBar } from "components"; // Assuming ListBar is a custom component
import { PATH } from "constant";
import { ERole, TUser } from "types"; 

const drawerWidth = 240;

interface NavbarProps {
  logout: () => void;
  user: TUser | null; // Accept user prop
}

export const Navbar: React.FC<NavbarProps> = ({ logout, user }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box
        sx={{
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 64px)",
          justifyContent: "space-between",
        }}
      >
        <List>
          <ListBar icon={<Home />} label="Home" link={PATH.DASHBOARD} />
          {user?.role === ERole.User && (
            <>
              <ListBar icon={<LunchDining />} label="Add Food" link={PATH.ADD_FOOD} />
              <ListBar icon={<Assessment />} label="Daily Report" link={PATH.DAILY_REPORT} />
            </>
          )}
          {user?.role === ERole.Admin && (
            <>
              <ListBar icon={<LunchDining />} label="Food Management" link={PATH.MANAGEMENT} />
              <ListBar icon={<Assessment />} label="Report" link={PATH.STATISTICS} />
            </>
          )}
        </List>
        <ListItem disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <PowerSettingsNew />
            </ListItemIcon>
            <ListItemText primary={"Log out"} />
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  );
};
