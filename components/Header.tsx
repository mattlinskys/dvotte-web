import React from "react";
import Link from "next/link";

const Header: React.FC = () => (
  <header>
    Header
    <nav>
      <Link href="/contracts/new">Deploy new contract</Link>
    </nav>
  </header>
);

export default Header;
