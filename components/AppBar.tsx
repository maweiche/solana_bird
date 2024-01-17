import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const WalletMultiButton = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );

export default function AppBar() {
  return (
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem', height: '6rem', borderBottom: '1px solid #eaeaea', marginTop: '20px', width: '100vw'}}>
        <a href="/"
            style={{ textDecoration: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image src="/solana_bird.png" width={100} height={100} alt="Solana Bird Logo" />
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#5e17eb' }}>Solana Bird</span>
        </a>
        <WalletMultiButton />
      </nav>
    );
}

