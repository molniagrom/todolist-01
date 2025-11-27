import { baseApi } from "@/app/baseApi";
import { CaptchaResponse } from "./captcha.types";

export const captchaApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCaptcha: build.query<CaptchaResponse, void>({
            query: () =>({
                url: "/security/get-captcha-url",
            })
        })
    })
})

export const { useGetCaptchaQuery } = captchaApi
