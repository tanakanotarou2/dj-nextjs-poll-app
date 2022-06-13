import {NextPageWithLayout} from "next";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import {Controller, useForm} from "react-hook-form";
import {useEffect} from "react";
import {Box, Button, Container, Stack, TextField, Typography} from "@mui/material";
import Paper from '@mui/material/Paper';
import {CreateForm} from "@/components/questions/new/form";


const NewQuestion: NextPageWithLayout = () => {
    const {register, handleSubmit, control, watch, formState: {errors}} = useForm();
    const onSubmit = data => console.log(data);

    // console.log(watch("exampleRequired")); // watch input value by passing the name of it
    // useEffect(()=>{
    //
    // },) // watch("exampleRequired")

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <>
            <Container maxWidth="sm">
                <Typography variant="h4" component="h2" sx={{mb: 4}}>質問作成</Typography>
                <CreateForm/>
            </Container>
        </>
    );
}
NewQuestion.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

export default NewQuestion