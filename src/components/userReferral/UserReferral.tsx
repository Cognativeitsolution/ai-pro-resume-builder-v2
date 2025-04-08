import React, { useState, useEffect } from 'react';
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { RxCross1 } from 'react-icons/rx';
// import { ApiService } from '../services/ApiService';
// import { useAuth } from '../services/Auth';

type Child = {
    name: string;
    email: string;
    status: number;
    referral_link: string;
}

// Static user data
const mockUser = {
    id: '1',
    token: 'mockToken',
};

// Static referral data
const mockChilds = [
    { name: 'John Doe', email: 'johndoe@example.com', status: 1, referral_link: 'https://referral-link.com/johndoe' },
    { name: 'Jane Smith', email: 'janesmith@example.com', status: 0, referral_link: 'https://referral-link.com/janesmith' },
    { name: 'Alice Johnson', email: 'alice@example.com', status: 1, referral_link: 'https://referral-link.com/alicejohnson' },
    { name: 'Bob Brown', email: 'bob@example.com', status: 1, referral_link: 'https://referral-link.com/bobbrown' },
    { name: 'Charlie White', email: 'charlie@example.com', status: 0, referral_link: 'https://referral-link.com/charliewhite' },
    { name: 'David Green', email: 'david@example.com', status: 1, referral_link: 'https://referral-link.com/davidgreen' },
    { name: 'Eva Black', email: 'eva@example.com', status: 1, referral_link: 'https://referral-link.com/evablack' },
    { name: 'Frank Blue', email: 'frank@example.com', status: 0, referral_link: 'https://referral-link.com/frankblue' },
];

export default function UserReferral() {
    const [modelbox, setModelbox] = useState<boolean>(false);
    // const { user } = useAuth();
    const [childs, setChilds] = useState<Child[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [pagee_offset, set_pagee_offset] = useState<number>(0);
    const [pagee_limit] = useState<number>(8);
    const [pagee_total, set_pagee_total] = useState<number[]>([]);
    const [cp, set_cp] = useState<number>(1);

    // useEffect(() => {
    //     if (user && user.token) {
    //         loadData();
    //     }
    // }, [user]);

    // const loadData = async () => {
    //     try {
    //         const response = await ApiService.getUserRefferalById(user?.token, user.id);
    //         const referralData: Child[] = response?.data?.data[0]?.childs;
    //         setChilds(referralData);

    //         const totalPages = Math.ceil(referralData.length / pagee_limit);
    //         set_pagee_total(Array.from({ length: totalPages }, (_, index) => index + 1));
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    useEffect(() => {
        if (mockUser.token) {
            // Simulate data load and set dynamic children
            const filteredChilds = mockChilds; // In real cases, it could be filtered based on user or other conditions
            setChilds(filteredChilds);

            const totalPages = Math.ceil(filteredChilds.length / pagee_limit);
            set_pagee_total(Array.from({ length: totalPages }, (_, index) => index + 1));
        }
    }, []);

    const changePage = (p: number) => {
        set_cp(p);
        set_pagee_offset((p - 1) * pagee_limit);
    };

    const closeModal = () => setModelbox(false);

    return (
        <>
            <div className="flex justify-between items-center mt-8">
                <p className="font-Lexend text-md text-[#A7A7A7]">User Referral</p>
                <div className="h-8 w-8 text-center rounded-full bg-primaryBlue/25 text-[#343434] flex items-center justify-center border">
                    <p>{childs.length}</p>
                </div>
            </div>

            {childs.length === 0 ? (
                <div className="flex justify-center items-center w-full mt-2">
                    <p className="font-Lexend text-sm text-[#343434]">No records found</p>
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center w-full mt-2">
                        <span className="font-Lexend text-sm font-bold text-[#343434]">Email</span>
                        <span className="pl-4 font-Lexend text-sm font-bold text-[#343434]">Status</span>
                    </div>

                    {childs.slice(0, 5).map((child, index) => (
                        <div className="flex justify-between items-center w-full mt-2" key={index}>
                            <p className="font-Lexend text-sm text-[#343434] max-w-[240px] truncate">{child.email}</p>
                            <p className="pl-4 font-Lexend text-sm text-[#343434]">
                                {child.status === 1 ? "active" : "inactive"}
                            </p>
                        </div>
                    ))}

                    {childs.length > 5 && (
                        <div className="flex mt-4 justify-center">
                            <button
                                onClick={() => setModelbox(true)}
                                className="bg-[#1877F2] hover:bg-[#343434] font-Lexend text-sm text-white rounded-full px-4 py-1"
                            >
                                View All
                            </button>
                        </div>
                    )}
                </>
            )}

            {modelbox && (
                <div
                    className="bg-[rgba(0,0,0,0.6)] backdrop-blur-sm flex justify-center items-center fixed top-0 left-0 w-full h-full z-[9999]"
                >
                    <div className="bg-white w-[95%] lg:w-[70%] 2xl:w-[50%] font-Lexend flex flex-col rounded-2xl">
                        <div className="flex w-full border-b px-8 py-5 justify-between">
                            <p className="text-xl text-primary-blue font-bold">User Referral</p>
                            <RxCross1
                                className="text-red-500 hover:text-primary-blue cursor-pointer"
                                size={30}
                                onClick={closeModal}
                            />
                        </div>

                        <div className="bg-[#f4f2f3] py-8 px-4 w-full">
                            <div className="overflow-x-auto">
                                <table
                                    className="table-auto w-full text-center text-[#959492] text-md"
                                    cellPadding={15}
                                >
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Referral Name</th>
                                            <th>Email</th>
                                            <th>Referral Link</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white rounded-xl">
                                        {childs
                                            .filter((child) =>
                                                child.name.toLowerCase().includes(searchTerm.toLowerCase())
                                            )
                                            .slice(pagee_offset, pagee_offset + pagee_limit)
                                            .map((child, index) => (
                                                <tr key={index}>
                                                    <td className="w-[10%]">{pagee_offset + index + 1}</td>
                                                    <td>{child.name}</td>
                                                    <td>{child.email}</td>
                                                    <td>{child.referral_link}</td>
                                                    <td>{child.status === 1 ? "active" : "inactive"}</td>
                                                </tr>
                                            ))}
                                        {childs.filter((child) =>
                                            child.name.toLowerCase().includes(searchTerm.toLowerCase())
                                        ).length === 0 && (
                                                <tr>
                                                    <td colSpan={5}>No data found to show</td>
                                                </tr>
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="w-full flex justify-end items-center text-[#0072b1] text-2xl p-4">
                            {cp > 1 && (
                                <BiLeftArrowAlt
                                    size={26}
                                    className="hover:scale-125"
                                    onClick={() => changePage(cp - 1)}
                                />
                            )}

                            {pagee_total.map((pageNum) => (
                                <div
                                    key={pageNum}
                                    className={`mx-2 hover:text-[#0072b1] hover:scale-125 ${cp === pageNum ? "text-[#0072b1]" : "text-slate-400"}`}
                                    onClick={() => changePage(pageNum)}
                                >
                                    {pageNum}
                                </div>
                            ))}

                            {cp < pagee_total.length && (
                                <BiRightArrowAlt
                                    size={26}
                                    className="hover:scale-125"
                                    onClick={() => changePage(cp + 1)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
