import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Button, Form } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
    let navigate = useNavigate()

    const [user,setUser] = useState({
        name: "",
        chatRoom: ""
    })
    const [error,setError] = useState(null)

    const {name, chatRoom} = user

    const handleChange = (e)=>{
        if (e.target.name === 'chatRoom') {
            setUser({name, chatRoom: e.target.value})
        }
        if (e.target.name === 'userName') {
            setUser({name: e.target.value, chatRoom}) 
        }
    } 
    const validation = ()=>{
        if(!user.name){
            setError("Please enter your name")
            return false
        }
        if(!user.chatRoom){
            setError("Please select a chatroom")
            return false
        }
        setError("")
        return true
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        const valid = validation()
        if(valid){
            navigate(`/chat/${user.chatRoom}`, {state: user})
        }
    }

  return (
    <>
        <Container fluid className='sign-in d-flex justify-content-center align-items-center'>
            <div className='sign-in-form text-center'>
                <img className='' src="./Image/logo.png" height="70px" width="70px" alt='Chat Box'/>
                <h1 className='text-white mb-5'>Chat<span className='sign-in-box'>Box</span></h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Control className='sign-in-inputs' type="text"        placeholder="Enter your name" name="userName" onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicSelect">
                        <Form.Select className='sign-in-inputs' name="chatRoom" onChange={handleChange}>
                            <option></option>
                            <option>Gaming</option>
                            <option>Coding</option>
                        </Form.Select>
                    </Form.Group>

                    {error ? <small className="text-danger ms-0">{error}</small> : ""}

                    <Button className='w-100' variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </Container>
    </>
  )
}
