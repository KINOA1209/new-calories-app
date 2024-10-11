import { Grid2, Skeleton } from "@mui/material";
import { useQuery } from "hooks";

export const HomeSkeleton: React.FC = () => {
  const { isSm, isMd, isLg } = useQuery();

  const length = isSm ? 4 : isMd ? 8 : isLg ? 12 : 16;

  return (
    <Grid2 container spacing={2} width={"100%"}>
      {Array.from({ length }).map((_, idx) => (
        <Grid2 size={isSm ? 12 : isMd ? 6 : isLg ? 4 : 3} key={idx}>
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={"calc(25vh - 42px)"}
          />
        </Grid2>
      ))}
    </Grid2>
  );
};
