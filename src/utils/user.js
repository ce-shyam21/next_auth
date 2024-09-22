import prisma from "@/lib/prisma";
import {v4 as uuidv4 } from 'uuid';

export async function createUserWithAccount({name, email, password}){
    try{
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password,
                accounts: {
                    create: {
                        type: 'credentials',
                        provider: 'email',
                        // this is for the generate the unique id every time 
                        // add id library form js
                        providerAccountId: uuidv4(),
                    }
                }
            },
            // adding the account table 
            include: {
                accounts: true,
            }
        })

    } catch (error){
        console.error('Error creating user with account: ', error);
        throw error;
    }
}

// check the base on the email that user exsit or not 
export async function getUserByEmail(email) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    } catch (error) {
        console.error('Error getting user by email: ', error);
        throw error;
    }
}