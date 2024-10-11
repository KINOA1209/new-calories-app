import { Box, CssBaseline, Toolbar } from "@mui/material";
import { TitleBar } from "../Title";
import { Navbar } from "../Navbar";
import { AppActions, useAppDispatch, useAppSelector } from "store";
import { useNavigate } from "react-router-dom";
import { PATH } from "constant";

interface LayoutProps {
  children: React.ReactNode;
  navbar?: boolean;
}

export const MainLayout: React.FC<LayoutProps> = ({ children, navbar }) => {
  const { user } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const next = () => {
    localStorage.clear();
    navigate(PATH.SIGN_IN);
  }; 
  const logout = () => {
    dispatch(AppActions.user.logout({ next }));
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TitleBar user={user} />
      {navbar && <Navbar logout={logout} user={user}/>}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
