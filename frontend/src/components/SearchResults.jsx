import moment from "moment";
import "./searchresults.css";
import { useState } from "react";
import { HOST } from "../util/constants";

export default function SearchResults({results,searchInput,user}) {
    const [isSubbed,setIsSubbed] = useState(results.isSubbed);
    // send subscribe request
    const handleSubscribe = async (e)=>{
        try{
            const res = await fetch(HOST+"/subscribe/"+searchInput,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({email:user})
            })
            if(res.ok){
                setIsSubbed(true);
            }
        }
        catch(err){
            console.log("subscription error: ",err.message);
        }
    }
  return (
    <section className={"searchResults"}>
        <p className={"amountOfTransactions"}>
            <div>Results for: <span>{searchInput}</span></div>
            <div>Current Balance: {(results.balance/10**18).toFixed(6)} ETH</div>
            <div>Get alerts for searched address: <button disabled={isSubbed} className={`sub-btn ${isSubbed?"subbed":"nsubbed"}`} onClick={handleSubscribe}>{isSubbed ? "Subscribed" : "Subscribe"}</button></div>
        </p>
        <table className={"txnSection"}>
            <thead>
                <tr className={"txnTitle"}>
                    <th>Transaction Hash</th>
                    <th>Block</th>
                    <th>Age</th>
                    <th>From</th>
                    <th></th>
                    <th>To</th>
                    <th>Value</th>
                    <th>Txn Fee</th>
                </tr>
            </thead>
            {results.data.map((txn,ind)=>(
                <tr key={ind} className={"txn"}>
                    <td className={"blueText"}>{txn.hash.slice(0,16)}...</td>
                    <td>
                        {txn.block_number}
                    </td>
                    <td>{moment(txn.block_timestamp).fromNow()}</td>
                    <td className={"blueText"}>
                        {txn.from_address.slice(0,8)}...{txn.from_address.slice(34)}
                    </td>
                    <td>
                        <span className={
                            `${
                                txn.from_address.toLowerCase() !==
                                searchInput.toLowerCase()
                                ? 'inTxn'
                                : 'outTxn'
                            }`
                        }>
                            {
                                txn.from_address.toLowerCase() !==
                                searchInput.toLowerCase()
                                ? "IN"
                                : "OUT"
                            }
                        </span>
                    </td>
                    <td className={"blueText"}>
                        {txn.to_address.slice(0,8)}...{txn.to_address.slice(34)}
                    </td>
                    <td>{(txn.value / 10**18).toFixed(5)} ETH</td>
                    <td>{((txn.gas_price * txn.gas) / 10**18).toFixed(12)} ETH</td>
                </tr>
            ))}
        </table>
    </section>
  )
}
