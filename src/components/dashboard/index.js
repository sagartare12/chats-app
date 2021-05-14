import React from 'react'
import { Button, Drawer ,Divider, Alert } from 'rsuite'
import { useProfile } from '../../context/profileContext'
import { database } from '../../misc/firebase';
import { AvatarUploadBtn } from './AvatarUploadBtn';
import { EditableInput } from './EditableInput';
import { ProviderBlock } from './ProviderBlock';

 const Dashboard = ({ onSignOut }) => {

    const { profile } = useProfile();

    const onSave = async newData => {
        const userNickname = database.ref(`/profiles/${profile.uid}`).child('name');
        try {
            await userNickname.set(newData);
            Alert.success('Nickname has been updated' , 4000);
        } catch (err) {
            Alert.error(err.msg, 4000);
        }
    };
    return (
        <React.Fragment>
                    <Drawer.Header>
                        <Drawer.Title>
                            Dashboard
                        </Drawer.Title>
                    </Drawer.Header>
                <Drawer.Body>
                    <h3>Hey, {profile.name}</h3>
                    <ProviderBlock />
                    <Divider />
                    <EditableInput 
                    name="nickname"
                    initialValue={profile.name}
                    onSave={onSave}
                    label={<h6 className="mb-2">Nickname</h6>}
                    />
                    <AvatarUploadBtn />
                </Drawer.Body>

                <Drawer.Footer>
                    <Button block color="red" onClick={onSignOut}>
                        Sign Out
                    </Button>
                </Drawer.Footer>
        </React.Fragment>
    )
}
export default Dashboard