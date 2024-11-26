import { format } from "date-fns";

export const transformTimeSheetData = (response) => {
  return {
    statusCode: response?.statusCode,
    success: response?.success,
    message: response?.message,
    meta: response?.data?.meta,
    totalPayment: response?.data?.data?.totalPayment?._sum?.payment,
    data: response?.data?.data?.trips?.map((item) => ({
      id: item?.id || "",
      name: item?.name || "",
      tripId: item?.tripId || "",
      date: (item?.date && format(new Date(item?.date), "dd/MM/yyyy")) || "",
      tripStartTime:
        (item?.tripStartTime &&
          format(new Date(item?.tripStartTime), "hh:mm a")) ||
        "",
      tripEndTime:
        (item?.tripEndTime && format(new Date(item?.tripEndTime), "hh:mm a")) ||
        "",
      duration: item?.duration || "",
      durationInNumber: item?.durationInNumber || "",
      payment: item?.payment || "",
      hourlyRate: item?.hourlyRate || "",
      tripReceipt: item?.tripReceipt || "",
      memo: item?.memo || "",
      userId: item?.userId || "",
    })),
  };
};
