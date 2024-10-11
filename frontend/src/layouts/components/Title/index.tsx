import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { ERole, TUser } from "types";

interface TitleBarProps {
  user: TUser | null;
}

export const TitleBar: React.FC<TitleBarProps> = ({ user }) => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6" noWrap component="div">
            Calory Management App
          </Typography>
          <Typography variant="subtitle1" noWrap component="div">
            {user && `${user.name}(${ERole[user.role]})`}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
