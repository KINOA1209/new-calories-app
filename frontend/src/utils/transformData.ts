import { TData, TFetchData } from "types";

export const transformData = (data: TFetchData[]): TData[] => {
  return data.map((item) => {
    return {
      servingUnit: item.serving_unit,
      nixBrandId: item.nix_brand_id,
      brandType: item.brand_type,
      foodName: item.food_name,
      servingQty: item.serving_qty,
      nfCalories: item.nf_calories,
      nixItemId: item.nix_item_id,
      photo: {
        thumb: item.photo.thumb,
      },
      brandName: item.brand_name,
      region: item.region,
      brandNameItemName: item.brand_name_item_name,
      locale: item.locale,
    };
  });
};
