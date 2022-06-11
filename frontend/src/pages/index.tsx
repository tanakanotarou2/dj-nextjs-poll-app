import type {NextPage} from 'next';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import {useEffect} from 'react';
import QuestionList from "@/components/Index/QuestionList";
// import { useAspidaQuery } from "@aspida/react-query"
// import aspida from "@aspida/axios" // "@aspida/fetch", "@aspida/node-fetch"
// import api from "../api/$api"

const Home: NextPage = () => {

    useEffect(() => {
        const fetchArticle = async () => {
            // $ つきの場合は response.body を自動で展開してくれる
            // const res2 = await apiClient.api.polls.questions.get();
            // console.log('res2', res2);
            // create
            // const res3 = await apiClient.polls.questions.$post({
            //     body:{
            //         question_text: "test",
            //         pub_date: "2022-06-07T01:26:56.937Z",
            //     }
            // })
            // console.log("res3", res3)

            // patch
            // const res4 =await apiClient.polls.questions._id(16).$patch({
            //     body:{ question_text:"upd" }
            // })
            // console.log("res4",res4);

            // delete
            // const res4 =await apiClient.polls.questions._id(17).$delete()
            // console.log("res4",res4);
        };
        fetchArticle();
    }, []);

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
        </div>
    );
};

export default Home;
