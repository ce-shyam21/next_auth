import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs"
import { signIn } from "next-auth/react";

export const options = {
    //in development mode create global prisma clent rather trhewn create it evary single time 
    adapter: PrismaAdapter(prisma),
    // here is providers
    // 1) Google
    // 2) Github
    // 3) Email 
    providers: [
        GoogleProvider({
            // you can called in anything you want GOOGLE_CLIENT_ID or anythong 
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        CredentialsProvider({
            type: "credentials",
            //which things you want for your login is credentials
            credentials: {
                email: {
                    label: "Email", type: "email", placeholder: "hello@example.com"
                },
                password: {
                    label: "Password", type: "Password"
                }
            },
            // authorize function 
            // insiade this we create our own logic when it submited
            // if ypu have not data base then create your own

            async authorize(credentials, req) {

                // get email and password formm the creadetial 
                const { email, password } = credentials;
                // it was the for the first demo 
                // we will do our fetch form the dataBase
                // const user = {
                //     id: "45",
                //     name: "John",
                //     email: "john@example.com",
                //     password: "12345"
                // }
                const user = await prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                });

                const hashedPassword = user.password;

                // Compare the plain-text password with the hashed password
                // password(Enterd by the user), hashedPassword(in our data base )
                const passwordMatch = await bcrypt.compare(password, hashedPassword);

                // if passowoed is true
                if (passwordMatch) {
                    return user;
                } else {
                    return null;
                }

                //email and paasword is same then retun user
                // if (email === user.email && password === user.password) {
                //     return user;
                // }
                // else {
                //     return null;
                // }

            }
        })
    ],
    // session object is create an entry of strategy
    session: {
        strategy: "jwt",
    },
    // add new object pages:{}
    
    pages:{
        // specifiy the url for your own page
        signIn:"/login",
    }
};