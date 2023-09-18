import { Box, Fab, CircularProgress } from "@mui/material";
import ScheduleTable from "@/components/ScheduleTable";
import {
  IRedirector,
  UserAuthState,
  autoRedirector,
} from "@/utils/autoRedirector";
import SaveFab from "@/components/SaveFab";
import Head from "next/head";
import PrintIcon from "@mui/icons-material/Print";
import useAllCourses from "@/hooks/useAllCourses";

function Index({ sid }: { sid: string }) {
  const { loading } = useAllCourses();
  return (
    <>
      <Head>
        <title>انتخاب دروس نیمسال | دانشگاه صنعتی نوشیروانی بابل</title>
        <meta
          name="description"
          content="در این صفحه میتوانید دروس مورد نظرتان برای گذراندن در ترم آتی انتخاب کرده و برنامه زمانی آنها را مشاهده کنید"
        />
      </Head>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          px: 4,
          pt: 8,
        }}
      >
        {loading ? (
          <Box
            sx={{
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <ScheduleTable />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "fit-content",
          position: "fixed",
          bottom: 16,
          left: 16,
          displayPrint: "none",
        }}
      >
        <SaveFab sid={sid} />
        <Fab
          color="secondary"
          aria-label="print"
          onClick={() => {
            window.print();
          }}
          sx={{ mr: 1 }}
        >
          <PrintIcon />
        </Fab>
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
