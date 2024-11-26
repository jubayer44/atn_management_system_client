import { format } from "date-fns";

export const columnOptions = [
  { value: "name", label: "Employee Name" },
  { value: "tripId", label: "Trip ID" },
  { value: "date", label: "Date" },
  { value: "tripStartTime", label: "Trip Start Time" },
  { value: "tripEndTime", label: "Trip End Time" },
  { value: "duration", label: "Duration (Hours)" },
  { value: "durationInNumber", label: "Duration In Number" },
  { value: "payment", label: "Payment" },
  { value: "hourlyRate", label: "Hourly Rate" },
  { value: "tripReceipt", label: "Trip Receipt" },
  { value: "memo", label: "Memo" },
];
export const exportColumnOptions = [
  { value: "name", label: "Employee Name" },
  { value: "tripId", label: "Trip ID" },
  { value: "date", label: "Date" },
  { value: "tripStartTime", label: "Trip Start Time" },
  { value: "tripEndTime", label: "Trip End Time" },
  { value: "duration", label: "Duration (Hours)" },
  { value: "durationInNumber", label: "Duration In Number" },
  { value: "payment", label: "Payment" },
  { value: "hourlyRate", label: "Hourly Rate" },
  { value: "tripReceipt", label: "Trip Receipt" },
  { value: "memo", label: "Memo" },
  { value: "totalHours", label: "Total Working Hours" },
  { value: "totalPayment", label: "Total Payment" },
];

export const formateDate = (date) => format(new Date(date), "dd-MM-yyyy");

export const totalPaymentSum = (data) => {
  return data
    .reduce((total, item) => total + Number(item.payment), 0)
    ?.toFixed(4);
};

export const totalHourDurationSum = (data) => {
  // Convert the time durations to total minutes and then sum them up
  const totalMinutes = data.reduce((acc, item) => {
    if (!item.duration) return;
    const [hours, minutes] = item.duration.split(":").map(Number);
    return acc + hours * 60 + minutes;
  }, 0);

  // Convert total minutes to hours and remaining minutes
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  return `${totalHours}:${remainingMinutes}`;
};
