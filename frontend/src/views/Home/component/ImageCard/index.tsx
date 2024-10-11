import { ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import { TData } from "types";

interface ImageCardProps {
  item: TData;
}
export const ImageCard: React.FC<ImageCardProps> = ({ item }) => {
  return (
    <ImageListItem
      key={item.nixItemId}
      sx={{ border: "1px solid rgba(150, 150, 150)" }}
    >
      <img src={item.photo.thumb} alt={item.brandName} loading="lazy" />
      <ImageListItemBar
        title={item.foodName}
        subtitle={item.brandName}
        actionIcon={
          <Typography
            sx={{ color: "white", paddingRight: 2, textWrap: "nowrap" }}
          >
            {item.nfCalories} cal
          </Typography>
        }
      />
    </ImageListItem>
  );
};
