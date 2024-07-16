import React from 'react'

const Header = ({title, subtitle} : {title:string, subtitle?:string}) => {
  return (
    <>
    <p className='h2-bold text-dark-700'>{title}</p>
    {subtitle && <p className='mt-4 font-sans text-xl'>{subtitle}</p>}
    </>
  )
}

export default Header