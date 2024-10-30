import { cookies } from "next/headers.js"
import jwt from "jsonwebtoken"

export  async function getUserFromCookie() {
    const theCookie =  (await cookies()).get("ourhaikuapp")?.value
    if (theCookie) {
        try {
            
            const decoded = jwt.verify(theCookie,process.env.JWTSECRET)
            return decoded
        } catch (error) {
           return null
        }
    }
}