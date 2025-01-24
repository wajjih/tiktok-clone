export interface RandomUsers {
  id: string;
  name: string;
  image: string;
}

// Layout Include Types
export interface MenuItemTypes {
  iconString: string;
  colorString: string;
  sizeString: string;
}

export interface MenuItemFollowCompTypes {
  user: RandomUsers;
}
