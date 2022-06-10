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
}


const ChoiceItem = (props: Props) => {
    return (
        <ListItem
            secondaryAction={
                (<>
                    <Typography variant="button">{props.choice.votes}</Typography>
                    <IconButton edge="end" aria-label="up bote">
                        <KeyboardArrowUpIcon/>
                    </IconButton>
                </>)
            }
        >
            <ListItemText primary={props.choice.choice_text}/>
        </ListItem>
    )
}


export default ChoiceItem;