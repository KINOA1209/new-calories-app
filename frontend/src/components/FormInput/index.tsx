import {
    FormControl,
    InputAdornment,
    TextField,
    TextFieldVariants,
  } from "@mui/material";
  
  interface FormInputProps {
    label: string;
    name: string;
    value: string;
    variant?: TextFieldVariants;
    errors?: string;
    touched?: boolean;
    onChange?: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    StartIcon?: React.FC;
    EndIcon?: React.FC;
  }
  
  export const FormInput: React.FC<FormInputProps> = ({
    errors,
    touched,
    label,
    name,
    value,
    variant = "outlined",
    onChange,
    StartIcon,
    EndIcon,
  }) => {
    return (
      <FormControl variant="outlined" fullWidth>
        <TextField
          label={label}
          name={name}
          variant={variant}
          value={value}
          onChange={onChange}
          error={touched && Boolean(errors)}
          helperText={touched && errors}
          slotProps={{
            input: {
              startAdornment: StartIcon && (
                <InputAdornment position="start">
                  <StartIcon />
                </InputAdornment>
              ),
              endAdornment: EndIcon && (
                <InputAdornment position="start">
                  <EndIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </FormControl>
    );
  };
  