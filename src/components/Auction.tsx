import Link from "next/link";
import styles from "../styles/slide.module.css";

import { marketplaceContractAddress } from "../addresses";


//Thirdweb Integration
import {
    MediaRenderer,
    useNetwork,
    useNetworkMismatch,
    useListing,
    useContract,
  } from "@thirdweb-dev/react";
  import {
    ChainId,
    ListingType,
    Marketplace,
    NATIVE_TOKENS,
  } from "@thirdweb-dev/sdk";
import { useState } from "react";


export default function Auction (props)  { 

  console.log("nft desde Auction FCP",props.listing)
  console.log("nft desde Auction FCP",props.type)

  //
  const handleActiveListing = () => {
   
  };
    // Hooks to detect user is on the right network and switch them if they are not
    const networkMismatch = useNetworkMismatch();
    const [, switchNetwork] = useNetwork();

     // Initialize the marketplace contract
    const { contract: marketplace } = useContract(marketplaceContractAddress, "marketplace");

    // Store the bid amount the user entered into the bidding textbox
    const [bidAmount, setBidAmount] = useState<string>("");

 
    async function createBidOrOffer() {
        try {
          // Ensure user is on the correct network
          if (networkMismatch) {
            switchNetwork && switchNetwork(ChainId.Mumbai);
            return;
          }

        
          // If the listing type is a direct listing, then we can create an offer.
          if (props.listing.type === ListingType.Direct) {
            await marketplace?.direct.makeOffer(
              props.listing.id, // The listingId of the listing we want to make an offer for
              1, // Quantity = 1
              NATIVE_TOKENS[ChainId.Mumbai].wrapped.address, // Wrapped Ether address on Mumbai
              bidAmount // The offer amount the user entered
            );
          }
    
          // If the listing type is an auction listing, then we can create a bid.
          if (props.listing.type === ListingType.Auction) {
            //console.log ("listing?.type === ListingType.Auction: ", listing?.type === ListingType.Auction)
            //console.log ("listing.Id: ", listing.id)
            await marketplace?.auction.makeBid(props.listing.id, bidAmount);
            //console.log ("bidAmount: ",bidAmount)
          }
    
          alert(
            `${
              props.listing.type === ListingType.Auction ? "Bid" : "Offer"
            } created successfully!`
          );
        } catch (error) {
          console.error(error);
          alert(error);
        }
      }

    

    async function buyNft() {
        try {
        // Ensure user is on the correct network
        if (networkMismatch) {
            switchNetwork && switchNetwork(ChainId.Mumbai);
            return;
        }

        // Simple one-liner for buying the NFT
        await marketplace?.buyoutListing(props.listing.id, 1);
        alert("NFT bought successfully!");
        } catch (error) {
        console.error(error);
        alert(error);
        }
    }


    return (
        <>
          <div className="hidden"> <span onClick={handleActiveListing}>xxxxxxxxxxxxxx </span></div>
          {/* NFT Item */}
          <div
              key={props.listing.id}
              className= {props.listing.id == 1 ? "carousel-item relative active float-left w-full" : "carousel-item relative active float-left w-full"}
              data-bs-interval="10000000"
          >
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {/* NFT Image */}
                <div className=" ">
                    <MediaRenderer
                        src={props.listing.asset?.image}
                        style={{
                        // Fit the image to the container
                        width: "100%",
                        height: "100%",
                        }}
                    />
                </div>
                {/* NFT Info */}
                <div className="{styles.NFTInfo}">
                    <p className={styles.itemTitle}>
                        <Link legacyBehavior href={/*`listing/${listing.id}`*/"#"}>
                        <a className={styles.name}>{props.listing.asset.name}</a>
                        </Link>
                    </p>
                    <p>
                      by
                    </p>
                    <p className={styles.itemPrice}>
                        <b>{props.listing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}
                        {props.listing.buyoutCurrencyValuePerToken.symbol}
                    </p>          
                    <div>
                      {/* BID */}
                      <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                        <button
                          style={{ borderStyle: "none" }}
                          className={`${styles.mainButton} `}
                          onClick={buyNft}
                        >
                          Buy
                        </button>
                        <p style={{ color: "grey" , display: "block"}}>|</p>

                          <input
                            type="text"
                            name="bidAmount"
                            className={styles.textInput} 
                            onChange={(e) => setBidAmount(e.target.value)}
                            placeholder="Amount"
                            style={{ marginTop: 0, marginLeft: 0, width: 128 }}
                          />
                          <button
                            className={styles.mainButton}
                            onClick={createBidOrOffer}
                            style={{
                              borderStyle: "none",
                              background: "transparent",
                              width: "fit-content",
                            }}
                          >
                            Make Offer
                          </button>
                      </div>
                    </div>
                    <button>TShirt</button>
                    <div className={styles.auxInfo}>
                      {/* Aux Info */}
                      <p>{/* Type: 0-Direct Listing / 1-Auction */} 
                          Type:{props.listing.type}
                      </p>
                      <p>
                          ID:{props.listing.id}
                      </p>
                      <p>
                          ID:
                          {/*console.log ("properties: ",listing.asset.attributes)*/}

                          {


                            props.listing.asset.attributes?.map((attribute) => 
                          
                            console.log("value:", attribute.value)
                            
                            
                          )}
                            
                          
                          {/* listing.asset.attributes.filter( (arr) => (arr.trait_type === "background"))*/}
                      </p>
                      <p>
                          Owned by{" "}
                          <b>
                          {props.listing.sellerAddress?.slice(0, 6) +
                              "..." +
                              props.listing.sellerAddress?.slice(36, 42)}
                          </b>
                      </p>
                    </div>
                  </div>
                </div>
            </div>
           
        </>     
    );

}
