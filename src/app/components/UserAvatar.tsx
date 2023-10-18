import stringAvatar from '@/services/avatarFormatter';
import Image from 'next/image';
import { IUser } from '@/helpers/interfaces';

interface IProps {
    image?: IUser['image'] | null;
    name: IUser['name'];
    size: number;
}

const UserAvatar = ({ image, name, size }: IProps) => {
    if (!name) {
        return '';
    }
    return (
        <>
            {image ? (
                <Image
                    src={image}
                    alt="Avatar"
                    width={size}
                    height={size}
                    style={{ borderRadius: '50%' }}
                />
            ) : (
                <div className='flex items-center justify-center w-24 h-24 rounded-full bg-purple text-gray-50 border border-gray-50 text-4xl'>{stringAvatar(name)}</div>
            )}
        </>
    );
}

export default UserAvatar;