import type {NextPage} from 'next';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import CommonSnackbar from "@/components/shared/CommonSnackbar";
import QuestionList from "@/components/Index/QuestionList";
import AppBar from "@mui/material/AppBar";
import {IconButton} from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Django Tutorial Poll App</title>
                <meta name='description' content='djagno tutorial poll app'/>
                <link rel='icon' href='/favicon.ico'/>
            </Head>
            {/* @ts-ignore */}
            <AppBar position="static" color="dark">
                <Toolbar variant="dense">
                    <Typography variant="h5" color="inherit" component="div">
                        Poll Questions
                    </Typography>
                </Toolbar>
            </AppBar>

            <main className={styles.main}>
                <QuestionList/>
            </main>

            <CommonSnackbar/>
        </div>
    );
};

export default Home;
