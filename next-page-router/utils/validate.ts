import * as Yup from "yup";

export const RegisterSchema = Yup.object({
    account: Yup.string().trim().required('SĐT là bắt buộc'),
    username: Yup.string().trim().required('Tên là bắt buộc'),
    password: Yup.string().trim().required('Mật khẩu là bắt buộc'),
    confirmpassword: Yup.string()
        .trim()
        .required('Nhập lại mật khẩu là bắt buộc')
        .oneOf([Yup.ref('password')], 'Nhập lại mật khẩu không khớp')
})

export const LoginSchema = Yup.object({
    phone: Yup.string().trim().required('SĐT là bắt buộc').trim(),
    passWord: Yup.string().trim().required('Mật khẩu là bắt buộc')
})

export type Register = Yup.InferType<typeof RegisterSchema>

export type Login = Yup.InferType<typeof LoginSchema> 