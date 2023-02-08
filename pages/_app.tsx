import Layout from "@/components/layout";
import AllCoursesContextProvider from "@/context/AllCoursesContext";
import SelectedCollegeContextProvider from "@/context/SelectedCollegeContext";
import SelectedCoursesContextProvider from "@/context/SelectedCoursesContext";
import ThemeContextProvider from "@/context/ThemeContext";
import WeeklyPlanContextProvider from "@/context/WeeklyPlanContext";
import "@/styles/globals.css";
import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SelectedCollegeContextProvider>
      <AllCoursesContextProvider>
        <SelectedCoursesContextProvider>
          <WeeklyPlanContextProvider>
            <ThemeContextProvider>
              <Layout>
                <>
                  <CssBaseline />
                  <Component {...pageProps} />
                </>
              </Layout>
            </ThemeContextProvider>
          </WeeklyPlanContextProvider>
        </SelectedCoursesContextProvider>
      </AllCoursesContextProvider>
    </SelectedCollegeContextProvider>
  );
}
