export type TMessage = {
  id: number;
  from: string;
  title: string;
  message: string;
  date: string;
  isRead?: boolean;
};
