import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";

const SelectType = [
    { label: "choise1", choiseNumb: 1 },
    { label: "choise2", choiseNumb: 2 },
    { label: "choise3", choiseNumb: 3 },
];

const centerContentStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "100px",
};

const containerStyle = {
    maxWidth: "800px",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "60px",
};

const buttonContainerStyle = {
    gridColumn: "span 2",
    textAlign: "center",
    paddingBottom: "200px",
};

function Contacts() {
    return (
        <div style={centerContentStyle}>
            <Typography
                sx={{
                    fontSize: "26px",
                    fontWeight: "700",
                    textAlign: "center",
                    paddingBottom: "20px",
                }}
                variant="h2"
            >
                Contacts Us
            </Typography>
            <Typography
                sx={{
                    textAlign: "center",
                    fontSize: "16px",
                    maxWidth: "430px",
                    paddingBottom: "100px",
                }}
                variant="h2"
            >
                Say Hello send us your thoughts about our products or share your ideas
                with our Team!
            </Typography>
            <Box style={containerStyle}>
                <TextField
                    id="standard-basic"
                    label="First name"
                    variant="standard"
                />
                <TextField
                    id="standard-basic"
                    label="Last Name"
                    variant="standard"
                />
                <TextField
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                />
                <Autocomplete
                    disableCloseOnSelect
                    id="disable-close-on-select"
                    options={SelectType}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Subject"
                            sx={{
                                "& .MuiInput-underline:before": {
                                    borderBottom: "none",
                                },
                                "& .MuiInput-underline:after": {
                                    borderBottom: "1px solid black",
                                },
                            }}
                        />
                    )}
                />
                <TextField
                    id="message"
                    label="Message"
                    variant="standard"
                    sx={{ gridColumn: "span 2" }}
                />
                <div style={buttonContainerStyle}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            width: "auto",
                            backgroundColor: "black",
                            color: "white",
                            width: "400px",
                            "&:hover": {
                                backgroundColor: "grey",
                            },
                        }}
                    >
                        Send
                    </Button>
                </div>
            </Box>
        </div>
    );
}

export default Contacts;
