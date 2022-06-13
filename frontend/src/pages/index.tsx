import type {NextPageWithLayout} from 'next';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import CommonSnackbar from "@/components/shared/CommonSnackbar";
import QuestionList from "@/components/Index/QuestionList";

const Home: NextPageWithLayout = () => {
    return (
        <div>
            <main>
                <QuestionList/>
            </main>

            <CommonSnackbar/>
        </div>
    );
};

export default Home;
