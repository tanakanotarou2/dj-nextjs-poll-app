import AppBar from "@mui/material/AppBar";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button, Link} from "@mui/material";
import {useRouter} from "next/router";

import Head from 'next/head';
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
            <Head>
                <title>Django Tutorial Poll App</title>
                <meta name='description' content='djagno tutorial poll app'/>
                <link rel='icon' href='/favicon.ico'/>
            </Head>
            <div style={{minHeight: "100vh"}}>
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
                <div style={{paddingTop: 30}}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default DefaultLayout;
