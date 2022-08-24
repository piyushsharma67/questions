import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet, Button, Alert,TextInput} from 'react-native'
import Input from './component/Input'
import auth from '@react-native-firebase/auth'
import Loader from './component/Loader';


function LoginScreen(props){

    const keys={
        NAME:'name',
        PHONE:'phone',
        PASSWORD:"password"
    }

    const [states,setStates]=React.useState({
        [keys.NAME]:'',
        [keys.PHONE]:"",
        [keys.PASSWORD]:""
    })
    const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const [loading,setLoading]=useState(false)

  // Handle create account button press
  async function createAccount() {
    if(states[keys.NAME]===""){
        Alert.alert("Notification","Name cannot be left Empty")
        return
    }else if(states[keys.PHONE]===""){
        Alert.alert("Notification","phone cannot be left Empty")
        return
    }else if(/^\d+$/.test(states[keys.PHONE]===false)){
        Alert.alert("Notification","Enter a valid phone number")
        return
    }else if(states[keys.PASSWORD]===""){
        Alert.alert("Notification","password cannot be left Empty")
        return
    }
    else if(!(/([0-9].*[a-z])|([a-z].*[0-9])/.test(states[keys.PASSWORD]))){
        console.log("res",(/^[A-z0-9]+$/g.test(states[keys.PASSWORD])))
        Alert.alert("Notification","password should have one number and one alphabet")
        return
    }
    try {
        setLoading(true)
      await auth().createUserWithEmailAndPassword('piyush67.sharma@gmail.com', states[keys.PASSWORD]);
      setLoading(false)
      console.log('User account created & signed in!');
    } catch (error) {
        setLoading(false)
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error("err",error);
    }
  }

  // Handle the verify phone button press
  async function verifyPhoneNumber(phoneNumber) {
    const confirmation = await auth().verifyPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  // Handle confirm code button press
  async function confirmCode() {
    try {
      const credential = auth.PhoneAuthProvider.credential(confirm.verificationId, code);
      let userData = await auth().currentUser.linkWithCredential(credential);
      setUser(userData.user);
    } catch (error) {
      if (error.code == 'auth/invalid-verification-code') {
        console.log('Invalid code.');
      } else {
        console.log('Account linking error');
      }
    }
  }

    function valueChange(value,key){
       setStates({...states,[key]:value})
    }

    useEffect(()=>{
        if(user && confirm){
            props.navigation.navigate("displayScreen",{
                name:states[keys.NAME],
                phone:states[keys.PHONE],
                password:states[keys.PASSWORD]
            })
        }
    },[user,confirm])

    function ButtonComp(){
        if (!user) {
            return <Button title="Login" onPress={() => createAccount()} />;
          } else if (!user.phoneNumber) {
            if (!confirm) {
              return (
                <Button
                  title="Verify Phone Number"
                  onPress={() => verifyPhoneNumber('ENTER A VALID TESTING OR REAL PHONE NUMBER HERE')}
                />
              );
            }
            return (
              <>
                <TextInput value={code} onChangeText={text => setCode(text)} style={{borderWidth:2,width:100}}/>
                <Button title="Confirm Code" onPress={() => confirmCode()} />
              </>
            );
          } else {
            return (
              <Text>
                Welcome! {user.phoneNumber} linked with {user.email}
              </Text>
            );
          }
    }

    if(initializing) return <Loader/>
    else {
        return (
            <View style={style.container}>
                {loading && <Loader />}
                <View style={style.textContainer}>
                    <Text>SignUp page</Text>
                </View>
                <View style={style.inputMainContainer}>
                    <View style={style.inputContainer}>
                        <Input keyVal={keys.NAME} onPress={valueChange} value={states[keys.NAME]}/>
                    </View>
                    <View style={style.inputContainer}>
                        <Input keyVal={keys.PHONE} onPress={valueChange} value={states[keys.PHONE]} keyBoardType="numeric" maxLength={10}/>
                    </View>
                    <View style={style.inputContainer}>
                        <Input keyVal={keys.PASSWORD} onPress={valueChange} value={states[keys.PASSWORD]} secureEntry={true}/>
                    </View>
                </View>
                <View style={{width:'30%',alignSelf:'center',justifyContent:'center',alignItems:'center',flex:2}}>
                    <ButtonComp />
                </View>
            </View>
        )
    }

}

const style=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    inputContainer:{width:'100%',marginVertical:10,height:50},
    textContainer:{flex:2,justifyContent:'center',alignItems:'center'},
    inputMainContainer:{width:'90%',flex:10,justifyContent:'center',alignItems:'center'}
})

export default LoginScreen