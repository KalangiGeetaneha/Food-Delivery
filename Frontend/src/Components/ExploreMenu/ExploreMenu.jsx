import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
            <h1>Explore our menu</h1>
            <p className='explore-menu-test'>The choice is all yours! Explore our delicious menu filled with freshly prepared dishes, made to satisfy every craving. From cheesy pizzas and juicy burgers to light salads and comforting pasta, there’s something special waiting for you. Simply choose your favorite items from the menu and let us serve happiness on your plate.</p>
          <div className='explore-menu-list'>
            {menu_list.map((item,index)=>{
            return (
                <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index}className="explore-menu-list-item">
                 <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                 <p>{item.menu_name}</p>
                </div>
            )
      }  )}
          </div>
          <hr/>
        </div>
  )
}

export default ExploreMenu