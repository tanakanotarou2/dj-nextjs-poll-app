import '../../styles/globals.css';
import type {AppProps} from 'next/app';


import {ThemeProvider} from '@mui/material/styles';
import {Hydrate, QueryClient, QueryClientProvider} from 'react-query'
import React, {useState} from "react";
import {useAtomsDebugValue} from "jotai/devtools";

import {Provider as JotaiProvider} from 'jotai'

import {SnackbarKey, SnackbarProvider} from 'notistack';
import {IconButton, styled} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {defaultTheme} from "./styles";

// react-query の設定
const queryClientOptions = {
    defaultOptions: {
        queries: {
            // 5 min
            staleTime: 5 * 60 * 1000,
            // ブラウザのコンポーネントにフォーカスを当てた時に自動でフェッチしない
            refetchOnWindowFocus: false,
        }
    }
}

const DebugAtoms = () => {
    useAtomsDebugValue()
    return null
}


function MyApp({Component, pageProps}: AppProps) {
    const [queryClient] = useState(() => new QueryClient(queryClientOptions))

    /* snackbar の設定 */
    // xボタンのアクション
    const notistackRef = React.createRef();
    const onClickDismiss = (key: SnackbarKey) => () => {
        // @ts-ignore
        notistackRef.current.closeSnackbar(key);

    }

    // xボタン色を白に
    const ColorIconButton = styled(IconButton)(({theme}) => ({
        color: "#FFF",
    }));
    const snackbarAction = (key: SnackbarKey) => (
        <ColorIconButton aria-label="close" onClick={onClickDismiss(key)}>
            <CloseIcon/>
        </ColorIconButton>
    )

    return (
        <QueryClientProvider client={queryClient}>
            <JotaiProvider>
                <DebugAtoms/>

                {/* https://react-query.tanstack.com/guides/ssr#using-nextjs */}
                <Hydrate state={pageProps.dehydratedState}> {/* よくわかっていない. react-query のサンプル似合ったので追加 */}

                    <ThemeProvider theme={defaultTheme}>
                        <SnackbarProvider
                            maxSnack={4}
                            // @ts-ignore
                            ref={notistackRef}
                            action={snackbarAction}
                        >
                            <Component {...pageProps} />
                        </SnackbarProvider>
                    </ThemeProvider>
                </Hydrate>
            </JotaiProvider>
        </QueryClientProvider>
    )
}

export default MyApp;
