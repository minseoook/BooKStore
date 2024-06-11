import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko"); // global로 한국어 locale 사용

export const formatDay = (date: string) => {
  const formatDate = dayjs(date);

  // 원하는 형식으로 변환
  const formattedDate = formatDate.format("YYYY년 M월 D일");
  return formattedDate;
};
