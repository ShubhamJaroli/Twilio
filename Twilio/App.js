
import React, { Component } from 'react';
import {StyleSheet,View,Text,TextInput,TouchableOpacity,Animated} from 'react-native';

export default class App extends Component
{
  constructor()
  {
    super()
    this.state=
    {
      opacity:0,
      Name:'',
      Contact:'',
      token:'',
      Id:''
    }
  }
  save=()=>
  {
      var n = this.state.Name;
      var c = this.state.Contact;
      if(n==""||c=="")
        alert("All Field is Required")
      else if(isNaN(parseInt(c))||c<1e9)
        alert("Contact number is InValid")
      else
      {
        fetch('http://192.168.0.115:3000/twilioVerification',
        {
          method:'POST',
          headers:
          {
            'Accept':'application/json',
            'Content-type':'application/json'
          },
          body:JSON.stringify(
            {
              Contact:c
            }
          )
        }).then((response)=>response.json()).then((responsejson)=>
        {
          var ID = responsejson.Id;
          this.setState(
            {
              opacity:1,
              Id:ID
            }
          )
        }).catch((err)=>
        {
          alert('Error Occured')
          console.log(err);
        })
      }
  }
  verify=()=>
  {
    var ID = this.state.Id;
    var Token = this.state.token;
    if(Token=='')
      alert("Enter Token")
    else if(Token!=ID)
    {
      alert('Incorrect token')
      this.setState(
        {
          token:''
        }
      )
    }
    else
    {
      alert('Verify')
    }
  }
  render()
  {
    const AnimatedValue ={opacity:this.opacity}
    return(
      <View style={styles.container}>
        <Text style={styles.header}>Twilio Contact Verification</Text>
        <View style={styles.form}>
          <TextInput placeholder="Enter Name" style={styles.input} 
            defaultValue={this.state.Name} onChangeText={(n)=>this.setState({Name:n})}
          />
          <TextInput placeholder="Enter Contact number" keyboardType='numeric'
            maxLength={10} style={styles.input}
            defaultValue={this.state.Contact} onChangeText={(c)=>this.setState({Contact:c})}
           />
          <TouchableOpacity style={styles.button} onPress={this.save.bind(this)}>
            <Text style={styles.buttonText}>save</Text>
          </TouchableOpacity>
        </View>
        <TextInput placeholder="Enter varification code" style={[styles.input1,{opacity:this.state.opacity}]} 
            defaultValue={this.state.token} onChangeText={(t)=>this.setState({token:t})}
        />
        <TouchableOpacity style={[styles.button1,{opacity:this.state.opacity}]} onPress={this.verify.bind(this)}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create(
  {
    container:
    {
      flex:1,
      backgroundColor:'white'
    },
    header:
    {
        fontSize:30,
        marginTop:'10%',
        alignSelf:'center',
        fontWeight:'bold'
    },
    form:
    {
      marginTop:'20%',
      alignSelf:'center',
      width:'80%',
      height:'50%',
      justifyContent:'space-around'
    },
    input:
    {
      borderBottomColor:'black',
      alignSelf:'center',
      borderBottomWidth:1,
      height:'22%',
      width:'100%',
      fontSize:25
    },
    button:
    {
      backgroundColor:'#222f3e',
      width:'60%',
      height:'15%',
      alignSelf:'center',
      justifyContent:'center',
      alignItems:'center'
    },
    buttonText:
    {
      fontSize:20,
      color:'snow'
    },
    input1:
    {
      borderBottomColor:'black',
      alignSelf:'center',
      borderBottomWidth:1,
      height:'10%',
      width:'80%',
      fontSize:20
    },
    button1:
    {
      backgroundColor:'#222f3e',
      width:'30%',
      marginTop:'2%',
      height:'5%',
      alignSelf:'center',
      justifyContent:'center',
      alignItems:'center'
    },
  }
)