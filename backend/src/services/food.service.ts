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

export const getAllFoodsFor14Days = async (
  data: GetFood14Type
): Promise<number> => {
  const { from, to } = data;
  const foodRepository: Repository<FoodEntity> =
    AppDataSource.getRepository(FoodEntity);
  return await foodRepository.count({
    where: { date: Between(from, to) },
    select: ["uuid", "date", "food", "calrory"],
  });
};

export const getAverageCaloriesForAllUsers = async (
  data: GetFood14Type
): Promise<{ user: string; avg: number }[]> => {
  const { from, to } = data;
  const foodRepository: Repository<FoodEntity> =
    AppDataSource.getRepository(FoodEntity);
  const userRepository = AppDataSource.getRepository(UserEntity);

  // Fetch all users with the role of USER
  const users = await userRepository.find({
    where: { role: Role.USER }, // Filter by USER role
    select: ["uuid", "name"], // Select user uuid and name
  });

  const result = [];

  for (const user of users) {
    // Fetch all food entries for the current user between the given date range
    const foodEntries = await foodRepository.find({
      where: {
        userId: { uuid: user.uuid }, // Filter by user
        date: Between(from, to),
      },
      select: ["calrory"], // Select only the calories field
    });

    // Calculate total and average calories for the user
    const totalCalories = foodEntries.reduce((total, food) => total + food.calrory, 0);
    const averageCalories = foodEntries.length > 0 ? totalCalories / foodEntries.length : 0;

    result.push({
      user: user.name,
      avg: averageCalories,
    });
  }

  return result;
};



export const updateFood = async (
  foodData: UpdateFoodType
): Promise<FoodEntity | null> => {
  const { uuid, ...updatedData } = foodData;
  const foodRepository: Repository<FoodEntity> =
    AppDataSource.getRepository(FoodEntity);

  const food = await foodRepository.findOne({ where: { uuid } });
  if (!food) {
    return null;
  }

  Object.assign(food, updatedData);
  return await foodRepository.save(food);
};

export const deleteFood = async (uuid: string): Promise<boolean> => {
  const foodRepository: Repository<FoodEntity> =
    AppDataSource.getRepository(FoodEntity);

  const food = await foodRepository.findOne({
    where: { uuid: uuid },
  });

  if (!food) {
    return false;
  }

  await foodRepository.remove(food);
  return true;
};


export const getFoodEntriesByUser = async (userUuid: string): Promise<FoodEntity[]> => {
  const foodRepository: Repository<FoodEntity> =
    AppDataSource.getRepository(FoodEntity);

  return await foodRepository.find({
    where: { userId: { uuid: userUuid } },
    select: ["uuid", "date", "food", "calrory"],
    order: { date: "ASC" },
  });
};