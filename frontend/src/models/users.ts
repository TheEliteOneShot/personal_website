export interface UserPopover {
  id: number;
  avatar?: string;
  badge?: string;
  username: string;
  fullName: string;
  location: string;
  position: string;
  bio: string;
  color?: string;
  initials?: string;
}

export interface User {
  id?: Number;
  username?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  role?: string;
  disabled?: boolean;
}
