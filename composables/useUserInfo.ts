import { UserInfo } from "~~/types/user";

type userResApi = {
  message: string;
  data: UserInfo;
};

export default () => {
  const getInfo = async () => {
    // const res = (await api.makeRequest("/api/v1/auth/user-info")) as userResApi;
    const res = { message: "ok", data: {} } as userResApi;
    return res;
  };
  return { getInfo };
};
