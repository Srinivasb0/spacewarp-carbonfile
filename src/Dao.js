import React from 'react';
import { useState } from 'react';
import {ethers} from 'ethers';
import { Button,Text } from '@aragon/ui';
const lighthouse = require('@lighthouse-web3/sdk');

const voteAddress = "0xD5f2a720e0f337aac7CD710b8818aaecE53F8db7"
const voteABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    // vote for project
    "function voteForProject(bytes32 project)",
    // token holders
    "function totalVotesFor(bytes32 project) view returns(uint)",
    // token count
    "function projectList(uint) view returns(uint)"
]

function Dao() {
  const [totalvotes1, setTVotes1] = useState(0)
   const [totalvotes2, setTVotes2] = useState(0)
   const [totalvotes3, setTVotes3] = useState(0)

   const provider = new ethers.providers.Web3Provider(window.ethereum)
   provider.send("eth_requestAccounts", []);
   const signer = provider.getSigner()
   // reading contract data
   const pContract = new ethers.Contract(voteAddress, voteABI, provider);
   // writing to contract data
   const sContract = new ethers.Contract(voteAddress, voteABI, signer);
  const [arr,setArr] = useState([
    {
     "Project Owner": "Owner1",
     "Offset project Type": "Project A",
     "Project Title": "ABC",
     "Project developer": "Starbucks",
     "Project Start date": "04/01/2023",
     "Project description": "Loreum ipsum",
     "SOC": 1.2,
     "Carbon credits": 5,
     "address": "0x4b696d6265726c7920636c61726b20677265656e206669656c64000000000021",
     "votes": 0,
     "voted":false
    },
    {
     "Project Owner": "Owner2",
     "Offset project Type": "Project B",
     "Project Title": "ABC",
     "Project developer": "Microsoft",
     "Project Start date": "02/07/2022",
     "Project description": "Loreum ipsum",
     "SOC": 3,
     "Carbon credits": 4,
     "address": "0x4b696d6265726c7920636c61726b20677265656e206669656c64000000000012",
     "votes": 0,
     "voted":false
    },
    {
     "Project Owner": "Owner3",
     "Offset project Type": "Project C",
     "Project Title": "ABC",
     "Project developer": "Kimberley",
     "Project Start date": "01/05/2022",
     "Project description": "Loreum ipsum",
     "SOC": 4,
     "Carbon credits": 6,
     "address": "0x4b696d6265726c7920636c61726b20677265656e206669656c64000000000014",
     "votes": 0,
     "voted":false
    }
   ])

   sContract.totalVotesFor("0x4b696d6265726c7920636c61726b20677265656e206669656c64000000000021").then(data => {
    const vote=parseInt(data['_hex'],16);
    setTVotes1(vote);
 }).catch(err => console.log(err));
 sContract.totalVotesFor("0x4b696d6265726c7920636c61726b20677265656e206669656c64000000000012").then(data => {
  const vote=parseInt(data['_hex'],16);
  setTVotes2(vote);
}).catch(err => console.log(err));
sContract.totalVotesFor("0x4b696d6265726c7920636c61726b20677265656e206669656c64000000000014").then(data => {
  const vote=parseInt(data['_hex'],16);
  setTVotes3(vote);
}).catch(err => console.log(err));

const uploadText = async(data) =>{
  const apiKey = "d7f5ec93-8d58-42b1-bbd8-57d64da4576e"; //generate from https://files.lighthouse.storage/ or cli (lighthouse-web3 api-key --new)
  const response = await lighthouse.uploadText(
    toString(data),
    apiKey
  );
  console.log(response);
  console.log("Visit at: https://gateway.lighthouse.storage/ipfs/" + response.Hash);
  alert("Published");
}
  return (
    <>
       <table class="table table-light table-striped text-center">
  <thead>
    <tr>
      <th scope="col">Project Name</th>
      <th scope="col">Owner Name</th>
      <th scope="col">SOC</th>
      <th scope="col">Carbon credits</th>
      <th scope="col">Total Votes</th>
      <th scope="col">Publish</th>
    </tr>
  </thead>
  <tbody>
     <tr>
      <th scope="row">{arr[0]['Offset project Type']}</th>
      <td>{arr[0]['Project Owner']}</td>
      <td>{arr[0]['SOC']}</td>
      <td>{arr[0]['Carbon credits']}</td>
      <td>{totalvotes1}</td>
      <td>{totalvotes1>3? <Button label="Publish IPFS" mode="positive" size="small" onClick={() => uploadText(arr[0])}/>:
           <Text>Less Votes</Text>}</td>
    </tr>

    <tr>
      <th scope="row">{arr[1]['Offset project Type']}</th>
      <td>{arr[1]['Project Owner']}</td>
      <td>{arr[1]['SOC']}</td>
      <td>{arr[1]['Carbon credits']}</td>
      <td>{totalvotes2}</td>
      <td>{totalvotes2>3? <Button label="Publish IPFS" mode="positive" size="small" onClick={() => uploadText(arr[1])}/>:
           <Text>Less Votes</Text>}</td>
      </tr>

    <tr>
      <th scope="row">{arr[2]['Offset project Type']}</th>
      <td>{arr[2]['Project Owner']}</td>
      <td>{arr[2]['SOC']}</td>
      <td>{arr[2]['Carbon credits']}</td>
      <td>{totalvotes3}</td>
      <td>{totalvotes3>3? <Button label="Publish IPFS" mode="positive" size="small" onClick={() => uploadText(arr[2])}/>:
           <Text>Less Votes</Text>}</td>
      </tr>
  
  </tbody>
</table>
  
    </>
  )
}

export default Dao;
