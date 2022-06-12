import {atom} from "jotai";
import {VariantType} from "notistack";
import {atomWithReset} from "jotai/utils";

type SnackbarMessage = {
    message: string,
    variant: VariantType,
}
export const messagesAtom = atomWithReset<(string | SnackbarMessage)[]>([]);
messagesAtom.debugLabel = 'messages'

// snackbar メッセージ追加用
export const writeMessageAtom = atom(
    null,
    (get, set, update) => {
        const tmp = [...get(messagesAtom), update];
        // @ts-ignore
        set(messagesAtom, tmp);
    }
)



