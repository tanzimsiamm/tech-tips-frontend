import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  className?: string;
  name: string;
  disabled?: boolean;
}

export type TJwtDecoded = {
  email : string;
  exp : number;
  iat : number;
  role : string;
}

export type TUser = {
  _id?: string;
  name: string;
  email: string;
  role: string;
  image?: string;
  coverImg?: string;
  memberShip?: null | {
    takenDate: string;
    exp: string;
    package: object;
  };
  followers?: string[];
  following?: string[];
  iat?: number;
  exp?: number;
  isBlocked?: boolean;
};


export type TComment = {
  _id? : string;
  comment : string,
  postId : string,
  userInfo  : {
    name : string,
    email : string,
    image : string
  },
  createdAt? : string,
  updatedAt? : string,
 
}

// type for post
export type TPost = {
    _id? : string,
    title : string;
    category : string;
    votes?: number
    voters?: [{ 
      userId: string, 
      voteType: string 
    }],
    description : string;
    images : string[];
    comments? : TComment[];
    authorInfo : {
      name : string;
      email: string;
      image : string;
      role :string;
      authorId : string;
      authorEmail : string;
    }
    isPremium? : boolean;
    createdAt? : string,
    updatedAt? : string,
};