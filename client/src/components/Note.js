import React from 'react';
import {Button,Card,Modal} from 'react-bootstrap';

const Note = ({ title, content,onClick}) => { 
    return (
        <Card className='note'>
            <Card.Body>
            <Card.Title>{title}</Card.Title>
            <p>{content}</p>
            <Button variont='primary' onClick={onClick}>Update</Button>
            </Card.Body>
        </Card>
            
        
    );
};

export default Note;
