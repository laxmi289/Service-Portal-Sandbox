import React from "react";
import axios from "axios";
import {variables} from './variables';
import Moment from 'react-moment';
//import moment from "moment";
import { Oval, ThreeDots } from "react-loader-spinner";
import SendMail from "./SendMail";

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],

      UserId: '',
      FirstName: '',
      LastName: '',
      Address: '',
      Phone: '',
      Email:'',
      DOB: '',
      Gender: '',

      modalTitle: '',

      isDelete: false,
      ToAddress: '',
      loading: true,
      createBtn: true,
      updateBtn: true
    }
  }

  usersList() {
    axios.get(variables.API_URL + 'users')
    .then(res => {
      setTimeout(() => {
        const list = res.data;
        this.setState({users: list, loading: false});
      },2000);
      
    })
  }

  addClick() {
    this.setState({
      modalTitle: 'Add new User',
      UserId: 0,
      FirstName: '',
      LastName: '',
      Gender: '',
      DOB: '',
      Address: '',
      Phone: '',
      Email:''
    })
  }

  createClick() {

    if((this.state.FirstName || this.state.LastName || this.state.Gender || this.state.Address || this.state.DOB || this.state.Phone || this.state.Email) === '')
    {
      alert('PLease enter all the values in form');
      return;
    }

    this.setState({createBtn: false, loading: true});

    axios.post(variables.API_URL + 'users', {
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      Gender: this.state.Gender,
      DOB:this.state.DOB,
      Address: this.state.Address,
      Phone: this.state.Phone,
      Email:this.state.Email
    })
    .then(res => {

    //displays the loader for 2s
    setTimeout(() => {
      this.setState({loading : false});
    }, 2000);

    this.usersList();
    })
    .catch(error => {
      console.log(error);
    })
  }

  editClick(data) {

    this.setState({
      modalTitle: 'Edit User',
      UserId: data.UserId,
      FirstName: data.FirstName,
      LastName: data.LastName,
      Gender: data.Gender,
      DOB: data.DOB,
      Address: data.Address,
      Phone: data.Phone,
      Email:data.Email
    })
  }

  updateClick() {
    console.log(this.state);

    this.setState({updateBtn: false, loading: true});

    axios.put(variables.API_URL + `users/${this.state.UserId}`, {
      UserId: this.state.UserId,
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      Address: this.state.Address,
      Phone: this.state.Phone,
      Email:this.state.Email
    })
    .then(res => {
      //displays the loader for 2s
    setTimeout(() => {
      this.setState({loading : false});
    }, 2000);

    this.usersList();
    })
    .catch(error => {
      console.log(error)
    })
  }

  deleteClick(data) {
    console.log(data);
    this.setState({isDelete: true});
    alert('Are you sure you want to delete this user ???');

    axios.delete(variables.API_URL + `users/${data.UserId}`, {
      UserId: this.state.UserId
    })
    .then(res => {
      setTimeout(() => {
        this.setState({isDelete: false});
      }, 2000);
      this.usersList();
    })
    .catch(error => {
      console.log(error);
    })
  }

  
  mailHandler(data) {
    this.setState({
      modalTitle: 'Send an Email',
      isNewMail: true,
      ToAddress: data.Email,
      Subject: '',
      Body: ''
    })
  }

  //function for closing email modal
  getData(val) {
    setTimeout(function(){
      document.getElementById("send_email").classList.remove("show", "d-block");
      document.querySelectorAll(".modal-backdrop")
          .forEach(el => el.classList.remove("modal-backdrop"));
    }, 1500);

  this.usersList();
  }

  componentDidMount() {
    this.usersList();
  }

  render () {
    const {UserId, FirstName, LastName,Gender,DOB, Address, Phone, Email, modalTitle, loading, createBtn, updateBtn, isDelete} = this.state;

    return(
      <div>
      <h2 className="mt-2"><u>Email-Sending Service</u></h2>
      <button
          type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => this.addClick()}
        >
          Add User
        </button>
      
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {
          (this.state.users.length > 0) && (!loading) ? 
          (
          this.state.users.map(data => (
            <tr key={data.UserId}>
              <td>{data.FirstName}</td>
              <td>{data.LastName}</td>
              <td>{data.Gender}</td>
              <td><Moment format='DD/MM/YYYY'>{data.DOB}</Moment></td>
              <td>{data.Address}</td>
              <td>{data.Phone}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-success btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => this.editClick(data)}
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => this.deleteClick(data)}
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash3-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                  </svg>
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm mr-1"
                  data-bs-toggle="modal"
                  data-bs-target="#send_email"
                  onClick={() => this.mailHandler(data)}
                >
                Get In Touch</button>
              </td>
            </tr>
          ))
          ) : null
        }
        </tbody>
      </table>
      {
        (this.state.loading) || (isDelete) ? 
        <div className="table-loader">
          <Oval
          height="80"
          width="80"
          color='#004d00'
          ariaLabel='loading'
        />
        </div>
         : null 
        }
        {
          (this.state.users.length === 0) && (!loading) ? <div  className="table-loader"><h6 id="no_data">No data found</h6></div> : null
        }
         
      <div
          className="modal fade"
          id="exampleModal"
          tab-index="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">First Name</span>
                  <input
                    type="text"
                    className="form-control"
                    value={FirstName}
                    onChange={(e) => this.setState({FirstName: e.target.value})}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Last Name</span>
                  <input
                    type="text"
                    className="form-control"
                    value={LastName}
                    onChange={(e) => this.setState({LastName: e.target.value})}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Gender</span>
                  <input
                    type="text"
                    className="form-control"
                    value={Gender}
                    onChange={(e) => this.setState({Gender: e.target.value})}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">DOB</span>
                  <input
                    type="date"
                    className="form-control"
                    value={DOB}
                    onChange={(e) => this.setState({DOB: e.target.value})}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Address</span>
                  <input
                    type="text"
                    className="form-control"
                    value={Address}
                    onChange={(e) => this.setState({Address: e.target.value})}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Phone</span>
                  <input
                    type="number"
                    className="form-control"
                    value={Phone}
                    onChange={(e) => this.setState({Phone: e.target.value})}
                    maxLength="10"
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Email</span>
                  <input
                    type="email"
                    className="form-control"
                    value={Email}
                    onChange={(e) => this.setState({Email: e.target.value})}
                    required
                  />
                </div>
                {UserId === 0 ? (
                  createBtn ? <button
                  type="button"
                  className="btn btn-primary float-start"
                  onClick={() => this.createClick()}
                >
                  Create
                </button> : !loading ? <h5 className="loader"><i>User added successfully !</i></h5> : null)
                :null } 

                {UserId !== 0 ? (
                  updateBtn ? 
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.updateClick()}
                  >
                    Update
                  </button> : !loading ? <h5 className="loader"><i>User updated successfully !</i></h5> : null)
                 : null}
                 {
                  loading ? <div className="loader"><ThreeDots height="40" width="80" color='#0066cc' ariaLabel='loading'/></div> : null
                }
              </div>
            </div>
          </div>
        </div>
            <div
            className="modal fade"
            id="send_email"
            tab-index="-1"
            aria-hidden="true"
          >
            <SendMail ToAddress={this.state.ToAddress} modalTitle={this.state.modalTitle} sendData={this.getData}/>
          </div>
        
    </div>
  );
  }
}

export default Users;