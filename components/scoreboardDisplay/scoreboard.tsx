import React, { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import {
    Program,
    AnchorProvider,
    Idl,
    setProvider,
  } from "@project-serum/anchor";
import { IDL, Scoreboard } from "../scoreboardProgram/idl/scoreboard";
import BN from "bn.js";
import * as anchor from "@project-serum/anchor";

export default function Scoreboard() {
    const { publicKey, sendTransaction } = useWallet();
    const [loading, setLoading] = useState<boolean>(false);
    const [scoreboardPda, setScoreboardPda] = useState<PublicKey | null>(null);
    const [displayInit, setDisplayInit] = useState<boolean>(false);

    const connection = new Connection(clusterApiUrl("devnet"), {
        commitment: "confirmed",
    });

    // Create an Anchor provider
    const provider = new AnchorProvider(connection, useWallet() as any, {});

    // Set the provider as the default provider
    setProvider(provider);

    const programId = new PublicKey("5avBkwggqfVGFiuVf7jucTX2vzsCmMZ8ikxMgFknY1eJ");
    const program = new Program(
      IDL as Idl,
      programId,
    ) as unknown as Program<Scoreboard>;
    
    // Get the data from the program
    async function getScoreboardData() {
        setLoading(true);

        let data = PublicKey.findProgramAddressSync(
          [Buffer.from("scoreboard")],
          program.programId,
        );
        console.log("data", data);
        setScoreboardPda(data[0]);
    
        const scoreboard_account_info = await connection.getAccountInfo(data[0]);
    
        if (scoreboard_account_info != null) {
          const game_data_decoded = program.coder.accounts.decode(
            "Scoreboard",
            scoreboard_account_info?.data,
          );
    
          console.log("game_data_decoded", game_data_decoded);
        } else {
            setDisplayInit(true);
        }
    
        setLoading(false);
    }

    // Scoreboard Functions
    // initializeScoreboard
    async function initializeScoreboard() {
        setLoading(true);
    
        const tx = await program.methods.initializeScoreboard()
        .accounts( 
            {
            scoreboard: scoreboardPda!,
            systemProgram: anchor.web3.SystemProgram.programId,
            }
        )
        .transaction();

        const txHash = await sendTransaction(tx, connection);

        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
        console.log("blockhash", blockhash);
        await connection.confirmTransaction({
            blockhash,
            lastValidBlockHeight,
            signature: txHash,
        });

        console.log("tx", tx);
    
        setLoading(false);
    }
    // addScore
    async function addScore() {
        setLoading(true);
        const score = new BN(100);
        const timestamp = new BN(Date.now());
        const tx = await program.methods
        .addScore(
            score,
            timestamp,
        )
        .accounts({
            scoreboard: scoreboardPda!,
        })
        .transaction();

        const txHash = await sendTransaction(tx, connection);

        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

        await connection.confirmTransaction({
            blockhash,
            lastValidBlockHeight,
            signature: txHash,
        });

        console.log("tx", tx);
    
        setLoading(false);
    }

    // resetScoreboard
    async function resetScoreboard() {
        setLoading(true);
    
        const tx = await program.methods.resetScoreboard()
        .accounts({
            scoreboard: scoreboardPda!,

        })
        .transaction();

        const txHash = await sendTransaction(tx, connection);

        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

        await connection.confirmTransaction({
            blockhash,
            lastValidBlockHeight,
            signature: txHash,
        });

        console.log("tx", tx);
    
        setLoading(false);
    }

    useEffect(() => {
        getScoreboardData();
    }, []);

    return(
        <div>
            Scoreboard!
            {loading && <p>Loading...</p>}
            {displayInit && <button onClick={initializeScoreboard}>Initialize Scoreboard</button>}
            <button onClick={addScore}>Add Score</button>
        </div>
    )
}