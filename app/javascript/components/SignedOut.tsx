import * as React from "react";
import {Card, CardContent, Typography} from "@mui/material";

const SignedOut = () => {
    return(
        <Card sx={{ width: "80%", minWidth: "275px" }}>
            <CardContent>
                <Typography variant="h5" component="div" sx={{textAlign: "center"}}>
                    Wygląda na to, że nie jesteś zalogowany
                </Typography>
                <Typography sx={{ mb: 1.5, textAlign: "center" }} color="text.secondary">
                    Zaloguj się, aby korzystać z naszej aplikacji!
                </Typography>
            </CardContent>
        </Card>
    )
}

export default SignedOut;