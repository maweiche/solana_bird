import {
  Program,
  AnchorProvider,
  Idl,
  setProvider,
} from "@project-serum/anchor";
import { IDL, Scoreboard } from "../idl/scoreboard";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
// Create a connection to the devnet cluster
export const connection = new Connection(clusterApiUrl("devnet"), {
  commitment: "confirmed",
});

// Create a placeholder wallet to set up AnchorProvider
const wallet = Keypair.generate();

// Create an Anchor provider
const provider = new AnchorProvider(connection, wallet as any, {});

// Set the provider as the default provider
setProvider(provider);

//Scoreboard Program ID
const programId = new PublicKey("5avBkwggqfVGFiuVf7jucTX2vzsCmMZ8ikxMgFknY1eJ");

export const program = new Program(
  IDL as Idl,
  programId,
) as unknown as Program<Scoreboard>;

// GameDataAccount PDA
export const [globalLevel1GameDataAccount] = PublicKey.findProgramAddressSync(
  [Buffer.from("scoreboard")], // seed
  programId,
);
