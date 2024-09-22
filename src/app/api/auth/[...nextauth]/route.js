import NextAuth from "next-auth/next";
import { options } from "./option";

// you can create the option-object in () here or saprate file
// we make the saprate file  
const handler = NextAuth(options);

export { handler as GET, handler as POST }