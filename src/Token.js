import React from 'react';
import { Table, TableHeader, TableRow,TokenAmount, TableCell, Text, IdentityBadge  } from '@aragon/ui'
import {ethers} from 'ethers';

// require("dotenv").config();
// 0x2717298B325Fb337f65156ec6EC57a1d046F38cb
// c7be460a-1483-4176-bd27-8050d78a1266
const tokABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  // mint tokens
  "function mint(address to)",
  // token holders
  "function tokenHolders(uint256) view returns(uint)",
  // token count
  "function tokenCount() view returns(uint)",
  // total supply
  "function totalSupply() view returns(uint)"
]
const tokAddress = "0xbC2e6D6210c4fE7997a0C91Fd07159e550dca9b6";

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const tokcontract = new ethers.Contract(tokAddress, tokABI, provider);
  const signercontract = new ethers.Contract(tokAddress, tokABI, signer);
  // const name = tokcontract.name();
  // const symbol = tokcontract.symbol();
  // signercontract.mint("0x7F180e1712262701C9e2185584778a349db22775");
  console.log(tokcontract.tokenHolders(0));


function Token() {

  return (
    <>
    <Table
    header={
      <TableRow>
        <TableHeader title="Tokens" />
      </TableRow>
    }
  >
      <TableRow>
      <TableCell>
        <Text> <IdentityBadge
      customLabel="0x5727a4c88ad00a17bad5d6db71527393adb2f317"
      entity="0x7F180e1712262701C9e2185584778a349db22775"
      connectedAccount
    /></Text>
      </TableCell>
      <TableCell>
      <TokenAmount
      address="0x54cf9F316Bd8402d58A7d9a525Dc01A51c830244"
      amount="1"
      decimals={0}
      symbol="CFTK"
    />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        <Text> <IdentityBadge
      customLabel="0xA03ab8a9d99F3779085BCc528b35EaCD949aeC1e"
      entity="0xA03ab8a9d99F3779085BCc528b35EaCD949aeC1e"
      connectedAccount
    /></Text>
      </TableCell>
      <TableCell>
        <Text><TokenAmount
      address="0x54cf9F316Bd8402d58A7d9a525Dc01A51c830244"
      amount="1"
      decimals={0}
      symbol="CFTK"
    /></Text>
      </TableCell>
    </TableRow>
  </Table>
        
      
    </>
  )
}

export default Token;
