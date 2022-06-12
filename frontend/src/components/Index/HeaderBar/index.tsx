import AppBar from "@mui/material/AppBar";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button} from "@mui/material";

const HeaderBar = () => {
    return (
        <>
            {/* @ts-ignore */}
            <AppBar position="static" color="dark">
                <Toolbar variant="dense">
                    <Typography variant="h5" color="inherit" component="div" sx={{ flexGrow: 1 }}>
                        Poll Questions
                    </Typography>

                    <Button color="inherit" variant="outlined">質問作成</Button>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default HeaderBar;
