import React from 'react'
import { Link } from 'react-router-dom'

const PublicLayout = ({children}) => {
  return (
    <section className="min-h-screen overflow-hidden font-urbanist bg-purple-bg text-white bg-[url(/images/bg-auth-mobile.png)] bg-right-bottom bg-no-repeat sm:bg-[url(/images/bg-auth-desktop.png)]">
      <header className="flex p-2 py-3 justify-center items-center bg-purple-dark sm:text-lg relative">
        <Link to={"/"}>
        <h1 className="uppercase font-semibold">Gift Music</h1>
        </Link>


      </header>


      <section className="flex justify-center items-center px-4 pt-10">
        {children}
      </section>
    </section>
  )
}

export default PublicLayout