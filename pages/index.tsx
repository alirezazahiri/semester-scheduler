import SelectCourses from "@/components/SelectCourses";
import { Box } from "@mui/material";
import ScheduleTable from "@/components/ScheduleTable";
import {
  IRedirector,
  UserAuthState,
  autoRedirector,
} from "@/utils/autoRedirector";
import useAllCourses from "hooks/useAllCourses";
import SaveFab from "@/components/SaveFab";
import Head from "next/head";

function Index({ sid }: { sid: string }) {
  const { loading } = useAllCourses();
  return (
    
    <>
    <Head>
      <title>انتخاب دروس نیمسال | دانشگاه صنعتی نوشیروانی بابل</title>
      <meta name='description' content='در این صفحه میتوانید دروس مورد نظرتان برای گذراندن در ترم آتی انتخاب کرده و برنامه زمانی آنها را مشاهده کنید' />
    </Head>
    <Box
      sx={{
        bgcolor: "background.default",
        display: "flex",
      }}
    >
      <Box sx={{}}>
        <SelectCourses loading={loading} />
      </Box>
      <Box
        sx={{
          ml: 30,
          mr: 1,
          minHeight: "100vh",
          overflow: "auto",
        }}
      >
        <ScheduleTable mt={9} />
      </Box>
      <SaveFab sid={sid} />
    </Box>
    </>
  );
}

export const getServerSideProps = ({ req, res }: IRedirector) =>
  autoRedirector({
    req,
    res,
    to: "/auth/login",
    stayCondition: UserAuthState.AUTHORIZED,
  });

export default Index;
