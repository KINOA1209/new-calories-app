import { PATH } from "constant";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppActions, useAppDispatch } from "store";

interface PrivateRouteProps {
  Page: React.FC;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ Page }) => {
  const navigate = useNavigate();
  const next = () => {
    navigate(PATH.SIGN_IN);
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(AppActions.user.getUserRequest({ next }));
  }, []);
  return <Page />;
};
