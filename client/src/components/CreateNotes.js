import React from "react";
import { Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";

const CreateNotePage = () => {

    const { register, handleSubmit,reset, formState:{ errors } } = useForm();

    const createNote = (data) => {
        console.log(data);
    
        // Retrieve and parse the token from localStorage
        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
        if (token) {
            // Assuming the token is a JSON object with access_token and refresh_token fields
            const parsedToken = JSON.parse(token);
    
            // Extract the access_token
            const accessToken = parsedToken.access_token;
    
            // Log the access token (for debugging)
            console.log('Access Token:', accessToken);
    
            // Setup request options with the access_token
            const requestOptions = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`  // Use access token
                },
                body: JSON.stringify(data)
            };
    
            // Send the request to create the note
            fetch('/notes/notes', requestOptions)
                .then((res) => res.json())
                .then((data) => {
                    reset();  // Reset the form after success
                })
                .catch((err) => console.log(err));
        } else {
            console.log('Token not found in localStorage');
        }
    };
    

    return (
        <div className="container">
            <h1>Create A Note</h1>
            <form>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        {...register("title", { required: true, maxLength: 255 })}
                    />
                </Form.Group>
                {errors.title && <p style={{ color: 'red' }}><small>Title is required</small></p>}
                {errors.title?.type === 'maxLength' && (
                    <p style={{ color: 'red' }}>
                        <small>Title should be less than 25 characters</small>
                    </p>
                )}

                <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={10}
                        {...register("content", { required: true, maxLength: 1000 })}
                    />
                </Form.Group>
                {errors.content && <p style={{ color: 'red' }}><small>Content is required</small></p>}
                {errors.content?.type === 'maxLength' && (
                    <p style={{ color: 'red' }}>
                        <small>Content should be more than 1000 characters</small>
                    </p>
                )}

                <br />
                <Form.Group>
                    <Button
                        variant="primary"
                        onClick={handleSubmit(createNote)} // Calls the createNote function on form submission
                    >
                        Save
                    </Button>
                </Form.Group>
            </form>
        </div>
    );
};

export default CreateNotePage;
