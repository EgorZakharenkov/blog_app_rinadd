import {body} from "express-validator";

export const registerValidator = [
    body('email','Неверный Email').isEmail(),
    body('password','Длина пароля должна быть не менее 5 символов').isLength({min:5}),
    body('fullName','Укажите имя').isLength({min:2}),
    body('avatarURL','Должна быть ссылка').optional().isURL(),
]
export const loginValidator = [
    body('email','Неверный Email').isEmail(),
    body('password','Длина пароля должна быть не менее 5 символов').isLength({min:5}),
]
export const postCreateValidation = [
    body('name','Название должно быть более 1 символов').isLength({min:1}).isString(),
    body('description','Не менее 5 символов').isLength({min:5}).isString(),
    body('animeURL','Должна быть ссылка').optional().isString(),
]