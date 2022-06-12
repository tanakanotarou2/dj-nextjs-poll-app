import {NextPageWithLayout} from "next";
import DefaultLayout from "@/components/layouts/DefaultLayout";

const NewQuestion: NextPageWithLayout = () => {
    return <div>About</div>
}
NewQuestion.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

export default NewQuestion