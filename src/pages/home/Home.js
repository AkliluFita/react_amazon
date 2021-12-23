import React from 'react'
import './Home.css'
import Product from '../../Product'
import {ProductData} from '../../LocalData/ProductData'

export default function Home() {
    return (
        <div className='home'>
            <div className="home__container">
                  <div className="home_showcase">
                      
                  </div>

                  <div className="home_product">
    
                       { ProductData.map(p => (
                          <div >
                               <Product 
                               key={p.id}
                               product={p}/>
                          </div>
                       ) ) }
                        
                      
                  </div>
                  
            </div>
        </div>
    )
}
