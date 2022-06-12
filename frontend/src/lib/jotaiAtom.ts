import {atom} from "jotai";
import {VariantType} from "notistack";
import {atomWithReset} from "jotai/utils";

export type SnackbarMessageInfo = {
    text: string,
    variant: VariantType,
}
export const messageAtom = atomWithReset<(string | SnackbarMessageInfo | null)>(null);
messageAtom.debugLabel = 'messages'
