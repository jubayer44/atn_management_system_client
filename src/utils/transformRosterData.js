import { formateDate } from "./utils";

export const transformRosterData = (response) => {
  return {
    statusCode: response?.statusCode,
    success: response?.success,
    message: response?.message,
    meta: response?.meta,
    data: response?.data.map((item) => ({
      id: item?.id || "",
      name: item?.individual?.name || "",
      email: item?.individual?.email || "",
      phone: item?.individual?.phone || "",
      role: item?.role?.name || "",
      weekendNo: item?.weekend?.weekendNo || "",
      address: item?.individual?.address || "",
      city: item?.individual?.city || "",
      state: item?.individual?.state || "",
      zip: item?.individual?.zip || "",
    })),
  };
};
export const transformManageRoster = (response) => {
  return {
    statusCode: response?.statusCode,
    success: response?.success,
    message: response?.message,
    meta: response?.meta,
    data: response?.data.map((item) => ({
      id: item?.id || "",
      individualId: item?.individualId || "",
      weekendId: item?.weekendId || "",
      roleId: item?.roleId || "",
      name: item?.individual?.name || "",
      email: item?.individual?.email || "",
      role: item?.role?.name || "",
      weekendNo: item?.weekend?.weekendNo || "",
      dateBegin: item?.weekend?.dateBegin
        ? formateDate(item?.weekend?.dateBegin)
        : "",
      dateEnd: item?.weekend?.dateEnd
        ? formateDate(item?.weekend?.dateEnd)
        : "",
    })),
  };
};

export const transformSingleRoster = (response) => {
  return {
    statusCode: response?.statusCode,
    success: response?.success,
    message: response?.message,
    data: {
      id: response?.id || "",
      individualId: response?.data?.individualId || "",
      weekendId: response?.data?.weekendId || "",
      roleId: response?.data?.roleId || "",
      name: response?.data?.individual?.name || "",
      email: response?.data?.individual?.email || "",
      role: response?.data?.role?.name || "",
      weekendNo: response?.data?.weekend?.weekendNo || "",
      dateBegin: formateDate(response?.data?.weekend?.dateBegin) || "",
      dateEnd: formateDate(response?.data?.weekend?.dateEnd) || "",
    },
  };
};
