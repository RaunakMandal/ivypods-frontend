import React, { ReactNode } from 'react'

import '../../styles/base/base.style.css';

interface Props {
    children?: ReactNode
}

const Base = ({children, ...props} : Props) => {
  return (
    <div className='container'>
        {children}
    </div>
  )
}

export default Base;