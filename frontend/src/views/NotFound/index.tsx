import { Box, Button, Typography } from "@mui/material";
import { PATH } from "constant";
import { Link } from "react-router-dom";

export const NotFoundView: React.FC = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={6}
      alignItems={"center"}
      justifyContent={"center"}
      height={"calc(100vh - 112px)"}
    >
      <Typography variant="h2">Oops! Not Found</Typography>
      <Link to={PATH.DASHBOARD}>
        <Button variant="contained">Go to DashBoard</Button>
      </Link>
    </Box>
  );
};
