import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { IoClose } from "react-icons/io5";
import Cookies from "js-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { addCard } from "../../../api/CustomerDetailsApi";

const initialFormData = {
  mobileNumber: Cookies.get("num"),
  cardholder: "",
  number: "",
  cvv: "",
  defaultCard: false,
};

const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
const date = new Date().getFullYear();

function AddCard(props) {
  const { dialogState, closeDialog } = props;
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [apiState, setApiState] = useState("INITIAL");
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    let arr = [];
    for (let i = date; i <= date + 6; i++) {
      arr.push(String(i));
    }
    setYears(arr);
  }, []);

  const handleCloseDialog = () => {
    setFormData(initialFormData);
    closeDialog();
  };

  const handleFormChange = (e) => {
    setError(false)
    if (e.target.name === "defaultCard") {
      if (e.target.checked === true) {
        setFormData({ ...formData, [e.target.name]: true });
      } else {
        setFormData({ ...formData, [e.target.name]: false });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addNewCard = async (e) => {
    e.preventDefault();
    if (formData.number.length !== 16) {
      setError(true);
      setErrorMessage("Enter valid card number");
    } else if (formData.cvv.length !== 3) {
      setError(true);
      setErrorMessage("Enter valid CVV");
    } else {
      setApiState("LOADING");
      let sendData = formData;
      sendData.validThru = selectedMonth + selectedYear;
      const { status, data } = await addCard(sendData);
      if (status === 200) {
        setFormData(initialFormData);
        setSelectedMonth("");
        setSelectedYear("");
        setApiState("SUCCESS");
        setFormData(initialFormData);
        closeDialog(true, data.message);
      } else {
        setApiState("ERROR");
        setError(true);
        setErrorMessage(data.error);
      }
    }
  };

  return (
    <Dialog open={dialogState} maxWidth="xl" fullWidth>
      <div>
        <div className="addNewAddressHeaderContainer">
          <p className="addNewAddressHeaderPara">Add new card</p>
          <button
            onClick={handleCloseDialog}
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            <IoClose style={{ fontSize: "30px" }} />
          </button>
        </div>
        <form className="addNewAddressForm" onSubmit={addNewCard}>
          <input
            placeholder="Cardholder Name"
            className="addressInput"
            name="cardholder"
            type="text"
            value={formData.cardholder}
            onChange={handleFormChange}
            required
          />
          <input
            placeholder="Card Number"
            className="addressInput"
            name="number"
            type="number"
            value={formData.number}
            onChange={handleFormChange}
            required
          />
          <input
            placeholder="CVV"
            className="addressInput"
            name="cvv"
            type="number"
            value={formData.cvv}
            onChange={handleFormChange}
            required
          />
          <p
            className="addNewAddressTypePara"
            style={{ margin: "10px 0 0 10px" }}
          >
            Valid Thru:
          </p>
          <div className="eachCardValidThruContainer">
            <Autocomplete
              options={months}
              value={selectedMonth}
              onChange={(event, newValue) => {
                setSelectedMonth(newValue);
              }}
              sx={{ width: "110px" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Month"
                  size="small"
                  required
                  sx={{
                    input: { color: "#33272a" },
                    label: { color: "#33272a" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#33272a",
                      },
                      "&:hover fieldset": {
                        borderColor: "#33272a",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#33272a",
                      },
                    },
                  }}
                />
              )}
            />
            <Autocomplete
              options={years}
              value={selectedYear}
              onChange={(event, newValue) => {
                setSelectedYear(newValue);
              }}
              sx={{ width: "120px", ml: 1 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Year"
                  size="small"
                  required
                  sx={{
                    input: { color: "#33272a" },
                    label: { color: "#33272a" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#33272a",
                      },
                      "&:hover fieldset": {
                        borderColor: "#33272a",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#33272a",
                      },
                    },
                  }}
                />
              )}
            />
          </div>
          <div className="checkbox-con">
            <p className="addNewAddressTypePara">Default Card </p>
            <input
              id="checkbox"
              type="checkbox"
              name="defaultCard"
              onChange={handleFormChange}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <button type="submit" className="addAddressSubmitButton">
              {apiState === "LOADING" ? (
                <CircularProgress
                  size={30}
                  thickness={6}
                  sx={{ color: "#faeee7" }}
                />
              ) : (
                "Add Card"
              )}
            </button>
            {error && <p className="cardCvvErrorMessage">{errorMessage}</p>}
          </div>
        </form>
      </div>
    </Dialog>
  );
}
export default AddCard;
