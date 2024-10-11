import { Search } from "@mui/icons-material";
import { Box, ImageList } from "@mui/material";
import { FormInput } from "components";
import { TData } from "types";
import { HomeSkeleton, ImageCard } from "./component";
import { useQuery } from "hooks";

interface HomeViewProps {
  query: string;
  data: TData[];
  queryChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  query,
  queryChange,
  data,
}) => {
  const { isSm, isMd, isLg } = useQuery();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      padding={1}
      alignItems={"center"}
      justifyContent={"start"}
      height={"calc(100vh - 112px)"}
      overflow={"hidden"}
    >
      <FormInput
        name="query"
        value={query}
        label="Enter food name(e.g: Hamburger)..."
        onChange={queryChange}
        EndIcon={Search}
      />
      {data.length > 0 ? (
        <ImageList cols={isSm ? 1 : isMd ? 2 : isLg ? 3 : 4}>
          {data.map((item) => (
            <ImageCard item={item} key={item.nixItemId} />
          ))}
        </ImageList>
      ) : (
        <HomeSkeleton />
      )}
    </Box>
  );
};
