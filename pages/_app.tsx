import Layout from "@/components/layout";
import AllCoursesContextProvider from "@/context/AllCoursesContext";
import SelectedCollegeContextProvider from "@/context/SelectedCollegeContext";
import SelectedCoursesContextProvider from "@/context/SelectedCoursesContext";
import ThemeContextProvider from "@/context/ThemeContext";
import UserContextProvider from "@/context/UserContext";
import WeeklyPlanContextProvider from "@/context/WeeklyPlanContext";
import "@/styles/globals.css";
import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  console.log({
    DB_URI: process.env.NEXT_APP_DB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    API_BASE_URL: process.env.API_BASE_URL,
  });

  return (
    <SelectedCollegeContextProvider>
      <AllCoursesContextProvider>
        <SelectedCoursesContextProvider>
          <WeeklyPlanContextProvider>
            <ThemeContextProvider>
              <UserContextProvider sid={pageProps.sid}>
                <Layout>
                  <>
                    <CssBaseline />
                    <Component {...pageProps} />
                  </>
                </Layout>
              </UserContextProvider>
            </ThemeContextProvider>
          </WeeklyPlanContextProvider>
        </SelectedCoursesContextProvider>
      </AllCoursesContextProvider>
    </SelectedCollegeContextProvider>
  );
}
