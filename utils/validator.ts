import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  sid: string()
    .nonempty("شماره دانشجویی الزامی است")
    .min(8, "شماره دانشجویی باید حداقل دارای 8 رقم باشد")
    .max(12, "شماره دانشجویی باید حداکثر دارای 12 کاراکتر باشد")
    .regex(/[0-9]+/gm, "شماره دانشجویی تنها شامل ارقام است"),
  name: string()
    .nonempty("نام و نام خانوادگی الزامی است")
    .min(2, " نام و نام خانوادگی باید حداقل دارای 2 حرف باشد")
    .max(100, "نام و نام خانوادگی باید کوتاه تر از 100 کاراکتر باشد"),
  collegeId: string().nonempty("دانشکده الزامی است").default("00"),
  password1: string()
    .nonempty("گذرواژه الزامی است")
    .min(8, "گذرواژه باید حداقل دارای 8 کاراکتر باشد")
    .max(32, "گذرواژه حداکثر باید دارای 32 کاراکتر باشد"),
  password2: string().nonempty("لطفا گذرواژه خود را تایید کنید"),
}).refine((data) => data.password1 === data.password2, {
  path: ["password2"],
  message: "تایید گذرواژه نادرست است",
});

export type TCreateUserSchema = TypeOf<typeof createUserSchema>;

export const loginUserSchema = object({
  sid: string()
    .nonempty("شماره دانشجویی الزامی است")
    .min(8, "شماره دانشجویی باید حداقل دارای 8 رقم باشد")
    .max(12, "شماره دانشجویی باید حداکثر دارای 12 کاراکتر باشد")
    .regex(/[0-9]+/gm, "شماره دانشجویی تنها شامل ارقام است"),
  password: string()
    .nonempty("گذرواژه الزامی است")
    .min(8, "گذرواژه باید حداقل دارای 8 کاراکتر باشد")
    .max(32, "گذرواژه حداکثر باید دارای 32 کاراکتر باشد"),
})

export type TLoginUserSchema = TypeOf<typeof loginUserSchema>;

