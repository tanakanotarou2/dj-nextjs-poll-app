import type {NextPage} from 'next';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import {useEffect} from 'react';
import QuestionList from "@/components/Index/QuestionList";
// import { useAspidaQuery } from "@aspida/react-query"
// import aspida from "@aspida/axios" // "@aspida/fetch", "@aspida/node-fetch"
// import api from "../api/$api"
import {atom, useAtom} from 'jotai'
import {atomFamily} from 'jotai/utils'
import {nanoid} from "nanoid";
import {useSnackbar, VariantType} from "notistack";
import {Button} from "@mui/material";
import {messagesAtom, writeMessageAtom} from "@/lib/jotaiAtom";
import CommonSnackbar from "@/components/shared/CommonSnackbar";

const Home: NextPage = () => {

    const [, addMessage] = useAtom(writeMessageAtom);

    const additem = () => {
        const title = {message: "test2<br> てすとです。\nどのようにひょうじされますか？", variant: "warning"}
        // const id = nanoid();
        addMessage(title);
        console.log("add");
    }
    const additem2 = () => {
        const title = {message: "test2", variant: "success"}
        // const id = nanoid();
        addMessage(title);
        console.log("add");
    }
    const additem3 = () => {
        const title = {message: "test2", variant: "error"}
        // const id = nanoid();
        addMessage(title);
        console.log("add");
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Django Tutorial Poll App</title>
                <meta name='description' content='djagno tutorial poll app'/>
                <link rel='icon' href='/favicon.ico'/>
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>Poll Questions</h1>
                {/*<QuestionList />*/}
                <button onClick={additem} value="add">add</button>
                <button onClick={additem2} value="add">add</button>
                <button onClick={additem3} value="add">add</button>
            </main>

            <CommonSnackbar/>
        </div>
    );
};

export default Home;
