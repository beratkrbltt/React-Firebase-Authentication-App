import * as yup from 'yup';

export const RegisterFormSchemas = yup.object().shape({
    email: yup
        .string()
        .email("Geçerli bir email adresi giriniz.")
        .required("Email adresi zorunludur."),
    password: yup
        .string()
        .min(6, "Şifre en az 6 karakter olmalı.")
        .matches(/[A-Z]/, "Şifre en az bir büyük harf içermeli.")
        .matches(/[a-z]/, "Şifre en az bir küçük harf içermeli.")
        .matches(/[0-9]/, "Şifre en az bir rakam içermeli.")
        .matches(/[@$!%*?&.,]/, "Şifre en az bir özel karakter içermeli.")
        .required("Şifre alanı zorunludur."),
    term: yup
        .boolean()
        .oneOf([true], "Kullanıcı sözleşmesini kabul etmelisiniz.")
});
