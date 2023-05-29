"use strict"

const socket = io();

const nickname = document.querySelector("#nickname")
const chatList = document.querySelector(".chatting-list")
const chatInput = document.querySelector(".chatting-input")
const sendButon = document.querySelector(".send-button")

sendButon.addEventListener("click",()=>{
    const param = {
        name : nickname.value,
        msg : chatInput.value
    }
    socket.emit("chatting",param)
})

socket.on("chatting",(data)=>{
    const li = document.createElement("li")
    li.innerText = `${data.name}님이 - ${data.msg}`;
    chatList.appendChild(li)
})
