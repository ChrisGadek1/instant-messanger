import * as React from "react";
import {Box, Container, Stack} from "@mui/material";
import SignedOut from "./SignedOut";

const Main = () => {
    return(
        <Stack
            sx={{backgroundColor: "#eaebdd", width: "100vw", height: "100vh"}}
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}>
            <SignedOut />
        </Stack>

    )
}

export default Main;