import { LineItemIdentifier } from "@mui/x-charts";
import { PATH } from "constant";
import { Dayjs } from "dayjs";
import { useFoodChart, useQuery } from "hooks";
import { debounce } from "lodash";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppActions, useAppDispatch, useAppSelector } from "store";
import { TError, TFood, TFoodError, TPeriod, TPeriodError } from "types";
import { convertDate } from "utils";
import { AddFoodView } from "views";

export const AddFoodContainer: React.FC = () => {
  const { searchData } = useAppSelector((store) => store.data);
  const { user } = useAppSelector((store) => store.user);
  const navigate = useNavigate();
  const { foods } = useAppSelector((store) => store.food);
  const foodChart = useFoodChart(foods);
  const [date, setDate] = useState<Date | null>(null);
  const calroryRef = useRef<number>(0);
  const foodRef = useRef<string>("");
  const [foodError, setFoodError] = useState<TFoodError>({
    date: "",
    food: "",
  });
  const [foodModalOpen, setFoodModalOpen] = useState<boolean>(false);
  const [detailEntries, setDetailEntries] = useState<TFood[]>([]);
  const dispatch = useAppDispatch();
  const { isLg, isMd } = useQuery();
  const debounceSearch = useCallback(
    debounce((query: string) => {
      if (query !== "") {
        dispatch(AppActions.data.getSearchDataRequest(query));
      }
    }, 500),
    []
  );
  const [period, setPeriod] = useState<TPeriod>({ from: null, to: null });
  const [periodErorr, setPeriodError] = useState<TPeriodError>({
    from: "",
    to: "",
  });
  const openFoodModal = () => setFoodModalOpen(true);
  const closeFoodModal = () => setFoodModalOpen(false);
  const dateChange = (date: Dayjs | null) => {
    setDate(date ? date.toDate() : null);
  };
  const fromChange = (date: Dayjs | null) => {
    setPeriod({ ...period, from: date ? date.toDate() : null });
  };
  const toChange = (date: Dayjs | null) => {
    setPeriod({ ...period, to: date ? date.toDate() : null });
  };
  const foodChange = (e: ChangeEvent<HTMLInputElement>) => {
    foodRef.current = e.target.value;
    debounceSearch(e.target.value);
  };
  const next = () => {
    toast.success("New Food added successfully");
  };
  const validFood = () => {
    setFoodError({
      food: foodRef.current === "" ? "Food is required" : "",
      date: date === null ? "Date is required" : "",
    });
  };
  const fail = (error: TError) => {
    if(error.status === 401)
      navigate(PATH.SIGN_IN);
    toast.error(error.message);
  }
  const addFood = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    validFood();
    if (date !== null && foodRef.current !== "") {
      dispatch(
        AppActions.food.addFoodRequest({
          date: new Date(date.setHours(23, 59, 59)),
          food: foodRef.current,
          calrory: calroryRef.current,
          next,
          fail
        })
      );
    }
  };
  const validPeriod = () => {
    setPeriodError({
      from: period.from === null ? "From is required" : "",
      to: period.to === null ? "To is required" : "",
    });
  };
  const filterPeriod = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    validPeriod();
    if (period.from !== null && period.to !== null) {
      dispatch(AppActions.food.getFoodRequest({...period, fail}));
    }
  };
  const getDetailFood = (
    _e: React.MouseEvent<SVGElement, MouseEvent>,
    f: LineItemIdentifier
  ) => {
    const index = f.dataIndex || 0;
    const date = Object.keys(foodChart)[index];
    openFoodModal();
    setDetailEntries([
      ...foods.filter((food) => {
        const label = convertDate(food.date);
        return label === date;
      }),
    ]);
  };
  return (
    <AddFoodView
      data={searchData}
      user={user}
      isLg={isLg}
      isMd={isMd}
      date={date}
      dateChange={dateChange}
      fromChange={fromChange}
      toChange={toChange}
      foodRef={foodRef}
      calroryRef={calroryRef}
      addFood={addFood}
      foodChange={foodChange}
      foodError={foodError}
      period={period}
      periodError={periodErorr}
      filterPeriod={filterPeriod}
      chartLabel={Object.keys(foodChart)}
      chartData={Object.values(foodChart)}
      dailyLimit={user ? user.calrory : 0}
      getDetailFood={getDetailFood}
      foodModalOpen={foodModalOpen}
      closeFoodModal={closeFoodModal}
      detailEntries={detailEntries}
    />
  );
};
