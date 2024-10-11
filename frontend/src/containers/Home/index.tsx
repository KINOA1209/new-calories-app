import { useCallback, useState } from "react";
import { HomeView } from "views";
import { debounce } from "lodash";
import { AppActions, useAppDispatch, useAppSelector } from "store";

export const HomeContainer: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const { data } = useAppSelector((store) => store.data);
  const dispatch = useAppDispatch();
  const debounceSearch = useCallback(
    debounce((query: string) => {
      if (query !== "") {
        dispatch(AppActions.data.getDataRequest(query));
      }
    }, 500),
    []
  );
  const queryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuery(e.target.value);
    debounceSearch(e.target.value);
  };
  return <HomeView query={query} queryChange={queryChange} data={data} />;
};
