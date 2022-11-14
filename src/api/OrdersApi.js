import Cookies from "js-cookie";

const server = process.env.REACT_APP_SERVER_URL;

export const placeOrder = async (data) => {
  let token = Cookies.get("HappyT");
  const url = `${server}order/placeorder/`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
};
