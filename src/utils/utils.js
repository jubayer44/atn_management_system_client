import { format } from "date-fns";

export const columnOptions = [
  { value: "name", label: "Employee Name" },
  { value: "date", label: "Date" },
  { value: "tripId", label: "Trip ID" },
  { value: "tripStartTime", label: "Trip Start Time" },
  { value: "tripEndTime", label: "Trip End Time" },
  { value: "duration", label: "Duration (Hours)" },
  { value: "tripReceipt", label: "Trip Receipt" },
  { value: "memo", label: "Memo" },
];

export const columnOptionsForManage = [
  { value: "name", label: "Name" },
  { value: "email", label: "Email" },
  { value: "role", label: "Role" },
  { value: "weekend", label: "Weekend" },
  { value: "dateBegin", label: "Date Begin" },
  { value: "dateEnd", label: "Date End" },
];

export const individualsColumnsOption = [
  { value: "name", label: "Name" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "gender", label: "Gender" },
  { value: "address", label: "Address" },
  { value: "city", label: "City" },
  { value: "state", label: "State" },
  { value: "zip", label: "Zip" },
  { value: "notes", label: "Notes" },
];

export const weekendsColumnsOption = [
  { value: "weekendNo", label: "Weekend" },
  { value: "layDirector", label: "Lay Director" },
  { value: "description", label: "Description" },
  { value: "dateBegin", label: "Date Begin" },
  { value: "dateEnd", label: "Date End" },
];

export const rolesColumnsOptions = [
  { value: "name", label: "Role" },
  { value: "abbreviation", label: "Abbreviation" },
];

export const formateDate = (date) => format(new Date(date), "dd-MM-yyyy");
