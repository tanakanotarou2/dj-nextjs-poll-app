import '../../styles/globals.css';
import type {AppProps} from 'next/app';


import {Hydrate, QueryClient, QueryClientProvider} from 'react-query'
import {useState} from "react";

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

function MyApp({Component, pageProps}: AppProps) {
    const [queryClient] = useState(() => new QueryClient(queryClientOptions))

    // https://react-query.tanstack.com/guides/ssr#using-nextjs
    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <Component {...pageProps} />
            </Hydrate>
        </QueryClientProvider>
    )
}

export default MyApp;
