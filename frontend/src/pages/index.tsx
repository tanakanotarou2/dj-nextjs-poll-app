import type {NextPage} from 'next';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import CommonSnackbar from "@/components/shared/CommonSnackbar";
import QuestionList from "@/components/Index/QuestionList";
import HeaderBar from "@/components/Index/HeaderBar";

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Django Tutorial Poll App</title>
                <meta name='description' content='djagno tutorial poll app'/>
                <link rel='icon' href='/favicon.ico'/>
            </Head>
            <HeaderBar/>

            <main className={styles.main}>
                <QuestionList/>
            </main>

            <CommonSnackbar/>
        </div>
    );
};

export default Home;
