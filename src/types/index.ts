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
