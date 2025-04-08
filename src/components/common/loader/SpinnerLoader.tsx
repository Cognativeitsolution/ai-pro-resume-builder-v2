import React from "react";
// import logo from "../../../assets/images/logo_resume.webp";
import logo from 'media/assets/logo_resume.webp'
import Image from "next/image";
import styles from './Spinner.module.css';

const SpinnerLoader = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center gap-4 flex-col">
      <div>
        <Image
          src={logo}
          width={200}
          alt="logo"
        />
      </div>
      <div className={styles.spinner}>
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default SpinnerLoader;
