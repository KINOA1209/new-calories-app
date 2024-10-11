import { PATH } from "constant";
import { FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppActions, useAppDispatch } from "store";
import { TError, TSignUp } from "types";
import { SignUpView } from "views";

export const SignUpContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const next = () => {
    navigate(PATH.SIGN_IN);
  };
  const fail = (data: TError) => {
    toast.error(data.message);
    if (data.messages) {
      data.messages.map((msg) => toast.error(msg));
    }
  };
  const onSubmit = (value: TSignUp, action: FormikHelpers<TSignUp>) => {
    dispatch(AppActions.user.signUpRequest({ ...value, next, fail }));
    action.resetForm();
  };
  return <SignUpView onSubmit={onSubmit} />;
};
