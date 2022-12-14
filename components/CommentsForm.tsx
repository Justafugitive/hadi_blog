import React, { useState, useRef, useEffect } from 'react'

import { submitComment } from '../services';

interface CommentsFormProps {
  slug: string;
}

const CommentsForm = ({ slug }:CommentsFormProps) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState<any>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef<HTMLTextAreaElement>(null);
  const nameEl = useRef<HTMLInputElement>(null);
  const emailEl = useRef<HTMLInputElement>(null);
  const storeDataEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameEl.current?.value != window.localStorage.getItem('name');
    emailEl.current?.value != window.localStorage.getItem('email');
  }, [])

  const handleCommentSubmission = () => {
    setError(false);

    const comment = commentEl.current?.value;
    const name = nameEl.current?.value;
    const email = emailEl.current?.value;
    const storeData = storeDataEl.current?.checked;


    if(!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = { name, email, comment, slug };
    if(storeData) {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email);
    } else {
      window.localStorage.removeItem('name');
      window.localStorage.removeItem('email');
    }

    submitComment(commentObj)
      .then(() => {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      })
    
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
        <h3 className="text-xl mb-8 font-semibold border-b pb-4">Tell us your thoughts</h3>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <textarea 
            ref={commentEl} 
            className="p-4 outline-none w-full rounded-lg focus:ring-gray-200 bg-gray-100 text-gray-700"
            placeholder="Comment"
            name="comment"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <input 
              type="text" ref={nameEl}
              className="p-2 px-4 outline-none w-full rounded-lg focus:ring-gray-200 bg-gray-100 text-gray-700"
              placeholder="Name"
              name="name"
          />
          <input 
              type="text" ref={emailEl}
              className="p-2 px-4 outline-none w-full rounded-lg focus:ring-gray-200 bg-gray-100 text-gray-700"
              placeholder="Email"
              name="email"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <input ref={storeDataEl} type="checkbox" id="storeData" name="storeData" value="true"/>
            <label htmlFor="storeData" className="text-gray-500 cursor-pointer ml-2">Save my e-mail for the next time I comment.</label>
          </div>
        </div>
        {error && <p className="text-xs text-red-500">All fields are required</p>}
        <div className="mt-8">
          <button 
              type="button" 
              onClick={handleCommentSubmission}
              className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
              >
                Post Comment
          </button>
          {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment submitted for review</span>}
        </div>
    </div>
  )
}

export default CommentsForm