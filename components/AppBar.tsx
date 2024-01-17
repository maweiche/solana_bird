import React from "react";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Image from "next/image";

export default function AppBar() {
  return (
        <nav>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1rem', height: '6rem', borderBottom: '1px solid #eaeaea', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100}}>
                <a href="/"
                    style={{ textDecoration: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image src="/solana_bird.png" width={100} height={100} alt="Solana Bird Logo" />
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#5e17eb' }}>Solana Bird</span>
                </a>
                <WalletMultiButton />
            </div>
        </nav>
    );
}

