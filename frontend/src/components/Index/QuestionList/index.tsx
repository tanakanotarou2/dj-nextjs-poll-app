import {apiClient} from '@/lib/apiClient';
import {useQueryClient, useMutation} from 'react-query'
import {useAspidaQuery} from "@aspida/react-query";
import DeleteIcon from '@mui/icons-material/Delete';
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

const QuestionList = () => {

    const queryClient = useQueryClient()

    // .get がコールされた結果を受け取る
    const {
        data: questionData,
        isLoading,
        refetch: questionRefetch
    } = useAspidaQuery(apiClient.polls.questions, {query: {limit: 10,},});


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
                                                <ChoiceItem choice={choice}/>
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