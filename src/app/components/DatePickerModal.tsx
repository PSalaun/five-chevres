import { Dialog } from "@mui/material";
import { LocalizationProvider, StaticDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import 'dayjs/locale/fr';

const DatePickerModal = ({ createMatchCallback, isOpen}: {createMatchCallback: (datetime:string) => void, isOpen: boolean}) => {
    return (
      <Dialog
        open={isOpen}
       >
        Choisir une date :
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
        <StaticDateTimePicker
          orientation="landscape"
          disablePast
          ampm={false}
          defaultValue={dayjs('today')}
          onAccept={(e) => createMatchCallback(e!.toISOString()) } />
        </LocalizationProvider>
      </Dialog>
    )
  }

export default DatePickerModal;