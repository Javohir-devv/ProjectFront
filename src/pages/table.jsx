import React from 'react'
import Header from '../components/Header'
import Bookingtable from '../components/bookingtable'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const Table = () => {
  return (
    <div>
      <Header/>
      <div className="link-flex" style={{
        margin:'0 auto',
        width:1440,           
        marginTop:170,
      }}>
        <div className="links">
          <Link to='/'>
            <p>Bosh sahifa</p>
          </Link>
          <p> &gt; </p>
          <Link to='/booking'>
            <p className='select'>Booking</p>
          </Link>
     
        </div>
        <a href="/path/to/menu.pdf" download>
          <button>Menuni yuklab olish</button>
        </a>
      </div>
    <Bookingtable></Bookingtable>
      <Footer/>
    </div>
  )
}

export default Table
