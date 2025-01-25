import React, {useState} from "react";
import {Form, Button} from "react-bootstrap";


const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassowrd, setConfirmPassword] = useState("");
    const submitForm = (e) => {
        console.log("Form submitted");
    }


    return (
        <div className="container">
            <div className="form">
                <h1>Sign Up Page</h1>
                <form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" 
                        placeholder="Your username"
                        value={username}
                        name="username"
                        onChange={(e) => {setUsername(e.target.value)}}
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Your email"
                        value={email}
                        name="email"
                        onChange={(e) => {setEmail(e.target.value)}}
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Your password"
                        value={password}
                        name="password"
                        onChange={(e) => {setPassword(e.target.value)}}
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Your password"
                        value={confirmPassowrd}
                        name="confirmPassword"
                        onChange={(e) => {setConfirmPassword(e.target.value)}}
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Button as="sub" variant="primary" onClick={submitForm}>SignUp</Button>
                    </Form.Group>
                    




                </form>

            </div>
        </div>
    )
}
export default SignUpPage