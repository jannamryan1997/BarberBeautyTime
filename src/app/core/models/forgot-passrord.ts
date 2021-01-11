export interface IForgotPassword{
    email:string;
}

export interface IResetPassword{
    otp:string;
    new_password:string;
    confirm_new_password:string;
}