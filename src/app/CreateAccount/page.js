"use client"
import axios from "axios";
import { useState } from "react";
import styles from './CreateAccount.module.css'; // Import CSS module
import { useRouter } from "next/navigation";

//state variables
// for input fields
// if user already exsist then get error state

export default function CreateAccount() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // send request to our api
        try {
            const response = await axios.post('/api/users', {
                // this input are filled in the state 
                name,
                email,
                password,
            });
            // send user to the home page
            router.push('/');

            // if api get error 
        } catch (error) {
            // if error.response is true then check staus code of it
            if (error.response && error.response.status === 400) {
                // Handle 400 Bad Request (email already exists)
                setError("Email already exist");
            } else {
                // Handle other errors
                console.log("Error creating user with account: ", error.response);
                setError("An error occurred");
            }
        }
    }

    // this is return the jsx file 
    return (
        <div className={styles.createAccountContainer}>
            <div className={styles.wrapper}>
                <h2 className={styles.heading}>Create New Account</h2>
                <hr className={styles.hrLine} />
                {/* ternary operator => condtion ? true :false */}
                <p className={error === "" ? styles.hide : styles.show}>{error}</p>
                {/* form submitted then call the function for fetch data */}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className={styles.Label}>Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className={styles.Input}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className={styles.Label}>Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={styles.Input}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className={styles.Label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles.Input}
                        />
                    </div>
                    <button type="submit" className={styles.btn}>Create User</button>

                </form>
            </div>
        </div>
    )
}
