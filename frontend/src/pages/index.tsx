import type {NextPage} from 'next';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import CommonSnackbar from "@/components/shared/CommonSnackbar";
import QuestionList from "@/components/Index/QuestionList";
import type {NextPageWithLayout} from 'next'
import DefaultLayout from '@/components/layouts/DefaultLayout';

const Home: NextPageWithLayout = () => {
    return (
        <div>
            <Head>
                <title>Django Tutorial Poll App</title>
                <meta name='description' content='djagno tutorial poll app'/>
                <link rel='icon' href='/favicon.ico'/>
            </Head>
            <main className={styles.main}>
                <QuestionList/>
            </main>

            <CommonSnackbar/>
        </div>
    );
};

export default Home;
