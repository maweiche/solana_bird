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

type Score = {
  player: PublicKey;
  score: Number;
  timestamp: Number;
};

export default function ScoreboardDisplay() {
  const { publicKey, sendTransaction } = useWallet();
  const [loading, setLoading] = useState<boolean>(false);

  // Scoreboard Info
  const [scoreboardPda, setScoreboardPda] = useState<PublicKey | null>(null);
  const [displayInit, setDisplayInit] = useState<boolean>(false);
  const [scoreboardData, setScoreboardData] = useState<Score[] | null>(null);

  const connection = new Connection(clusterApiUrl("devnet"), {
    commitment: "confirmed",
  });

  // Create an Anchor provider
  const provider = new AnchorProvider(connection, useWallet() as any, {});

  // Set the provider as the default provider
  setProvider(provider);

  const programId = new PublicKey(
    "5avBkwggqfVGFiuVf7jucTX2vzsCmMZ8ikxMgFknY1eJ"
  );
  const program = new Program(
    IDL as Idl,
    programId
  ) as unknown as Program<Scoreboard>;

  // Get the data from the program
  async function getScoreboardData() {
    setLoading(true);
    // This is the publickey of the wallet that initialized the scoreboard
    // To have a new scoreboard with your wallet as the authority, change to your wallet's public key
    const deployer = new PublicKey(
      "7wK3jPMYjpZHZAghjersW6hBNMgi9VAGr75AhYRqR2n"
    );
    let data = PublicKey.findProgramAddressSync(
      [Buffer.from("scoreboard"), deployer.toBuffer()],
      program.programId
    );
    console.log("data", data);
    setScoreboardPda(data[0]);

    const scoreboard_account_info = await connection.getAccountInfo(data[0]);

    if (scoreboard_account_info != null) {
      const game_data_decoded = program.coder.accounts.decode(
        "Scoreboard",
        scoreboard_account_info?.data
      );

      console.log("game_data_decoded", game_data_decoded);

      setScoreboardData(game_data_decoded.scores);
    } else {
      setDisplayInit(true);
    }

    setLoading(false);
  }

  // Scoreboard Functions
  // initializeScoreboard
  async function initializeScoreboard() {
    setLoading(true);

    const tx = await program.methods
      .initializeScoreboard()
      .accounts({
        scoreboard: scoreboardPda!,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .transaction();

    const txHash = await sendTransaction(tx, connection);

    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();
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
      .addScore(score, timestamp)
      .accounts({
        scoreboard: scoreboardPda!,
      })
      .transaction();

    const txHash = await sendTransaction(tx, connection);

    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

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

    const tx = await program.methods
      .resetScoreboard()
      .accounts({
        scoreboard: scoreboardPda!,
      })
      .transaction();

    const txHash = await sendTransaction(tx, connection);

    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

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

  return (
    <div className="scoreboard-container">
      <h2 className="">SCOREBOARD</h2>
      {loading && <p>Loading...</p>}
      {displayInit && (
        <button onClick={initializeScoreboard}>Initialize Scoreboard</button>
      )}

      <div className="scoreboard">
        {/* create a table to render the scoreboardData
                    the table should have 3 columns: player, score, timestamp
                */}
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Score</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {scoreboardData &&
              scoreboardData.map((score, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {score.player.toString().slice(0, 4)}...
                      {score.player.toString().slice(-4)}
                    </td>
                    <td>{score.score.toString()}</td>
                    <td>
                      {new Date(
                        parseInt(score.timestamp.toString())
                      ).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div
          style={{ display: "flex", flexDirection: "row", marginTop: "1rem" }}
        >
          <button onClick={addScore} className="secondary-btn">
            Add Score
          </button>
          <button onClick={resetScoreboard} className="secondary-btn">
            Reset Scoreboard
          </button>
        </div>
      </div>
    </div>
  );
}
