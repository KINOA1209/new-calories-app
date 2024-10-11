import { FormControl, FormHelperText, SxProps, Theme } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";

interface DatePickerComponentProps {
  date: Date | null;
  dateChange: (date: Dayjs | null) => void;
  error: string;
  label: string;
  sx?: SxProps<Theme>;
}
export const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  date,
  dateChange,
  error,
  label,
  sx,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]} sx={{ ...sx }}>
        <FormControl>
          <DatePicker
            label={label}
            value={date === null ? null : dayjs(date)}
            onChange={dateChange}
            format="LL"
          />
          <FormHelperText error={true}>{error}</FormHelperText>
        </FormControl>
      </DemoContainer>
    </LocalizationProvider>
  );
};
