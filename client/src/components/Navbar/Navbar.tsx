import React from "react";
import "./Navbar.css";
import Link from "next/link";

function Navbar() {
  return (
    <nav>
      <h1>Registros de Operações</h1>
      <div className="links">
        <Link href="/">Home</Link>
        <Link href="/operations">Operações</Link>
      </div>
    </nav>
  );
}

export default Navbar;
