import { PATH } from "constant";
import { FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppActions, useAppDispatch } from "store";
import { TError, TSignIn } from "types";
import { SignInView } from "views";

export const SignInContainer: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const next = (token: string) => {
    localStorage.setItem("token", token);
    toast.success("Signed Successfully!");
    navigate(PATH.DASHBOARD);
  };
  const fail = (data: TError) => {
    toast.error(data.message);
    if (data.messages) {
      data.messages.map((msg) => toast.error(msg));
    }
  };
  const onSubmit = (value: TSignIn, action: FormikHelpers<TSignIn>) => {
    dispatch(AppActions.user.signInRequest({ ...value, next, fail }));
    action.resetForm();
  };
  return <SignInView onSubmit={onSubmit} />;
};
