import { FreshContext, Handlers, PageProps, RouteConfig } from "$fresh/server.ts";
import { User } from "../types.ts";
import jwt from "jsonwebtoken";
import { setCookie } from "$std/http/cookie.ts";
import Login from "../components/Login.tsx";

export const config: RouteConfig = {
  skipInheritedLayouts: true, // Skip already inherited layouts
};

type Data = {
    message: string
}

export const handler:Handlers<Data> = {
    POST: async(req:Request, ctx:FreshContext<unknown, Data>) => {
        const form = await req.formData();

        const email = form.get("email");
        const password = form.get("password");

        const API_URL = Deno.env.get("API_URL");
        const JWT_SECRET = Deno.env.get("JWT_SECRET");

        if(!API_URL || !JWT_SECRET){
            throw new Error("Error al obtener las variables de entorno");
        }

        const response = await fetch(`${API_URL}/checkuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })

        if(response.status === 404){
            return ctx.render({message: "Incorrect credentials or user does not exist"})
        }

        if(response.status === 200){
            const data:Omit<User, "password"> = await response.json();

            const token = jwt.sign({
                email: data.email,
                id: data.id,
                name: data.name
            }, JWT_SECRET, {
                expiresIn: "24h"
            })

            const url = new URL(req.url);

            const headers = new Headers();

            headers.set("location", "/videos");

            setCookie(headers, {
                name: "auth",
                value: token,
                sameSite: "Lax",
                domain: url.hostname,
                path: "/",
                secure: true
            })

            return new Response(null, {
                status: 303,
                headers
            })
        }else{
            return ctx.render({message: "Error no controlado"})
        }
    }
}

const Page = (props:PageProps<Data>) => {
    return(
        <Login message={props.data?.message}/>
    )
}

export default Page;