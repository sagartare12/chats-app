import React, {useState , useRef} from 'react'
import AvatarEditor from 'react-avatar-editor'
import { Alert, Button, Modal } from 'rsuite';
import { useProfile } from '../../context/profileContext';
import { useModalState } from '../../misc/custom-hooks';
import { storage ,database } from '../../misc/firebase';

const fileInputTypes = '.jpeg, .jpf, .png';
const acceptedFileType = [ 'image/png', 'image/jpeg' , 'image/jpg'];
const isValidFile = (file) => acceptedFileType.includes(file.type);

const getBlob = (canvas) => {
    return new Promise ( ( resolve , reject) => {
        canvas.toBlob( ( blob) => {
            if(blob){
                resolve(blob);
            }else {
                reject( new Error('File process error'));
            }
        })
    })
}
export const AvatarUploadBtn = () => {


    const  { isOpen , open , close }= useModalState();
    
    const [isLoading , setIsLoading ]= useState(false);
    const [ img , setImg ] = useState(null);
    const avatarEditorRef = useRef();
    const {profile} = useProfile();
    const onUploadClick = async() => {
        
        const canvas = avatarEditorRef.current.getImageScaledToCanvas();
        setIsLoading(true);
        try {
            const blob = await getBlob(canvas);
            const avatarFileRef = storage.ref(`/profiles/${profile.uid}`).child('avatar');

            const uploadAvatarResult = await avatarFileRef.put(blob , {
                cacheControl: `public , max-age-${3600*24*3}`
            });

            const downloadUrl =  await uploadAvatarResult.ref.getDownloadURL();
            const userAvatarRef =  database.ref(`/profiles/${profile.uid}`).child('avatar');
              userAvatarRef.set(downloadUrl);
             setIsLoading(false);
             Alert.info('Avatar has been uploaded' ,4000);
        } catch (err) {
            setIsLoading(false);
            Alert.error(err.message,4000)
        }
    }
     const onFileInputChange =(ev)=> {
         const currFiles = ev.target.files;

         if(currFiles.length === 1) {
             const file = currFiles[0];

             if( isValidFile(file)){
                setImg(file);
                open();
             }else{
                 Alert.warning(`Wrong file type ${file.type}`, 4000);
             }
         }
     }
    return (
        <div className="mt-3 text-center">
            <div>
                <label htmlFor="avatar-upload" className="d-block curser-pointer padded">
                    Select new Avatar
                    <input type="file" className="d-none" id="avatar-upload" accept={fileInputTypes}
                    onChange={onFileInputChange} />
                </label>

                <Modal show={isOpen} onHide={close}>

                    <Modal.Header>
                        <Modal.Title>
                            Adjust and upload Avatar.
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex justify-content-center align-items-center h-100">
                        {img && <AvatarEditor
                        ref={avatarEditorRef}
                        image={img}
                        width={200}
                        height={200}
                        border={10}
                        borderRadius={100}
                        rotate={0}
                        />}
                        </div> 
                    </Modal.Body>
                    <Modal.Footer>
                        <Button block appearance="ghost" onClick={onUploadClick} disabled={isLoading}>
                            Upload new Avatar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}
