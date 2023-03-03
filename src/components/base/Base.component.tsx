import React, { ReactNode } from 'react'

import '../../styles/base/base.style.css';

interface Props {
    children?: ReactNode
}

const Base = ({children} : Props) => {
  return (
    <div className='container d-flex align-items-start justify-content-center'>
        {children}
    </div>
  )
}

export default Base;