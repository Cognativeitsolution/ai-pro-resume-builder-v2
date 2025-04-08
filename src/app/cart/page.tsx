"use client";

import Image from "next/image";
import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import PackageImg from "media/assets/free_basic_img.webp";
import Link from "next/link";
import { AiOutlineRight } from "react-icons/ai";
import TextAreaGroup from "@/components/common/customSelect/TextArea";
import { ImAttachment } from "react-icons/im";
import { TiArrowSortedDown } from "react-icons/ti";
import { BiUpload } from "react-icons/bi";

// Dummy package data
const initialPackages = [
  { id: 1, name: "Basic Package", price: 10, quantity: 1 },
  { id: 2, name: "Standard Package", price: 20, quantity: 2 },
  { id: 3, name: "Premium Package", price: 30, quantity: 3 },
];

const Cart = () => {
  const [packages, setPackages] = useState(initialPackages);
  const [isCheckboxchecked, setCheckboxchecked] = useState<any>(false);
  const [userData, setUserData] = useState<any>();
  const [subtotal, setSubtotal] = useState<any>(0);
  const [isNote, setIsNote] = useState<any>(false);
  const [noteValue, setNoteValue] = useState<any>("");
  const [selectedFree, setSelectedFree] = useState<any>(0);

  const services = [
    {
      id: 1,
      name: "Service Name 1",
      image: PackageImg,
      price: 50,
      discounted_price: 0,
      description: "Description of Service 1",
    },
    {
      id: 2,
      name: "Service Name 2",
      image: PackageImg,
      price: 75,
      discounted_price: 0,
      description: "Description of Service 2",
    },
    {
      id: 3,
      name: "Service Name 3",
      image: PackageImg,
      price: 100,
      discounted_price: 0,
      description: "Description of Service 3",
    },
  ];

  // Update package quantity
  const updatePackagesQuantity = (id: number, type: "add" | "min") => {
    setPackages((prev) =>
      prev.map((pkg) =>
        pkg.id === id
          ? {
            ...pkg,
            quantity:
              type === "add"
                ? pkg.quantity + 1
                : Math.max(1, pkg.quantity - 1),
          }
          : pkg
      )
    );
  };

  // Remove package
  const handleRemoveCartItem = (id: number) => {
    setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
  };

  const handleCheckboxChange = () => {
    setCheckboxchecked(!isCheckboxchecked);
  };

  return (
    <>
      <div className="w-full lg:w-[80%] m-auto">
        <div className="container m-auto py-20 px-4 sm:px-0 font-Lexend">
          {/* Content */}
          <div className="flex flex-col gap-20">
            <div className="grid  lg:grid-cols-[70%,30%] gap-2 ">
              {/* Left Section */}
              <div className="sm:px-8 select-none">
                <div>
                  <h1 className="text-primaryBlue font-bold text-2xl">
                    YOUR CART
                  </h1>
                  <span id="id_here" className="hidden text-md text-red-500">
                    For expert assistance, share your document and our
                    professionals rewrite it in a polished way that reflects
                    your strengths to ensure each document meets industry
                    standards.
                  </span>
                </div>

                {/* Packages */}
                {/* <div>
                  {packages.map(
                    (pkg, idx) =>
                      pkg.price > 0 && (
                        <div
                          key={idx}
                          className="sm:flex gap-8 items-center border-b-2 py-6 px-4"
                        >
                          <div className="w-full sm:w-[100px]">
                            <Image
                              src={PackageImg}
                              className="w-full"
                              alt="Package"
                            />
                          </div>

                          <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between pr-4">
                            <div className="pt-4 sm:pt-0">
                              <h1 className="text-lg sm:text-2xl font-bold text-primaryBlue">
                                {pkg.name}
                              </h1>
                              <span className="text-sm text-muted hidden sm:block">
                                {pkg.quantity > 1
                                  ? `Package For ${pkg.quantity} Months`
                                  : `Package For  ${pkg.quantity} Month`}
                              </span>
                            </div>
                            <div className="text-lg flex items-center sm:block justify-between w-full sm:w-auto py-2 sm:py-0">
                              <span className="text-sm text-muted block sm:hidden">
                                {pkg.quantity > 1
                                  ? `Package For ${pkg.quantity} Months`
                                  : `Package For  ${pkg.quantity} Month`}
                              </span>
                              <h1>${pkg.price * pkg.quantity}</h1>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 justify-end">
                            <div className="p-2 sm:w-fit cursor-pointer flex justify-center items-center gap-4">
                              <FaCirclePlus
                                onClick={() =>
                                  updatePackagesQuantity(pkg.id, "add")
                                }
                                className="text-primaryBlue text-2xl"
                              />
                              <div className="flex items-center">
                                <span className="text-xl">{pkg.quantity}</span>
                              </div>
                              <FaCircleMinus
                                onClick={() =>
                                  updatePackagesQuantity(pkg.id, "min")
                                }
                                className="text-primaryBlue text-2xl"
                              />
                            </div>
                            <div
                              className="lg:w-full p-2 sm:w-fit cursor-pointer flex sm:block justify-center items-center gap-2 w-[20%] bg-[red]"
                              onClick={() => handleRemoveCartItem(pkg.id)}
                            >
                              <RiDeleteBinLine className="text-xl bg-[red] text-white" />
                            </div>
                          </div>
                        </div>
                      )
                  )}
                </div> */}

                {/* service Carts List */}
                <div>
                  <div className="sm:flex gap-8 items-center border-b-2 py-6 px-4 relative">
                    <div className="w-full sm:w-[100px]">
                      <Image
                        src={PackageImg}
                        className="w-full"
                        alt="service"
                      />
                    </div>

                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between pr-4">
                      <div className="pt-4 sm:pt-0">
                        <h1 className="text-lg sm:text-2xl font-bold text-primary">
                          Static Service Name
                        </h1>
                        <span className="text-sm text-muted hidden sm:block">
                          Size: A4
                        </span>
                        <span className="text-xs flex items-center gap-2">
                          <ImAttachment />
                          StaticFile.pdf
                        </span>
                      </div>

                      <div className="text-lg flex items-center sm:block justify-between w-full sm:w-auto py-2 sm:py-0">
                        <span className="text-sm text-muted block sm:hidden">
                          Size: A4
                        </span>
                        <h1>
                          <div>
                            <span>FREE</span> {" / "}
                            <span className="line-through">$50</span>
                          </div>
                        </h1>
                      </div>
                    </div>

                    <div className="w-full sm:w-[60px] flex gap-4 justify-end">
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.docx,.jpeg,.jpg,.png"
                        disabled
                      />
                      <div>
                        <div className="relative w-full bg-primaryBlue p-2 sm:w-fit cursor-pointer flex sm:block justify-center items-center gap-2">
                          <div className="hidden absolute p-2 font-Lexend bottom-[130%] left-[-0px] sm:left-[-82px] justify-center bg-black text-white border rounded-lg sm:w-[200px] text-center">
                            Service needs a file. Please Upload
                            <TiArrowSortedDown className="text-black absolute bottom-[-15px] text-[25px]" />
                          </div>
                          <span className="text-white font-semibold block sm:hidden">
                            Upload File
                          </span>
                          <BiUpload className="text-xl bg-primaryBlue text-white" />
                        </div>
                      </div>

                      <div className="lg:w-full bg-[red] p-2 sm:w-fit cursor-pointer flex justify-center items-center gap-2 w-[20%]">
                        <RiDeleteBinLine className="text-xl bg-[red] text-white flex justify-center" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* If No Services Set */}
                <div id="services-placeholder">
                  {/* {cart.package.length > 0 &&
                    cart.services.length === 0 &&
                    cart.package[0].id === 2 && ( */}
                  {/* <>
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className="sm:flex gap-8 items-center border-b-2 py-6 px-4 opacity-20 hover:opacity-100"
                      >
                        <div className="w-full sm:w-[100px]">
                          <div className="w-full sm:w-[100px]">
                            <Image
                              src={service.image}
                              className="w-full"
                              alt="service"
                            />
                          </div>
                        </div>

                        <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between pr-4">
                          <div className="pt-4 sm:pt-0">
                            <h1 className="text-lg sm:text-xl font-bold text-primaryBlue">
                              {service.name}
                            </h1>

                            <span className="text-xs flex items-center gap-2">
                              Price: $ {service.price}
                            </span>
                          </div>
                          <div className="text-lg flex gap-2 items-center flex-col pt-6 justify-between w-full sm:w-auto ">
                            <h1>
                              <div className="text-sm flex items-end justify-end">
                                <span>FREE</span>
                                {" / "}
                                <span className="line-through">
                                  $ {service.price}
                                </span>
                              </div>
                            </h1>
                            <button
                              className="bg-primaryBlue px-12 py-1 text-white"
                              onClick={() => {
                                // Assuming driverObj is defined elsewhere
                                // driverObj.destroy("#services-placeholder");
                                // addToCart("service", {
                                //   id: service.id,
                                //   name: service.name,
                                //   image: service.image,
                                //   price: service.price,
                                //   discounted_price: service.discounted_price,
                                //   description: service.description,
                                //   file: {},
                                // });
                              }}
                            >
                              Avail
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </> */}
                  {/* )} */}
                </div>

                {/* CONTINUE SHOPPING */}
                <div className="flex justify-center items-center py-8">
                  <Link
                    href={"/services"}
                    className="bg-primaryBlue text-white py-2 px-4 rounded-2xl hover:bg-[#0056b1d2]"
                  >
                    CONTINUE SHOPPING
                  </Link>
                </div>
              </div>
              {/* Right Section */}
              <div className="sticky flex flex-col gap-8 top-[100px] h-fit">
                <div className="border-2 p-8 ">
                  {/* Card Title */}
                  <div className="">
                    <h1 className="text-lg sm:text-2xl font-bold">
                      Your order
                    </h1>
                  </div>
                  {/* Details */}
                  <div className="flex flex-col gap-4 py-6">
                    <div className="flex items-center justify-between font-bold text-lg sm:text-2xl">
                      <h1>SUBTOTAL:</h1>
                      <h1>{!userData ? "$0" : "$" + subtotal} </h1>
                    </div>
                  </div>
                  {/* Checkout Page */}
                  <div className="flex flex-col gap-2">
                    {subtotal !== 0 ? (
                      <button
                        // onClick={handleCheckoutClick}
                        className="bg-primaryBlue text-center text-white py-3 px-4 font-bold text-lg sm:text-xl  hover:bg-[#0056b1d2]"
                      >
                        Checkout
                      </button>
                    ) : userData?.package_id === 3 ? (
                      <button
                        // onClick={handleCheckoutClick}
                        className="bg-primaryBlue text-center text-white py-3 px-4 font-bold text-lg sm:text-xl  hover:bg-[#0056b1d2]"
                      >
                        Checkout
                      </button>
                    ) : (
                      <button className="bg-gray-500 text-center text-white py-3 px-4 font-bold text-lg sm:text-xl cursor-not-allowed">
                        {" "}
                        Checkout
                      </button>
                    )}
                  </div>

                  <div className="py-4">
                    <p className="text-muted text-sm">
                      By proceeding to checkout, you confirm your agreement to
                      adhere to our terms and conditions for the AI Pro Resume
                      service. Kindly review the terms document for
                      comprehensive information.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="store_policies"
                      className="w-fit text-sm flex items-center gap-2 text-primaryBlue cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isCheckboxchecked}
                        onChange={handleCheckboxChange}
                        className="w-5 h-5"
                        id="store_policies"
                      />
                      I agree to the store policies
                    </label>
                  </div>
                </div>

                <div className="border-2 p-8">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setIsNote(!isNote)}
                  >
                    <h1 className="text-lg sm:text-2xl font-bold">
                      Add a Note
                    </h1>
                    <AiOutlineRight className="text-xl font-bold" />
                  </div>
                  <div className={`${isNote ? "block" : "hidden"}`}>
                    <TextAreaGroup
                      htmlFor={"add_note"}
                      isRequired={false}
                      label={"Note"}
                      cols={4}
                      onChange={(val) => setNoteValue(val)}
                      placeholder={"add your note..."}
                      resize={false}
                      rows={4}
                      value={noteValue}
                    />
                  </div>
                </div>
                {/* {cart.package.length > 0 ||
                  (cart.services.length > 0 && ( */}
                <div
                  //   onClick={handleClearCart}
                  className="flex items-center gap-2 text-base justify-center text-primaryBlue cursor-pointer"
                >
                  <span>Clear Cart</span>
                  <RiDeleteBinLine />
                </div>
                {/* ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
