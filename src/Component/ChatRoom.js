import React, { useEffect, useRef, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Row, Col, Image } from "react-bootstrap"
import { RiSendPlaneFill } from "react-icons/ri"
import { useLocation } from 'react-router-dom'
import Moment from "react-moment"
import { io } from "socket.io-client"

export default function ChatRoom() {
    let location = useLocation()
    let msgBox = useRef()
    
    const [scoket, setScoket] = useState("")
    const [user,setUser] = useState({})
    const [messages, setMessages] = useState("")
    const [allMessages, setAllMessages] = useState([])
    
    useEffect(()=>{
        const socket = io(process.env.REACT_APP_SERVER_URL, {
            transports: ['websockets', 'polling']
        })
        setScoket(socket)
        
        socket.on("connect", () => {
            console.log("Conected")
            socket.emit("chatRoom", location.state.chatRoom)
        })
    },[location.state.chatRoom]) 
    
    useEffect(()=>{
        setUser(location.state)
    },[location])

    useEffect(()=>{
        if(scoket){
            scoket.on("getLatestMessage", (newMessages)=>{
                setAllMessages([...allMessages, newMessages])
                msgBox.current.scrollIntoView({behavior: "smooth"})
            })
        }
    },[scoket, allMessages])
    
    const handleEnter = (e)=> e.keyCode === 13 ? handleClick() : ""

    const handleChange = (e)=>{
        setMessages(e.target.value)
    }
    
    const handleClick = (e)=>{
        const newMessages = {name: user.name, time: new Date(), msg: messages}
        scoket.emit("newMessages", {newMessages, chatRoom: location.state.chatRoom})
        setMessages("")
    }

  return (
    <>
        <Container fluid className='sign-in d-flex justify-content-center align-items-center'>
            <div className='chat-box'>
                <Row className='blurry-box mb-2'>
                    <h1 className='text-white text-center'>{user.chatRoom} Chat Room</h1>
                </Row>
                <Row className=''>
                    <Col className='blurry-box p-0 text-center' lg={1} md={1} sm={1} xs={1}>
                        {/* <div className='position-realtive p-0 mt-5'>
                            <Image src="https://placeimg.com/171/180/any" height="40px" width="40px" roundedCircle />
                            <span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                                <span class="visually-hidden">New alerts</span>
                            </span>
                        </div>*/}
                        <div className="position-relative mt-2">
                            <Image src="https://www.befunky.com/images/prismic/1f427434-7ca0-46b2-b5d1-7d31843859b6_funky-focus-red-flower-field-after.jpeg?auto=avif,webp&format=jpg&width=863" height="40px" width="40px" roundedCircle />

                            <span style={{padding: "6px", start: "50px"}} className="position-absolute top-100 translate-middle bg-success border border-light rounded-circle">
                                <span className="visually-hidden">New alerts</span>
                            </span>
                        </div>
                    </Col>
                    <Col className='blurry-box p-2' lg={11} md={11} sm={11} xs={11}>
                        <div className='text-box'>
                            {
                                allMessages.map((data)=>{
                                    return user.name === data.name 
                                    ?
                                    <Row key={data.time} className='justify-content-end'>
                                        <div className='d-flex flex-column flex-column align-items-end m-2'>
                                            <div style={{backgroundColor: "purple", border: "none", borderRadius: "15px"}} className="shadow p-2 w-auto text-white">{data.msg}</div>
                                            <small className='opacity-50'><Moment fromNow>{data.time}</Moment></small>
                                        </div>
                                    </Row>
                                    :
                                    <Row key={data.time}
                                    className='justify-content-start'>
                                        <div className='d-flex flex-column flex-column align-items-start m-2'>
                                            <div style={{backgroundColor: "#72C8BF", border: "none", borderRadius: "15px"}} className="shadow p-2 w-auto text-white">{data.msg}</div>
                                            <small className='opacity-50'><Moment fromNow>{data.time}</Moment></small>
                                        </div>
                                    </Row>
                                })
                            }
                            <div ref={msgBox}></div>     
                        </div>
                        <div className="input-group">
                            <input type="text" className="text-send form-control" aria-describedby="button-addon2" value={messages} onChange={handleChange} onKeyDown={handleEnter}/>
                            <button className='button-send fs-4 p-0'  type="button" id="button-addon2" onClick={handleClick}>
                                <RiSendPlaneFill/>
                            </button>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    </>
  )
}
