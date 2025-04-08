'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import miniLogo from 'media/assets/mini-logo.webp';
import miniAlert from 'media/assets/miniAlert.webp';
import { API } from '@/services/backendService';

interface VerifyUserPageProps {
    params: { token: string };
}
const VerifyUserPage = ({ params }: VerifyUserPageProps) => {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (params?.token) {
            // Remove "token%3D" from the start of the token
            const cleanedToken = params.token.replace(/^token%3D/, '');
            setToken(cleanedToken);
            console.log('Cleaned Token:', cleanedToken);

            // Call your API here for verification
            API.get(`verify-email/${cleanedToken}`).then((res) => {
                console.log(res, "API ResponseAPI ResponseAPI Response");
            });
        }
    }, [params]);

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
                <div className="bg-white border shadow-md rounded-lg p-8 -mt-52 relative w-full max-w-md text-center space-y-5">
                    {/* Top Icon */}
                    <div className='absolute -top-[60px] left-1/2 transform -translate-x-1/2'>
                        {token ? (
                            <div className='rounded-full shadow-md bg-gray-100 p-4'>
                                <Image
                                    src={miniLogo}
                                    width={50}
                                    height={50}
                                    alt='abc'
                                />
                            </div>
                        ) : (
                            <div className='rounded-full shadow-md bg-gray-100 p-4'>
                                <Image
                                    src={miniAlert}
                                    width={50}
                                    height={50}
                                    alt='abc'
                                />
                            </div>
                        )}
                    </div>

                    {/* Card Content */}
                    <h1 className="text-2xl font-normal text-primaryBlue">Verify User</h1>

                    {token ? (
                        <div className="space-y-3">
                            <p className="text-gray-600">Verifying your account, please wait...</p>
                            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent border-double rounded-full animate-spin mx-auto"></div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-red-500 text-sm">No token found. Please try again.</p>
                            <button
                                onClick={() => router.push('/register')} className="text-primaryBlue text-xs font-normal border-primaryBlue border-b-[1px] cursor-pointer shadow-sm transition"
                            >
                                Back to Register
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default VerifyUserPage;
