import {apiClient} from '@/lib/apiClient';
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {Box, Button, Divider, IconButton, Stack, TextField, Typography} from "@mui/material";
import {Controller, useForm, useFieldArray} from "react-hook-form";
import {useEffect} from "react";
import {QuestionDetailRequest} from "../../../../api/@types";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import {useAtom} from "jotai";
import {messageAtom} from "@/lib/jotaiAtom";

export const CreateForm = () => {
    const queryClient = useQueryClient()
    const [, addMessage] = useAtom(messageAtom);

    const {register, handleSubmit, control, setError, formState: {errors}} = useForm<QuestionDetailRequest>();
    const postUrl = apiClient.polls.questions.$path();

    // 可変長項目
    // https://react-hook-form.com/api/usefieldarray
    const {fields: choiceFields, append: appendChoice, remove: removeChoice} = useFieldArray({
        control,
        name: "choice_set"
    });

    useEffect(() => {
        if (choiceFields.length <= 0) appendChoice({choice_text: ''})
    }, [])


    const mutation = useMutation(
        // [memo]
        // aspida は form data で送信されるが、
        // 入れ子の項目 choice があるので form data ではなく json で送信したい。(form data は入れ子にできないとのこと)
        // そのため aspida のクライアント(apiClient) を使用せずに axios で送信する。
        (postData: QuestionDetailRequest) => axios.post(postUrl, postData),
        {
            onSuccess: (resData, postData) => {
                // questions のキャッシュは全クリア
                queryClient.invalidateQueries(['questions'])
                addMessage({text: "登録しました", "variant": "success"});
            },
            onError: (error: any) => {
                console.log(error)
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

    const trimValues = (obj: any) => {
        if (typeof obj === "string") return obj.trim()

        for (const [key, value] of Object.entries(obj)) {
            obj[key] = trimValues(value)
        }
        return obj;
    }
    const onSubmit = (_data: QuestionDetailRequest) => {
        const data = trimValues(_data)
        mutation.mutate(data)
    }

    const choiceFieldComponent = (
        choiceFields.map((field, index) => (
            <div key={field.id}>
                <Controller
                    name={`choice_set.${index}.choice_text`}
                    control={control}
                    defaultValue=""
                    rules={{required: "入力してください"}}
                    render={({field}) => {
                        return (
                            <Stack direction='row'>
                                <TextField {...field}
                                           label={`回答${index + 1}`}
                                           sx={{width: '100%'}}
                                           required
                                           InputLabelProps={{
                                               shrink: true,
                                           }}
                                           error={!!errors.choice_set?.at(index)?.choice_text}
                                           helperText={errors.choice_set?.at(index)?.choice_text?.message}
                                />
                                <IconButton aria-label="delete" color="inherit" onClick={() => removeChoice(index)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Stack>
                        )
                    }}/>
            </div>)
        )
    )
    console.log("errors", errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <Controller
                    name="question_text"
                    control={control}
                    defaultValue=""
                    // rules={{required: "入力してください"}}
                    render={({field}) =>
                        <TextField {...field}
                                   label="質問内容"
                                   placeholder="どうして..."
                            // required
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
                <Box>
                    <Typography variant="h6">回答</Typography>
                    <Typography variant="subtitle2">
                        質問への回答項目を入力してください
                    </Typography>
                </Box>

                {choiceFieldComponent}

                <Box sx={{display: "flex"}}>
                    <div style={{flexGrow: 1}}/>
                    <Button variant="outlined" color="inherit" aria-label="add choice" onClick={() => {
                        appendChoice({choice_text: ""})
                    }}>
                        回答追加
                    </Button>
                </Box>

                <Box pt={1} sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Divider sx={{width: "100%", mb: 2}}/>
                    <Button type="submit" variant="contained" color="primary" size="medium">登録</Button>
                </Box>
            </Stack>
        </form>
    )
}