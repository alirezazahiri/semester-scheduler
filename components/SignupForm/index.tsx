import { FormControl, Typography, SelectChangeEvent } from "@mui/material";
import React, { useContext, useState } from "react";
import FormInput from "@/components/common/FormInput";
import LoadingButtonElement from "@/components/common/LoadingButtonEl";
import Link from "next/link";
import { useRouter } from "next/router";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { setTokenCookie } from "@/utils/token.utils";
import { loginUser, signUpUser } from "@/services/student.service";
import { COLLEGE_ITEMS } from "@/constants/index.constants";
import { SelectedCoursesContext } from "@/context/SelectedCoursesContext";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    sid: { content: "", error: false },
    name: { content: "", error: false },
    collegeId: { content: "00", error: false },
    password1: { content: "", error: false },
    password2: { content: "", error: false },
  });
  const { setSelectedCourses } = useContext(SelectedCoursesContext);
  const router = useRouter();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof formValue],
        content: value,
      },
    }));
  };

  const selectChangeHandler = (e: SelectChangeEvent<string>) => {
    const { value, name } = e.target;
    console.log(name, value);

    setFormValue((prev) => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof formValue],
        content: value,
      },
    }));
  };

  const submitHandler: React.FormEventHandler<
    HTMLButtonElement | HTMLFormElement
  > = async (e) => {
    e.preventDefault();
    if (formValue.password1.content !== formValue.password2.content) {
      setLoading(false);
      setFormValue((prev) => ({
        ...prev,
        password1: { ...prev.password1, error: true },
        password2: { ...prev.password2, error: true },
      }));
      return;
    }

    setLoading(true);

    let result = await signUpUser({
      sid: formValue.sid,
      password: formValue.password1,
      collegeId: formValue.collegeId,
      name: formValue.name,
    });

    // login user after signup
    if (result.success) {
      result = await loginUser({
        sid: formValue.sid,
        password: formValue.password1,
      });

      if (result.success) {
        setSelectedCourses([]);
        setTokenCookie(result.token);
        router.replace("/");
      }
    }

    setLoading(false);
  };

  return (
    <FormControl
      sx={{ width: "50%", mx: "auto" }}
      component={"form"}
      onSubmit={submitHandler}
    >
      <Typography variant="h4" component="h4" color="primary" fontWeight={500}>
        ثبت نام
      </Typography>
      <FormInput
        label="شماره دانشجویی"
        name="sid"
        value={formValue.sid.content}
        error={formValue.sid.error}
        onChange={changeHandler}
        textAlign="left"
      />
      <FormInput
        label="نام و نام خانوادگی"
        name="name"
        value={formValue.name.content}
        error={formValue.name.error}
        onChange={changeHandler}
      />
      {/* <Select
        labelId="select-helper-label"
        id="select-helper"
        name="collegeId"
        value={formValue.collegeId.content}
        label="دانشکده"
        onChange={selectChangeHandler}
        sx={{ my: 1 }}
      >
        {[...COLLEGE_ITEMS].map((item) => (
          <MenuItem value={item.value} key={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select> */}
      <Select
        labelId="select-standard-label"
        id="select-standard"
        name="collegeId"
        value={formValue.collegeId.content.toString()}
        onChange={selectChangeHandler}
        label={"دانشکده"}
        sx={{
          textAlign: "right",
          my: 1,
        }}
      >
        {[...COLLEGE_ITEMS].map((item) => (
          <MenuItem key={item.name} value={item.value} dir="rtl">
            {item.name}
          </MenuItem>
        ))}
      </Select>
      <FormInput
        label="گذرواژه"
        name="password1"
        value={formValue.password1.content}
        error={formValue.password1.error}
        onChange={changeHandler}
        textAlign="left"
      />
      <FormInput
        label="تایید گذرواژه"
        name="password2"
        value={formValue.password2.content}
        error={formValue.password2.error}
        onChange={changeHandler}
        textAlign="left"
      />
      <LoadingButtonElement
        label="ثبت نام"
        loading={loading}
        type="submit"
        onSubmit={submitHandler}
      />
      <Typography
        component="div"
        variant="caption"
        textAlign="center"
        fontSize={12}
        mt={3}
      >
        حساب کاربری دارید ؟
        <Link
          href="/auth/login"
          style={{
            margin: "0 5px",
            textDecoration: "none",
          }}
        >
          <Typography
            component="p"
            variant="caption"
            textAlign="center"
            fontSize={12}
            color="primary"
            mt={1}
          >
            وارد شوید
          </Typography>
        </Link>
      </Typography>
    </FormControl>
  );
};

export default SignupForm;
