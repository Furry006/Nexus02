import type {AppRouteHandler} from "#/openapi/index.js"
import type { SignUpRoute } from './routes.js'
import { HttpResponse, HttpStatus } from "#/utils/http/index.js"
import {signUp} from "./services.js"

export const signUpHandler: AppRouteHandler<SignUpRoute> = async (ctx) => { 
    const body = ctx.req.valid("json");

    const user = await signUp(body)

    return HttpResponse.success(
        ctx,
        HttpStatus.CREATED,
        "Account Created Successfully",
        user
    )
}


