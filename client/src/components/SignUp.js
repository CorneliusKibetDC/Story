import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignUpPage = () => {

    const { register, watch, handleSubmit, reset, formState: { errors } } = useForm();
    const [show, setShow]=useState(true);
    const [serverResponse, setServerResponse] = useState("")

    const submitForm = (data) => {


        if (data.password === data.confirmPassword) {
            const body = {
                username: data.username,
                email: data.email,
                password: data.password,


            }
            const requestOptions = {
                method: "POST",
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }

            fetch('/auth/signup', requestOptions)
                .then(res => res.json())
                .then(data=>{
                    setServerResponse(data.message)
                    console.log(serverResponse)

                    setShow(true)
                })
                .catch(err => console.error(err))

            reset();



        }
        else {
            alert("Password do not match")
        }


    }


    return (
        <div className="container">
            <div className="form">
               {show?
               <>
               <Alert variant="success" onClose={() => setShow(false)} dismissible>

<p>
    {serverResponse}
</p>
</Alert>
                <h1>Sign Up Page</h1>
                
                </>
                :
                <h1>Sign Up PAge</h1>
               }
            
                <form onSubmit={handleSubmit(submitForm)}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text"
                            placeholder="Your username"
                            {...register("username", { required: true, maxLength: 25 })}
                        />

                        {errors.username && <p style={{ color: "red" }}><small>Username is required</small></p>}
                        {errors.username?.type === "maxLength" && <p style={{ color: "red" }}><small>Username should not exceed 25 characters</small></p>}
                    </Form.Group>

                    <br></br>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"
                            placeholder="Your email"
                            {...register("email", { required: true, maxLength: 80 })}
                        />

                        {errors.email && <p style={{ color: "red" }}><small>Email is required</small></p>}

                        {errors.email?.type === "maxLength" && <p style={{ color: "red" }}><small>Email should not exceed 80 characters</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                            placeholder="Your password"
                            {...register("password", { required: true, minLength: 8 })}
                        />

                        {errors.password && <p style={{ color: "red" }}><small>Password is required</small></p>}

                        {errors.password?.type === "minLength" && <p style={{ color: "red" }}><small>Minimum length should be 8 characters</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password"
                            placeholder="Confirm your password"
                            {...register("confirmPassword", {
                                required: true,
                                minLength: 8,
                                validate: value => value === watch("password") || "Passwords do not match"
                            })}
                        />

                        {errors.confirmPassword && <p style={{ color: "red" }}><small>Confirm Password is required</small></p>}

                        {errors.confirmPassword?.type === "minLength" && <p style={{ color: "red" }}><small>Minimum length should be 8 characters</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Button type="submit" variant="primary" onClick={handleSubmit(submitForm)}>SignUp</Button>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <small>Already have an account?<Link to='/login'> Log In</Link></small>
                    </Form.Group>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
