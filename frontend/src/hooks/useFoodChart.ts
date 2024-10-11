import { useEffect, useState } from "react";
import { TFood } from "types";
import { convertDate } from "utils";

export const useFoodChart = (foods: TFood[]): Record<string, number> => {
  const [foodChart, setFoodChart] = useState<Record<string, number>>({});
  useEffect(() => {
    setFoodChart({
      ...foods.reduce((acc: Record<string, number>, { date, calrory }) => {
        if (date !== null) {
          const label = convertDate(date);
          acc[label] = (acc[label] || 0) + calrory;
        }
        return acc;
      }, {}),
    });
  }, [foods]);
  return foodChart;
};
