import React, { ReactNode } from 'react'

import '../../styles/base/base.style.css';
import Navbar from "./Navbar.component";

interface Props {
  children?: ReactNode;
  style?: string;
}

const Base = ({ children, style }: Props) => {
  return (
    <div
      className={`container d-flex align-items-${style} justify-content-center w-100`}
    >
      {children}
    </div>
  );
};

export default Base;