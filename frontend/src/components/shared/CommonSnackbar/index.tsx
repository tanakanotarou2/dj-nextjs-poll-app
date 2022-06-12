import {useEffect} from 'react';
import {useAtom} from 'jotai'
import {useResetAtom} from 'jotai/utils'
import {useSnackbar} from "notistack";
import {messagesAtom} from "@/lib/jotaiAtom";

const CommonSnackbar = () => {
    /*
     * Snackbar のメッセージ表示を管理する
     * TODO: Snackbar の処理を分離したいのでコンポーネントにしているが、このコンポーネント自体は要素を持たないので、mixinのような形に変更できないですか？
     *
     * document: https://iamhosseindhv.com/notistack/
     */
    const [messages] = useAtom(messagesAtom);
    const resetMessage = useResetAtom(messagesAtom)

    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        if (messages.length > 0) {
            resetMessage();
            messages.forEach(a => {
                const option = {autoHideDuration: 6000}
                let message: string;
                if (typeof a === "string") {
                    message = a
                } else {
                    message = a.message
                    // @ts-ignore
                    option['variant'] = a.variant
                }
                console.log(message, option)
                enqueueSnackbar(message, option)
            })
        }
    }, [messages])

    return (<></>)
}

export default CommonSnackbar;
