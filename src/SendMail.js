import axios from "axios";
import React, { useState } from "react";
import { variables } from "./variables";
import {ThreeDots} from 'react-loader-spinner';
import './Helper.css';

const SendMail = (props) => {
  const [Subject, setSubject] = useState("");
  const [Body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendBtn, setSendBtn] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSendBtn(false);
    setLoading(true);

    axios
      .post(variables.MAIL_URL, {
        ToAddress: props.ToAddress,
        Subject: Subject,
        Body: Body
      })
      .then((res) => {
        setLoading(false);
        props.sendData(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
 
  return (
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content p-2">
        <div className="modal-header">
          <h5 className="modal-title">{props.modalTitle}</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label>To:</label>
              <input
                type="text"
                className="form-control mt-1"
                value={props.ToAddress}
                readOnly
              />
            </div>
            <div className="form-group mb-3">
              <label>Subject:</label>
              <input
                type="text"
                className="form-control mt-1"
                value={Subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Body</label>
              <textarea
                cols="5"
                className="form-control mt-1"
                value={Body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
            {
              sendBtn ? (
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              ) : 
                !loading ? <h5 className="loader"><i>E-mail sent successfully !</i></h5> : null
            }
            {
              loading ? <div className="loader"><ThreeDots height="30" width="80" color='#0066cc' ariaLabel='loading'/></div> : null
            }
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendMail;
