import React from 'react'
import { Avatar } from 'rsuite'
import { getNameInitial } from '../misc/Helper'

export const ProfileAvatar = ({ name , ...avatarProps}) => {
    return (
        <Avatar circle { ...avatarProps}>
            {getNameInitial(name)}
        </Avatar>
    )
}
