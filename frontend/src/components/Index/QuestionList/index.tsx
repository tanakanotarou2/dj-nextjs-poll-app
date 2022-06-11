import {apiClient} from '@/lib/apiClient';
import {useQueryClient, useMutation, useQuery} from 'react-query'
import {useAspidaQuery} from "@aspida/react-query";
import {
    Box,
    Card,
    CardActions,
    CardContent, CardHeader, Divider,
    Grid,
    IconButton,
    List, ListItem, ListItemAvatar, ListItemText,
    Paper,
    Stack,
    styled,
    Typography
} from "@mui/material";

import {format} from 'date-fns'
import eolocale from 'date-fns/locale/eo'
import ChoiceItem from './ChoiceItem';
import React from 'react';
import {number} from "prop-types";
import {Choice, PaginatedQuestionDetailList} from "../../../api/@types";

const QuestionList = () => {

    const queryClient = useQueryClient()

    /* useAspidaQueryを使う場合 */
    // const {
    //     data: questionData,
    //     isLoading,
    //     refetch: questionRefetch
    // } = useAspidaQuery(apiClient.polls.questions, {query: {limit: 10,},});

    /* useAspidaQuery を使わず、 useQuery を使う場合は次のようになる */
    // 特定の key を設定したい場合はこちらを使う
    const {
        data: questionData,
        isLoading,
        // refetch: questionRefetch
    } = useQuery(['questions'],
        () => apiClient.polls.questions.$get({query: {limit: 10,}}),
    );

    const postUpvote = (choice: Choice) => {
        return apiClient.polls.questions._question_pk(choice.question).choices._id(choice.id).upvote.$post();
    };

    // const mutation = useMutation()
    const upVoteMutation = useMutation(postUpvote, {
            onSuccess: (resCoice, postChoice) => {
                // console.log("res",resCoice);
                // console.log("post",postChoice);
                const queryKey = apiClient.polls.questions.$path({query: {limit: 10}});

                // 再検索する場合
                // queryClient.invalidateQueries(queryKey)

                // response を使って キャッシュを更新
                const data = queryClient.getQueryData<PaginatedQuestionDetailList>(apiClient.polls.questions.$path({query: {limit: 10}}))
                if (!data) return;

                const newData = Object.assign({}, data);
                newData.results = data.results?.map(q => {
                    if (q.id !== resCoice.question) return q;

                    const newQuestion = Object.assign({}, q);
                    newQuestion.choice_set = q.choice_set.map((c: Choice) => {
                        if (c.id === resCoice.id) {
                            return resCoice;
                        }
                        return c;
                    });
                    return newQuestion;
                });
                // キャッシュをアップデート
                queryClient.setQueryData(queryKey, newData)

            }
        }
    )

    const onUpVote = (choice: Choice) => {
        upVoteMutation.mutate(choice)
        // const res3 = await apiClient.polls.questions.$post({
        //     body:{
        //         question_text: "test",
        //         pub_date: "2022-06-07T01:26:56.937Z",
        //     }
        // })
        // console.log("res3", res3)
    }


    let questionCards;
    if (!isLoading && !!questionData) {
        questionCards = questionData.results?.map((question, index) => {
            return (
                <Box key={question.id} p={2}>
                    <Card sx={{width: 600}} variant="outlined">
                        <CardContent>
                            <Box textAlign="right">
                                <Typography
                                    variant="caption">投票開始:{format(new Date(question.pub_date), 'yyyy-MM-dd HH:mm')}</Typography>
                            </Box>

                            <Typography variant="h5" mt={2} mb={2}>
                                {question.question_text}
                            </Typography>

                            <Divider/>
                            <Box mt="4">
                                <List>
                                    {question.choice_set.map((choice) => {
                                        return (
                                            <React.Fragment key={choice.id}>
                                                <ChoiceItem choice={choice} onUpVote={onUpVote}/>
                                            </React.Fragment>
                                        )
                                    })}
                                </List>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            )
        });
    } else {
        questionCards = (<div>loading...</div>);
    }
    return (
        <div>
            <Stack direction="column" justifyContent="center">
                {questionCards}
            </Stack>
        </div>
    )
}

export default QuestionList;