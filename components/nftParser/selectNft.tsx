import React, { useState, useEffect } from "react";
import {
    getParsedNftAccountsByOwner,
} from "@nfteyez/sol-rayz";
import { PublicKey, Connection } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

type NFT = {
    name: string;
    mint: string;
    imgUrl: string;
};

export default function SelectNft() {
    const { publicKey } = useWallet();
    const [showNfts, setShowNfts] = useState<boolean>(true);
    const [nfts, setNfts] = useState<NFT[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const saveSelectedNft = (nft: NFT) => {
        localStorage.setItem("selectedNft", nft.imgUrl);
        localStorage.setItem("nftSelected", "true");
        setShowNfts(false);
    };

    const selectDefault = () => {
        localStorage.setItem("nftSelected", "true");
        localStorage.removeItem("selectedNft");
        setShowNfts(false);
    } 

    const getNFTs = async (publicKey: PublicKey) => {
        try {
          const rpcEndpoint = process.env.NEXT_PUBLIC_HELIUS_RPC;
          const connection = new Connection(rpcEndpoint!, "confirmed");
          // const address = "3EqUrFrjgABCWAnqMYjZ36GcktiwDtFdkNYwY6C6cDzy;
          // or use Solana Domain
          const publicAddress: string = publicKey.toString();
        
        
          const nftArray = await getParsedNftAccountsByOwner({
              publicAddress,
              connection,
          });
      
          console.log("nftArray", nftArray);
          let image_array: Array<NFT> = [];
          // for each nft in the array, get the token id and image url
          for (let i = 0; i < nftArray.length; i++) {
              const nft = nftArray[i];
              const mint = nft.mint;
              const name = nft.data.name;
              // for the image url we need to ping the nft.data.uri and get the "image" field
              const uri = nft.data.uri;
              const uriResponse = await fetch(uri);
              if (!uriResponse.ok) {
                  i++;
              } else {
                  console.log("uriResponse", uriResponse);
                  const uriJson = await uriResponse.json();
                  const image = uriJson.image;
                  const nftObj = {
                      name: name,
                      mint: mint,
                      imgUrl: image,
                  };
                  nfts.push(nftObj);
                }
            }
        } catch (error: any) {
          console.log("Error thrown, while fetching NFTs", error.message);
        }
      };

    useEffect(() => {
        setLoading(true);
        getNFTs(publicKey as PublicKey).then((nfts) => {
            setLoading(false);
        });
    }, [publicKey]);
    return (
        <>
            {showNfts && (
                <div style={{display: 'flex', flexDirection: 'column', gap: '20px', alignContent:'center', justifyContent: 'center', alignItems: 'center'}}>
                    <h2>Select NFT to Use</h2>
                    {loading && <p>Loading...</p>}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        {nfts.map((nft) => (
                            <img
                                src={nft.imgUrl}
                                alt={nft.name}
                                onClick={() => saveSelectedNft(nft)}
                                style={{ width: '100px', height: '100px', cursor: 'pointer' }}
                            />
                        ))}

                        
                    </div>
                    <button
                        onClick={() => selectDefault()}
                        style={{ width: 'fit-content', height: 'fit-content', cursor: 'pointer', backgroundColor: 'blue', color: 'white', fontSize: '20px'}}
                    >
                        Just use default Bird
                    </button>
                </div>
            )}
            {!showNfts && (
                <div style={{display: 'flex', flexDirection: 'column', gap: '20px', alignContent:'center', justifyContent: 'center', alignItems: 'center'}}>
                    <button
                        onClick={() => setShowNfts(true)}
                        style={{ width: 'fit-content', height: 'fit-content', cursor: 'pointer', backgroundColor: 'blue', color: 'white', fontSize: '20px'}}
                    >
                        Change NFT
                    </button>
                </div>
            )}
        </>
    )
}