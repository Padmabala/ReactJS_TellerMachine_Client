import React,{Component} from 'react';
import {NavLink, Redirect,withRouter} from 'react-router-dom';
import { postDetails } from "../../services/postDetails"
import routes from '../../routes/routes';

import { LOGIN_API } from '../../constants/serverUrls';

class  Login extends Component{
    state={
        custId:"",
        pin:"",
        validUser:false,
        message:""
    }

    componentDidMount(){
      console.log(this.props);
      if((this.props.location.state!==undefined) && (this.props.location.state!==null)){
          const {validUser,message}=this.props.location.state;
      this.setState({
          validUser,
          message
      })
      
      }

    }    

     onIdFieldChange=(event)=>{
        this.setState({
            custId:event.target.value
        })
      }
    onPinFieldChange=(event)=>{
        this.setState({
            pin:event.target.value
        })
      }
    validateUser=async(event)=>{
        const {custId,pin}=this.state;
        const requestBody={
          custId,
          pin
        }
        const resp=await postDetails(LOGIN_API,"POST",requestBody)
        if(resp.status===200){
          this.setState({
            validUser:true,
            message:""
          })
          this.props.location.state={}
          this.props.location.state["validUser"]=true
          //this.props.location.state.IsValidUser(true);
        }
        else{
          this.setState({
            validUser:false,
            message:"Incorrect Customer Id/PIN"
          })
          this.props.location.state={}
          this.props.location.state["validUser"]=false
          //this.props.location.state.IsValidUser(false,"Incorrect Customer Id/PIN");
        }   
      }
    
    render(){
        const {custId,pin,validUser,message}=this.state;
        const divStyle={
            position:'fixed',top:'20%',left: '30%',width:'30em',height:'18em','text-align':'center',padding:'70px',border: '1px solid'
        }
        return(
          <div>
          {    
            validUser
            ?
            <Redirect to={routes.home}/>
            :
          <div className="form-group" style={divStyle}>
                <label htmlFor={custId}>Customer Id</label>&nbsp;&nbsp;&nbsp;&nbsp;
                <input  type="text" id={custId} value={custId} required={true} onChange={this.onIdFieldChange} />
                
                <label htmlFor={pin}>PIN No.</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input  type="password" id={pin} value={pin} required={true} onChange={this.onPinFieldChange} />
                <br/><br/>
                <button onClick={this.validateUser} align='center'>Submit</button>
                <br/><br/>
                <div align="center">{message}</div>

                <NavLink to={{pathname:routes.welcome,state:{validUser:validUser}}}>Go to Home Page</NavLink>
                
            </div>
          }
          </div>
    )
        }
}

export default withRouter(Login);