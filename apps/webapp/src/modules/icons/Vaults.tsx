import { Icon, IconProps } from './Icon';

export const Vaults = (props: IconProps) => (
  <Icon {...props}>
    <path
      d="M4 4C4 2.89543 4.89543 2 6 2H18C19.1046 2 20 2.89543 20 4V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M15 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M4 7H20" stroke="currentColor" strokeWidth="2" />
  </Icon>
);
