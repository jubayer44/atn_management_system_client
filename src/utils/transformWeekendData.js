import { formateDate } from "./utils";

export const transformWeekendsData = (response) => {
  return {
    success: response?.success,
    statusCode: response?.statusCode,
    message: response?.message,
    meta: response?.meta,
    data: response?.data.map((item) => {
      return {
        id: item?.id || "",
        weekendNo: item?.weekendNo || "",
        layDirector: item?.layDirector || "",
        description: item?.description || "",
        dateBegin: formateDate(item?.dateBegin) || "",
        dateEnd: formateDate(item?.dateEnd) || "",
      };
    }),
  };
};
export const transformSingleWeekendData = (response) => {
  return {
    success: response?.success,
    statusCode: response?.statusCode,
    message: response?.message,
    data: {
      id: response?.data?.id || "",
      weekendNo: response?.data?.weekendNo || "",
      layDirector: response?.data?.layDirector || "",
      description: response?.data?.description || "",
      dateBegin: formateDate(response?.data?.dateBegin) || "",
      dateEnd: formateDate(response?.data?.dateEnd) || "",
    },
  };
};
