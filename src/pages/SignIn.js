import React from 'react'
import firebase from 'firebase/app'
import {  Col, Container, Grid, Panel, Row , Button ,Icon, Alert } from 'rsuite'
import { auth, database } from '../misc/firebase'

// import Col from 'rsuite/lib/Carousel'


 const SignIn = () => {

    const signInWithProvider =async (provider) => {
         
      try {
          const { additionalUserInfo , user} = await auth.signInWithPopup(provider);

          if(additionalUserInfo.isNewUser){
              await database.ref(`/profiles/${user.uid}`).set({
                  name: user.displayName,
                  createAt: firebase.database.ServerValue.TIMESTAMP
              });
          }
          Alert.success('Signed In' , 4000);
      } catch (err) {
          Alert.error(err.message , 4000);
          
      }  
      
    }
     
    const onFacebookSignIn = () =>{
        signInWithProvider( new firebase.auth.FacebookAuthProvider() )
    };

    const onGoogleSignIn = () => {
        signInWithProvider( new firebase.auth.GoogleAuthProvider() )
    };


    return (
        <Container>
            <Grid className="mt-page">
             <Row>
                <Col xs={24}  md={12} mdOffset={6}>
                   
                     <Panel>
                         <div className="text-center">
                             <h1>Welcome to Chat</h1>
                             <p>Progressive chat platform</p>
                         </div>
                         <div className="mt-3">
                             <Button block color="blue" onClick={onFacebookSignIn}>
                                 <Icon icon="facebook" /> Continue with facebook
                             </Button>

                             <Button block color="green" onClick={onGoogleSignIn}>
                                 <Icon icon="google" /> Continue with google
                             </Button>
                         </div>
                     </Panel>
                     
                </Col>
             </Row>   
            </Grid>  
        
        </Container>
    )
}
export default SignIn