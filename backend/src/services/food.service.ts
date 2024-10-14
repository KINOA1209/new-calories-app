import { FoodEntity, UserEntity } from "@/entities";
import { AppDataSource } from "@/setup";
import { FoodType, GetFoodType, GetFood14Type, UpdateFoodType } from "@/types";
import { Between, Repository } from "typeorm";
import { Role } from "@/types";

export const addFood = async (data: FoodType): Promise<FoodEntity> => {
  const { date, calrory, food, user } = data;
  const foodRepository: Repository<FoodEntity> =
    AppDataSource.getRepository(FoodEntity);
  const newFood = await foodRepository.save({
    date,
    calrory,
    food,
    userId: user,
  });
  return newFood;
};

export const getFoods = async (data: GetFoodType): Promise<FoodEntity[]> => {
  const { from, to, user } = data;
  const foodRepository: Repository<FoodEntity> =
    AppDataSource.getRepository(FoodEntity);

  const fromDate = new Date(from);
  const toDate = new Date(to);
  fromDate.setDate(fromDate.getDate() - 1);

  return await foodRepository.find({
    where: { userId: { uuid: user.uuid }, date: Between(fromDate, toDate) },
    select: ["uuid", "date", "food", "calrory"],
    order: {
      date: "ASC",
    },
  });
};

// admin role
