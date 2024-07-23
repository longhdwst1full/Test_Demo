import * as Yup from "yup";
 
export const LoginSchema = Yup.object({
    phone: Yup.string().trim().required('SĐT là bắt buộc'),
    passWord: Yup.string().trim().required('Mật khẩu là bắt buộc')
})
export const RegiseterSchema = Yup.object({
    phone: Yup.string().required('SĐT là bắt buộc').trim(),
    nickname: Yup.string().trim().required('Nick Name is required'),
    passWord: Yup.string().trim().required('Mật khẩu là bắt buộc'),
    confirmpassword: Yup.string()
        .trim()
        .required('Nhập lại mật khẩu là bắt buộc')
        .oneOf([Yup.ref('passWord')], 'Nhập lại mật khẩu không khớp')
})

export type Register = Yup.InferType<typeof RegiseterSchema>

export type Login = Yup.InferType<typeof LoginSchema> 