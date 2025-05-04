import React, { useState } from 'react'
import emailjs from '@emailjs/browser';

const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-]+.)+[a-zA-Z]{2,}))$/;

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceId = 'service_9hwd0o8';
    const templateId = 'template_xv6v2qm';
    const publicKey = 'zxwyBbIYcRF02c_PK';
    
    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: 'Web Wizard',
      message: message,
    };
    if (!name || !email || !message) {
      setHasErrors(true);
      return;
    }
    if (!emailRegex.test(email)) {
      setEmailError(true);
      setHasErrors(true);
      return;
    }
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent successfully!', response);
        setName('');
        setEmail('');
        setMessage('');
        setShowPopup(true);
        setEmailError(false); // Clear email error
        setHasErrors(false);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  }
  return (
    <div className='mt-34'>
      <form className="flex flex-col items-center text-sm" onSubmit={handleSubmit}>
    <p className="text-lg text-purple-600 font-medium pb-2">Contact Us</p>
    <h1 className="text-4xl font-semibold text-slate-700 pb-4">Get in touch with us</h1>
    <p className="text-sm text-gray-500 text-center pb-10">Ask Your Query !! <br/>We Will Help You</p>
    
    <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
        <div className="w-full">
            <label className="text-black/70" htmlFor="name">Your Name</label>
            <input className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-purple-300" type="text" required  value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="w-full">
            <label className="text-black/70" htmlFor="name">Your Email</label>
            <input className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-purple-300" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
    </div>
    {hasErrors && emailError && <p className="error">Invalid email format</p>}
        {hasErrors && !emailError && <p className="error">Email is required</p>}

    <div className="mt-6 w-[350px] md:w-[700px]">
        <label className="text-black/70" htmlFor="name">Message</label>
        <textarea className="w-full mt-2 p-2 h-40 border border-gray-500/30 rounded resize-none outline-none focus:border-purple-300" required value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
    </div>

    <button type="submit" className="mt-5 bg-purple-600 text-white h-12 w-56 px-4 rounded active:scale-95 transition">Send Message</button>
</form>
{showPopup && (
        <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white border border-gray-300 rounded-md p-4 text-center text-gray-800 text-base font-sans transition-opacity duration-500 ${showPopup ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <p>Your message has been sent!</p>
        <p>We will contact you within 24 hours.</p>
        <button
          onClick={() => setShowPopup(false)}
          className="mt-3 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm cursor-pointer active:scale-95 transition"
        >
          Close
        </button>
      </div>
      
      )}
    </div>
  )
}

export default Contact
