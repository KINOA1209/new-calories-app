import {
    Autocomplete,
    Box,
    Button,
    FormControl,
    FormHelperText,
    List,
    ListItem,
    ListItemText,
    Modal,
    TextField,
    Typography,
  } from "@mui/material";
  import { TData, TFood, TFoodError, TPeriod, TPeriodError, TUser } from "types";
  import { DatePickerComponent } from "components";
  import { Dayjs } from "dayjs";
  import { LineChart, LineItemIdentifier } from "@mui/x-charts";
  import { blue, red } from "@mui/material/colors";
  
  interface AddFoodViewProps {
    data: TData[];
    user: TUser | null;
    isLg: boolean;
    isMd: boolean;
    date: Date | null;
    dateChange: (day: Dayjs | null) => void;
    foodRef: React.MutableRefObject<string>;
    calroryRef: React.MutableRefObject<number>;
    addFood: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    foodChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fromChange: (day: Dayjs | null) => void;
    toChange: (day: Dayjs | null) => void;
    foodError: TFoodError;
    period: TPeriod;
    periodError: TPeriodError;
    filterPeriod: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    chartLabel: string[];
    chartData: number[];
    dailyLimit: number;
    getDetailFood: (
      e: React.MouseEvent<SVGElement, MouseEvent>,
      f: LineItemIdentifier
    ) => void;
    foodModalOpen: boolean;
    closeFoodModal: () => void;
    detailEntries: TFood[];
  }
  
  export const AddFoodView: React.FC<AddFoodViewProps> = (props) => {
    return (
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={2}
        padding={1}
        alignItems={"start"}
        justifyContent={"start"}
        height={"calc(100vh - 112px)"}
        overflow={"hidden"}
      >
        <Box
          display={"flex"}
          flexDirection={props.isLg ? "column" : "row"}
          alignItems={"start"}
          gap={props.isLg ? 0 : 2}
          width={"100%"}
        >
          <DatePickerComponent
            label="Select Label"
            date={props.date}
            dateChange={props.dateChange}
            error={props.foodError.date}
            sx={{ padding: "8px 0px", minWidth: props.isLg ? "100%" : "240px" }}
          />
          <Autocomplete
            autoHighlight
            options={props.data}
            sx={{ width: "100%", padding: "8px 0px" }}
            getOptionLabel={(option: TData) => {
              props.foodRef.current = option.foodName;
              props.calroryRef.current = option.nfCalories;
              return `${option.foodName} - ${option.nfCalories} cal`;
            }}
            renderOption={(props, option: TData) => {
              const { key, ...optionProps } = props;
              return (
                <Box
                  key={key}
                  component="li"
                  sx={{
                    "& > img": {
                      mr: 2,
                      flexShrink: 0,
                      width: "auto",
                      minWidth: 20,
                      height: 20,
                      objectFit: "contain",
                    },
                  }}
                  {...optionProps}
                >
                  <img src={option.photo.thumb} alt="" />
                  {option.foodName} ({option.nfCalories}cal)
                </Box>
              );
            }}
            renderInput={(params) => {
              return (
                <FormControl fullWidth>
                  <TextField
                    {...params}
                    name="food"
                    label="Enter food name"
                    value={props.foodRef}
                    onChange={props.foodChange}
                    sx={{ width: "100%" }}
                  />
                  <FormHelperText error={true}>
                    {props.foodError.food}
                  </FormHelperText>
                </FormControl>
              );
            }}
          />
          <Button
            variant="contained"
            sx={{
              height: 56,
              minWidth: props.isLg ? "100%" : 96,
              textWrap: "nowrap",
              margin: "8px 0px",
            }}
            onClick={props.addFood}
          >
            Add Food
          </Button>
        </Box>
        <Typography>Daily Threshold: {props.user?.calrory}</Typography>
        <Box
          display={"flex"}
          flexDirection={props.isMd ? "column" : "row"}
          gap={2}
          width={"100%"}
          alignItems={"top"}
        >
          <DatePickerComponent
            label="From"
            date={props.period.from}
            dateChange={props.fromChange}
            error={props.periodError.from}
            sx={{ maxWidth: props.isLg ? "100%" : "240px" }}
          />
          <DatePickerComponent
            label="To"
            date={props.period.to}
            dateChange={props.toChange}
            error={props.periodError.to}
            sx={{ maxWidth: props.isLg ? "100%" : "240px" }}
          />
          <Button
            variant="contained"
            sx={{ height: "56px", marginTop: "8px", textWrap: "nowrap" }}
            onClick={props.filterPeriod}
          >
            Apply Filter
          </Button>
        </Box>
        <LineChart
          series={[{ data: props.chartData, label: "Calrory", area: true }]}
          xAxis={[
            {
              scaleType: "point",
              data: props.chartLabel,
            },
          ]}
          yAxis={[
            {
              min: 0,
              colorMap: {
                type: "piecewise",
                thresholds: [props.dailyLimit],
                colors: [`${blue[500]}`, `${red[500]}`],
              },
            },
          ]}
          slotProps={{ legend: { hidden: true } }}
          onMarkClick={props.getDetailFood}
        />
        <Modal
          open={props.foodModalOpen}
          onClose={props.closeFoodModal}
          sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Box
            sx={{
              minWidth: "50vw",
              minHeight: "50vh",
              outline: "none",
              bgcolor: "white",
              borderRadius: "4px",
              padding: 2,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Food Entries
            </Typography>
            <List>
              {props.detailEntries.map((item) => (
                <ListItem
                  key={item.uuid}
                  sx={{ boxShadow: "0px 2px 5px black", marginBottom: 1 }}
                >
                  <ListItemText>
                    {item.food}({item.calrory} cal)
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Box>
        </Modal>
      </Box>
    );
  };
  