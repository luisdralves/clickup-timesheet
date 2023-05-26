export type Status = {
  color: string;
  orderindex: number;
  status: string;
  type: string;
};

export type Task = {
  custom_type: string | null;
  id: string;
  name: string;
  space_id?: string;
  status: Status;
  url?: string;
};

export type User = {
  color: string;
  email: string;
  id: number;
  initials: string;
  profilePicture: string;
  username: string;
};

export type TimeEntry = {
  at: string;
  billable: boolean;
  description: string;
  duration: string;
  end: string;
  id: string;
  source: string;
  start: string;
  tags: unknown[];
  task: Task;
  task_location: {
    folder_id: string;
    list_id: string;
    space_id: string;
  };
  task_url: string;
  user: User;
  wid: string;
};

export type Space = {
  id: string;
  name: string;
};
