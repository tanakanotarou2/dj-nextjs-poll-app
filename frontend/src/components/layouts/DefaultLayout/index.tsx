import AppBar from "@mui/material/AppBar";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button, Link} from "@mui/material";
import {useRouter} from "next/router";

// @ts-ignore
const DefaultLayout = ({children}) => {
    const router = useRouter()
    const goCreate = () => {
        router.push("/questions/new")
    }
    const goHome = () => {
        router.push("/")
    }
    return (
        <>
            {/* @ts-ignore */}
            <AppBar position="static" color="dark">
                <Toolbar variant="dense">
                    <Link variant="h5" color="inherit" underline="none" component="button" onClick={goHome}>
                        Poll Questions
                    </Link>
                    <div style={{flexGrow: 1}}/>
                    <Button color="inherit" variant="outlined" onClick={goCreate}>質問作成</Button>
                </Toolbar>
            </AppBar>
            {children}
        </>
    )
}

export default DefaultLayout;
