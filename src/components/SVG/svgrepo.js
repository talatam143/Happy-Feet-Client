export const HomeIcon = (props) => {
  const { color } = props;
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke={color}
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="5 12 3 12 12 3 21 12 19 12" />
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
      <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
    </svg>
  );
};

export const CartIcon = (props) => {
  const { color } = props;
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke={color}
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="17" cy="19" r="2" />
      <path d="M17 17h-11v-14h-2" />
      <path d="M6 5l14 1l-1 7h-13" />
    </svg>
  );
};

export const WishlistIcon = (props) => {
  const { color, size } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke={color}
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
    </svg>
  );
};

export const UserIcon = (props) => {
  const { color,size } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke={color}
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="10" r="4" />
      <path d="M6 24v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
    </svg>
  );
};

export const ToggleWishListIcon = (props) => {
  const { color } = props;
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke={color}
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
    </svg>
  );
};

export const FilterIcon = (props) => {
  const { color } = props;
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke={color}
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="6" cy="10" r="2" />
      <line x1="6" y1="4" x2="6" y2="8" />
      <line x1="6" y1="12" x2="6" y2="20" />
      <circle cx="12" cy="16" r="2" />
      <line x1="12" y1="4" x2="12" y2="14" />
      <line x1="12" y1="18" x2="12" y2="20" />
      <circle cx="18" cy="7" r="2" />
      <line x1="18" y1="4" x2="18" y2="5" />
      <line x1="18" y1="9" x2="18" y2="20" />
    </svg>
  );
};

export const SortIcon = (props) => {
  const { color } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="34"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke={color}
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 9l4 -4l4 4m-4 -4v14" />
      <path d="M21 15l-4 4l-4 -4m4 4v-14" />
    </svg>
  );
};

export const ArrowLeft = () => {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="#33272a"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1="5" y1="12" x2="19" y2="12" />
      <line x1="5" y1="12" x2="9" y2="16" />
      <line x1="5" y1="12" x2="9" y2="8" />
    </svg>
  );
};

export const OrderBox = (props) => {
  const { color, size } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke={color}
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" />
      <line x1="12" y1="12" x2="20" y2="7.5" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <line x1="12" y1="12" x2="4" y2="7.5" />
    </svg>
  );
};

export const CouponIcon = (props) => {
  const { color, size } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke={color}
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1="15" y1="5" x2="15" y2="7" />
      <line x1="15" y1="11" x2="15" y2="13" />
      <line x1="15" y1="17" x2="15" y2="19" />
      <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2" />
    </svg>
  );
};

export const RightIcon = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="#33272a"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="9 6 15 12 9 18" />
    </svg>
  );
};

