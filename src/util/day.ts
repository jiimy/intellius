import dayjs from 'dayjs';

export const dayChat = (date:any) => {
  // 023-12-06T20:35:45
  return dayjs(date).format("A h:mm");
}