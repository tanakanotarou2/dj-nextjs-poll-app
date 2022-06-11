import {apiClient} from '@/lib/apiClient';
import {useQueryClient, useMutation} from 'react-query'
import {useAspidaQuery} from "@aspida/react-query";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
    Box,
    Card,
    CardActions,
    CardContent, Divider,
    Grid,
    IconButton,
    List, ListItem, ListItemAvatar, ListItemText,
    Paper,
    Stack,
    styled,
    Typography
} from "@mui/material";
import {Choice} from "../../../../api/@types";

interface Props {
    choice: Choice;
    onUpVote: Function;
}

const StyledListItem = styled(ListItem)(({ theme }) => ({
    // 偶数行目の背景色を変える
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover,
    },
}));



const ChoiceItem = (props: Props) => {
    const {choice, onUpVote} = props;
    return (
        <StyledListItem
            secondaryAction={
                (<>
                    <Typography variant="button">{props.choice.votes}</Typography>
                    <IconButton edge="end" aria-label="up vote" color="primary" onClick={() => onUpVote(choice)}>
                        <KeyboardArrowUpIcon/>
                    </IconButton>
                </>)
            }
        >
            <ListItemText primary={props.choice.choice_text}/>
        </StyledListItem>
    )
}


export default ChoiceItem;