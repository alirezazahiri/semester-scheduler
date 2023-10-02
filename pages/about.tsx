import About from '@/components/About'
import { Grid } from '@mui/material'
import Head from 'next/head'
import React from 'react'

function AboutPage() {
  return (
    <>
      <Head>
        <title>درباره | دانشگاه صنعتی نوشیروانی بابل</title>
        <meta
          name="description"
          content="درباره برنامۀ پیش ثبت نام دانشگاه صنعتی نوشیروانی بابل"
        />
      </Head>
      <Grid
        container
        sx={{
          bgcolor: "background.default",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: "100vh",
        }}
      >
        <About />
      </Grid>
    </>
  )
}

export default AboutPage