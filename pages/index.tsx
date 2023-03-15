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

function Index({ sid }: { sid: string }) {
  const { loading } = useAllCourses();
  return (
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
