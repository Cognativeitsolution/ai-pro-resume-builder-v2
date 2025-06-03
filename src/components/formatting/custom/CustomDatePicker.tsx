"use client"
import { RootState } from '@/redux/store';
import React, { useState, useRef, useEffect } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

type DateType = {
    year: number | null;
    month: number | null;
};

type Props = {
    onChange: (dates: {
        startDate: string | null;
        endDate: string | 'Present' | null;
    }) => void;
    dateAlign?: any;
};

const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const CustomDatePicker: React.FC<Props> = ({ onChange, dateAlign }) => {
    const [showPicker, setShowPicker] = useState(false);
    const [activeTab, setActiveTab] = useState<'from' | 'to'>('from');
    const [fromDate, setFromDate] = useState<DateType>({ year: null, month: null });
    const [toDate, setToDate] = useState<DateType>({ year: null, month: null });
    const [isPresent, setIsPresent] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const { showIcons } = useSelector(
        (state: RootState) => state.addSection
    );
    // Generate a list of years from 2000 to current year
    const allYears = Array.from({ length: new Date().getFullYear() - 2000 + 1 }, (_, i) => 2000 + i);
    const [yearPage, setYearPage] = useState(0);
    const yearsPerPage = 11;
    const pagedYears = allYears.slice(yearPage * yearsPerPage, (yearPage + 1) * yearsPerPage);

    // Formats a DateType object to a value string "YYYY-MM"
    const formatValue = (date: DateType | null) => {
        if (!date || date.year === null || date.month === null) return '';
        return `${date.year}-${String(date.month + 1).padStart(2, '0')}`;
    };

    // Formats a DateType object to display string "MM/YYYY"
    const formatDisplay = (date: DateType | null) => {
        if (!date || date.year === null || date.month === null) return '';
        return `${String(date.month + 1).padStart(2, '0')}/${date.year}`;
    };

    // Handles selection of a year and month for either "from" or "to" date
    const handleSelect = (type: 'from' | 'to', year: number, month: number) => {
        if (type === 'from') {
            const newFrom = { year, month };
            setFromDate(newFrom);
            setActiveTab('to');
        } else {
            const newTo = { year, month };
            setToDate(newTo);
            const startDate = formatValue(fromDate);
            const endDate = isPresent ? 'Present' : formatValue(newTo);
            onChange({ startDate, endDate });
            setShowPicker(false);
        }
    };

    // Closes the picker if a click is detected outside the component
    const handleOutsideClick = (e: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
            setShowPicker(false);
        }
    };

    // Adds event listener to handle outside clicks when component mounts, and removes on unmount
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    // Computes display text shown on the date picker input/button
    const displayText =
        fromDate.year !== null && fromDate.month !== null
            ? `${formatDisplay(fromDate)} - ${isPresent ? 'Present' : formatDisplay(toDate)}`
            : 'Date';


    return (
        <div className={`relative w-[200px] flex items-center ${dateAlign ? dateAlign : "justify-end"} gap-2`} ref={wrapperRef}>
            <button
                className="text-xs flex items-center gap-1"
                onClick={() => setShowPicker(!showPicker)}
            >
                {showIcons && <FaCalendarAlt />}
                {displayText}
            </button>

            {showPicker && (
                <div className="absolute z-10 top-[10px] -right-[15px] bg-white border rounded shadow-lg mt-2 w-80 p-4">
                    {/* Tab Header */}
                    <div className="flex border-b mb-2">
                        <button
                            className={`flex-1 py-2 ${activeTab === 'from' ? 'border-b-2 border-indigo-400 font-semibold' : ''}`}
                            onClick={() => setActiveTab('from')}
                        >
                            From
                        </button>
                        <button
                            className={`flex-1 py-2 ${activeTab === 'to' ? 'border-b-2 border-indigo-400 font-semibold' : ''}`}
                            onClick={() => setActiveTab('to')}
                        >
                            To
                        </button>
                    </div>

                    {/* Present checkbox */}
                    {activeTab === 'to' && (
                        <div className="bg-indigo-200/40 rounded-md p-2 flex items-center mb-2">
                            <input
                                type="checkbox"
                                id="present"
                                checked={isPresent}
                                onChange={() => {
                                    const newPresent = !isPresent;
                                    setIsPresent(newPresent);
                                    if (newPresent && fromDate.year !== null && fromDate.month !== null) {
                                        onChange({
                                            startDate: formatValue(fromDate),
                                            endDate: 'Present'
                                        });
                                        setShowPicker(false);
                                    }
                                }}
                            />
                            <label htmlFor="present" className="ml-2">Present</label>
                        </div>
                    )}

                    {/* Year Navigation */}
                    <div className="flex justify-between items-center mb-2">
                        <button
                            className="text-xs px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                            onClick={() => setYearPage(prev => Math.max(prev - 1, 0))}
                            disabled={yearPage === 0}
                        >
                            <FaAngleLeft />
                        </button>
                        <span className="text-sm font-medium">Select Year</span>
                        <button
                            className="text-xs px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                            onClick={() => setYearPage(prev => (prev + 1) * yearsPerPage < allYears.length ? prev + 1 : prev)}
                            disabled={(yearPage + 1) * yearsPerPage >= allYears.length}
                        >
                            <FaAngleRight />
                        </button>
                    </div>

                    {/* Year Grid */}
                    <div className="grid grid-cols-4 gap-2 pb-2 border-b border-gray-300">
                        {pagedYears.map((year) => {
                            const isSelected = activeTab === 'from'
                                ? fromDate.year === year
                                : toDate.year === year;
                            return (
                                <button
                                    key={year}
                                    className={`py-1 px-2 rounded text-sm ${isSelected
                                        ? 'bg-indigo-100 border border-indigo-400'
                                        : 'hover:bg-gray-100'}`}
                                    onClick={() => {
                                        if (activeTab === 'from') {
                                            setFromDate(prev => ({ ...prev, year }));
                                        } else {
                                            setToDate(prev => ({ ...prev, year }));
                                        }
                                    }}
                                >
                                    {year}
                                </button>
                            );
                        })}
                    </div>

                    {/* Month Grid */}
                    <div className="grid grid-cols-4 gap-2 pt-2">
                        {months.map((month, idx) => {
                            const currentYear = activeTab === 'from' ? fromDate.year : toDate.year;
                            const isSelected = activeTab === 'from'
                                ? fromDate.month === idx
                                : toDate.month === idx;
                            return (
                                <button
                                    key={month}
                                    disabled={currentYear === null}
                                    className={`py-1 px-2 rounded text-sm ${isSelected
                                        ? 'bg-indigo-100 border border-indigo-400'
                                        : 'hover:bg-gray-100'} ${currentYear === null ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={() => {
                                        if (currentYear !== null) {
                                            handleSelect(activeTab, currentYear, idx);
                                        }
                                    }}
                                >
                                    {month}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomDatePicker;
