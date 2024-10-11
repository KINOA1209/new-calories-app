import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useMemo, useState } from "react";

interface FormPasswordProps {
  name: string;
  value: string;
  id?: string;
  label?: string;
  errors?: string;
  touched?: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
export const FormPassword: React.FC<FormPasswordProps> = ({
  name,
  value,
  errors,
  touched,
  onChange,
  label = "Password",
  id = "password",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleMouseUpPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  const error = useMemo(() => touched && Boolean(errors), [touched, errors]);
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor={id} error={error}>
        Password
      </InputLabel>
      <OutlinedInput
        id={id}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        error={error}
      />
      <FormHelperText error={error}>{touched && errors}</FormHelperText>
    </FormControl>
  );
};
