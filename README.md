# Solana Bird

## About

Solana Bird is a clone of Flappy Bird, but with an on-chain Scoreboard. After connecting your wallet you can select a NFT from your wallet to play with or just select the default bird. Once you crash, you can submit your score to the scoreboard. The scoreboard is on-chain and is sorted by the highest score. You can also view the top 20 scores on the scoreboard.

[Scoreboard Repo](https://github.com/maweiche/scoreboard_program) 

[Scoreboard Program Account](https://explorer.solana.com/address/5avBkwggqfVGFiuVf7jucTX2vzsCmMZ8ikxMgFknY1eJ?cluster=devnet)

[Scoreboard Program IDL](https://explorer.solana.com/address/5avBkwggqfVGFiuVf7jucTX2vzsCmMZ8ikxMgFknY1eJ/anchor-program?cluster=devnet)

### Program Details

The scoreboard program has 3 main functions:
- Initialize the scoreboard (this sets the signer has the authority and creates a PDA with the seeds `scoreboard` and `signer.key().as_ref()`)

- Add Score (this adds a score to the scoreboard with three parameters: `player`, `score`, and `timestamp`)

- Reset Scoreboard (this resets the scoreboard by clearing all the scores, only the authority can call this function)

### Logo
![Solana Bird](/public/solana_bird.png)

### Gameplay
![Gameplay](/public/gameplayScreenshot.png)

### Scoreboard
![Scoreboard](/public/scoreboardScreenshot.png)

### NFT Selection
![NFT Selection](/public/nftSelectionScreenshot.png)


## Getting Started

After cloning the repo, you will need to update the `NEXT_PUBLIC_SOLANA_RPC_HOST` in the `.env.local` file to point to your devnet Solana RPC host then rename the file to `.env`.

First, run the development server:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Packages Used

- [Anchor](https://github.com/coral-xyz/anchor) - Used to build on-chain scoreboard

- [Solana Web3.js](https://www.npmjs.com/package/@solana/web3.js) - Used for interacting with the Solana blockchain

- [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter#readme) - Used for connecting to the wallet

- [@nfteyez/sol-rayz](https://github.com/NftEyez/sol-rayz#readme) - Used for the parsing of NFTs in the wallet

## Contributors
- [CosmosMil - h0PHNz](https://github.com/CosmosMil)
- [Send4t - QvjG6d](https://github.com/send4t)
- [Judd1337 - qji1dU](judd1337)
- [Noamrubin22 - niqkXC](https://github.com/noamrubin22)
- [Maweiche - VR1t6E](https://github.com/maweiche)