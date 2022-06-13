import {apiClient} from '@/lib/apiClient';
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import {Controller, useForm, useFieldArray} from "react-hook-form";
import {useEffect} from "react";
import {QuestionDetailRequest} from "../../../../api/@types";

export const CreateForm = () => {
    const queryClient = useQueryClient()

    const {register, handleSubmit, control, formState: {errors}} = useForm<QuestionDetailRequest>();
    const {fields: choiceFields, append: appendChoice} = useFieldArray({
        control,
        name: "choice_set"
    });

    useEffect(() => {
        if (choiceFields.length <= 0) appendChoice({choice_text: ''})
    }, [])

    const mutation = useMutation(
        (postData: QuestionDetailRequest) => apiClient.polls.questions.$post({body: postData}),
        {
            onSuccess: (resData, postData) => {
                // questions のキャッシュは全クリア
                queryClient.invalidateQueries(['questions'])
            },
            onError: (error: any) => {
                // const err: any = errorHandler.putError(error);
                // console.log(error, err)
                // if (err instanceof SingleErrorMessage) {
                //     addMessage({text: err.message, "variant": "warning"});
                // } else {
                //
                //     addMessage({text: "不明なエラー", "variant": "error"});
                // }
            }
        }
    )

    const onSubmit = (data: QuestionDetailRequest) => {
        // console.log(data)
        // mutation(
        // upvoteMutation.mutate(choice)
    }

    const choiceFieldComponent = (
        choiceFields.map((field, index) => (
            <div key={field.id}>
                <Controller
                    name={`choice_set.${index}.choice_text`}
                    control={control}
                    defaultValue=""
                    rules={{required: "入力してください"}}
                    render={({field}) =>
                        <TextField {...field}
                                   label={`回答${index + 1}`}
                                   sx={{width: '100%'}}
                                   required
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                                   error={!!errors.choice_set?.at(index)?.choice_text}
                                   helperText={errors.choice_set?.at(index)?.choice_text?.message}
                        />} />
            </div>)
        )
    )
    console.log(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <Controller
                    name="question_text"
                    control={control}
                    defaultValue=""
                    rules={{required: "入力してください"}}
                    render={({field}) =>
                        <TextField {...field}
                                   label="質問内容"
                                   placeholder="どうして..."
                                   required
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                                   error={!!errors.question_text}
                                   helperText={errors.question_text?.message}
                        />}
                />
                <Controller
                    name="pub_date"
                    control={control}
                    rules={{required: "入力してください"}}
                    render={({field}) =>
                        <TextField
                            {...field}
                            label="投票開始日時"
                            required
                            type="datetime-local"
                            defaultValue=""
                            sx={{width: 250}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={!!errors.pub_date}
                            helperText={errors.pub_date?.message}
                        />}
                />
                <div>
                    <Typography variant="h6">回答</Typography>
                    <Typography variant="subtitle2">
                        質問への回答項目を作成してください
                    </Typography>
                </div>
                {choiceFieldComponent}
                <Box sx={{display: "flex"}}>
                    <div style={{flexGrow: 1}}/>
                    <Button type="submit" variant="contained" color="primary" sx={{mx: "auto"}}
                            size="medium">登録</Button>
                </Box>
            </Stack>
        </form>
    )
}