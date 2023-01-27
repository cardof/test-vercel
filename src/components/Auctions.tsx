
//Contract Address
import { marketplaceContractAddress } from "../addresses";
//Thirdweb Integration
import {  ChainId, useContract, useActiveListings, useListings } from "@thirdweb-dev/react";


import Auction from "./Auction"
import Product from "./Product"
import { useState } from "react";
import { PrintfulProduct } from "../types";



// Thirdweb - Polygon Mumbai Testnet
const desiredChainId = ChainId.Mumbai;

const Auctions =  (props) => { 

 // {console.log('Producto desde Auctions FCP', props.product)}
  
  const { contract:marketplace } = useContract(marketplaceContractAddress, "marketplace")
  const { data: listings, isLoading: loadingListings } = useListings(marketplace);

  var activelist = 0
  var lastlist = 0
//actualizar con el código correspondiente de la prpioedad del NFT
  var ProductID = "296477669"

  const prevListing = () => {
  //Previos Auction
    if (activelisting==-1)
    {
      activelist = lastlist-1
      setActiveListing(activelist)
      var ProductID = "297170871"
    }else {
      setActiveListing(activelisting-1)
      var ProductID = "297170871"
    }
  };      

  const nextListing = () => {
  //Next Auction
    if (activelisting==lastlist-1)
    {
      activelist = -1;
      setActiveListing(activelist)
      var ProductID = "296477046"
    }else {
    
      setActiveListing(activelisting+1)
      var ProductID = "296477046"
    }

  };   

  

  const [activelisting, setActiveListing] = useState (-1);
  const [productId, setProductId] = useState (props.product);



  return (
      <>

        <div>
            {
            // If the listings are loading, show a loading message
            loadingListings ? (
              <div>Loading listings...</div>
            ) : (

              // Otherwise, show the listings
              <div id="AuctionsCarousel" className="carousel static relative" data-bs-ride="carousel"  >

                <p className="hidden">{listings.length}</p>
                <p  className="hidden">{
                !lastlist?
                  (lastlist = listings.length-1):
                  (lastlist= lastlist)
                }</p>

                <button  onClick = {prevListing }
                className="button-prev appearance-none px-2 text-gray-800 hover:text-gray-400 rounded-md cursor-pointer focus:outline-none focus:text-blue-800 transition relative"
                type="button"
                ><p>←</p>
                </button>

                <button  onClick = {nextListing }
                className="button-next appearance-none px-2 text-gray-800 hover:text-gray-400 rounded-md cursor-pointer focus:outline-none focus:text-blue-800 transition relative"
                type="button"
                ><p>→</p>
                </button>
                  
                <div><Product key={ProductID} {...props.product}/>hola</div>
                  
                <div className="carousel-inner relative w-full overflow-hidden">
                  { 
                    activelisting == -1 ?
                    (                
                      <Auction 
                        key={listings[listings.length-1].id} 
                        listing = {listings[listings.length-1]} 
                      />):
                    (                
                      <Auction 
                        key={listings[activelisting].id} 
                        listing = {listings[activelisting]} 
                      />)
    
                  }

                </div>
                <div className="max-w-7xl mx-auto px-6">
                  
                  {/*<Product key={productos.id} {...PrintfulProduct} />*/}
                </div>

              </div>
            )
            
            }
        </div>
   
      </>
    );
   
}

export default Auctions;