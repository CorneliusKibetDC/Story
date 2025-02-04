import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useAuth } from './auth';
import Note from './Note';
import {Modal, Form, Button} from 'react-bootstrap';
import { useForm } from "react-hook-form";




const LoggedinHome=()=>{
    const [notes,setNotes]=useState([]);
    const [show, setShow] = useState(false);
    const {register, handleSubmit,reset,setValue, formState:{ errors } }= useForm();
    const[noteId,setNoteId]=useState(0)

    useEffect(
        ()=>{

            fetch('https://backend-1-ogsa.onrender.com/notes/notes')
            .then((res) => res.json())
            .then(data => {
                setNotes(data)
                
            })
            .catch(err=>console.log(err))
        },[]
    )
    const getAllNotes=()=>{
        fetch('https://backend-1-ogsa.onrender.com/notes/notes')
            .then((res) => res.json())
            .then(data => {
                setNotes(data)
                
            })
            .catch(err=>console.log(err))
    }

    const closeModal=()=>{
      
        setShow(false)
    }
    const showModal=(id)=>{
        setNoteId(id)
        
        setShow(true)

        notes.map(
            (note)=>{
                if (note.id===id){
                    setValue('title',note.title)
                    setValue('content',note.content)

                }
            }
        )
    }
    const updateNote = (data) => {
        console.log(data);
    
        // Retrieve and parse the token from localStorage
        let token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
        if (token) {
            // Assuming the token is a JSON object with access_token and refresh_token fields
            const parsedToken = JSON.parse(token);
    
            // Extract the access_token
            const accessToken = parsedToken.access_token;
    
            // Log the access token (for debugging)
            console.log('Access Token:', accessToken);
    
            // Setup request options with the access_token
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`  // Use access token
                },
                body: JSON.stringify(data),
            };
    
            // Send the request to update the note
            fetch(`https://backend-1-ogsa.onrender.com/notes/note/${noteId}`, requestOptions)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    const reload=window.location.reload();
                    reload()
                })
                .catch((err) => console.log(err));
        } else {
            console.log('Token not found in localStorage');
        }
    };

    
    const deleteNote = (id) => {
        console.log('Deleting note with ID:', id);
    
        // Retrieve and parse the token from localStorage
        let token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
        if (token) {
            // Parse the token and extract the access_token
            const parsedToken = JSON.parse(token);
            const accessToken = parsedToken.access_token;
    
            // Log the access token (for debugging)
            console.log('Access Token:', accessToken);
    
            // Setup DELETE request options
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}` // Use the access token
                }
            };
    
            // Send the DELETE request
            fetch(`https://backend-1-ogsa.onrender.com/notes/note/${id}`, requestOptions)
                .then((res) => res.json()) // Parse the response JSON
                .then((data) => {
                    console.log('Deleted note data:', data); 
                    getAllNotes() // Reload the notes list
                
                })
                .catch((err) => console.log(err)); // Handle errors
        } else {
            console.log('Token not found in localStorage');
        }
    };
    


    return (
        <div className="notes container">
            <Modal
                show={show}
                size="lg"
                onHide={closeModal}
>
    <Modal.Header closeButton>
        <Modal.Title>
            Update Note
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
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
                        <small>Title should be less than 255 characters</small>
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
                        <small>Content should be less than 100 characters</small>
                    </p>
                )}

                <br />
                <Form.Group>
                    <Button
                        variant="primary"
                        onClick={handleSubmit(updateNote)} // Calls the createNote function on form submission
                    >
                        Save
                    </Button>
                </Form.Group>
            </form>
    </Modal.Body>
            </Modal>
            <h1>Lists of notes</h1>
            {
                notes.map(
                    (note,index)=>(
                        <Note 
                        title={note.title} 
                        key={index} 
                        content={note.content}  
                        onClick={()=>{showModal(note.id)}}
                        onDelete={()=>{deleteNote(note.id)}}
                        />
                    )
                )
            }
        </div>
    )
}
const LoggedOutHome=()=>{
    return (
        <div className="home container">
            <h1 className="heading">Welcome to notes</h1>
            <Link to='/signup' className="btn btn-primary btn-lg">Get started</Link>
        
        </div>
    )
}
const HomePage = () => {
    const [logged] = useAuth();
    
    return (
        <div>
            {logged ? <LoggedinHome /> : <LoggedOutHome />}
        </div>
    );
};

export default HomePage