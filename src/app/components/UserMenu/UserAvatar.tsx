import stringAvatar from '@/services/avatarFormatter';
import Image from 'next/image';

interface IProps {
    image?: string | null;
    name: string;
    size: number;
}

const UserAvatar = ({ image, name, size }: IProps) => {
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
                <div className='w-10 h-10 rounded-full bg-slate-400'>{stringAvatar(name)}</div>
                // <Avatar
                //     {...stringAvatar(`${name}`)}
                //     sx={{
                //         width: size,
                //         height: size,
                //         fontSize: 25,
                //         lineHeight: '25px',
                //         letterSpacing: '0.05em',
                //         backgroundColor: 'transparent',
                //         color: '#fff',
                //         border: '1px solid #fff',
                //     }}
                // />
            )}
        </>
    );
}

export default UserAvatar;