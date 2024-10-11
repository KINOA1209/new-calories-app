import { Theme, useMediaQuery } from "@mui/material";

export const useQuery = () => {
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));
  const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
  const isXl = useMediaQuery((theme: Theme) => theme.breakpoints.down("xl"));
  return { isXs, isSm, isMd, isLg, isXl };
};
