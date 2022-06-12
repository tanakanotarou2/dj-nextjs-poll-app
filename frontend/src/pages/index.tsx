import type {NextPage} from 'next';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import CommonSnackbar from "@/components/shared/CommonSnackbar";
import QuestionList from "@/components/Index/QuestionList";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Django Tutorial Poll App</title>
                <meta name='description' content='djagno tutorial poll app'/>
                <link rel='icon' href='/favicon.ico'/>
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>Poll Questions</h1>
                <QuestionList />
            </main>

            <CommonSnackbar/>
        </div>
    );
};

export default Home;
