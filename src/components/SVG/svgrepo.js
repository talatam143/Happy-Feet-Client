export const HomeIcon = (props) => {
    const{color} = props
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
    const{color} = props
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
    const{color} = props
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
      <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
    </svg>
  );
};

export const UserIcon = (props) => {
    const{color} = props
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
      <circle cx="12" cy="10" r="4" />
      <path d="M6 24v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
    </svg>
  );
};