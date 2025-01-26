import React from 'react'
import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";
import './CodeCompiler.css'

export const Question = () => {
    return (
        <>
            <div className='container my-3'>
                <div className='d-flex'>
                    <div className='question'>
                        <span className='body-text-bold'>Question: </span>
                        <span className='body-text-bold'>203</span>
                    </div>
                    <div className='next-prev'>
                        <CiCircleChevLeft className="left-icon" />
                        <button className='custom-button text-16'>Prev</button>
                        <button className='custom-button text-16'>Next</button>
                        <CiCircleChevRight className="left-icon"/>
                    </div>
                </div>

            </div>
            <div className='container'>

                <div className='question-description text-16'>
                    <p>
                        The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

                        P   A   H   N
                        A P L S I I G
                        Y   I   R
                        And then read line by line: "PAHNAPLSIIGYIR"

                        Write the code that will take a string and make this conversion given a number of rows:

                        string convert(string s, int numRows);
                    </p>
                </div>

            </div >

        </>
    )
}

export default Question