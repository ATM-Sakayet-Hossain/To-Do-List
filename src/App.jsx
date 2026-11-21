import React from 'react'
import Form from './home/Form'
import { database } from '../dbConfig.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <>
    <Form />
    </>
  )
}

export default App