import { useState } from "react";

export default function ContactSection() {
    const [feedbackMessage, setFeedbackMessage] = useState()
    const handleSubmit = setFeedbackMessage()

    return(

    
    <form action="">    
    <input type="text" placeholder="your name here" />
    <input type="text" placeholder="your email ID" />
    <textarea id="textfeedback" rows={4} cols={3} placeholder="your message here"  />

    <button onClick={handleSubmit}>SUBMIT</button>

    </form>

    )

}   