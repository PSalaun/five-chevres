import Link from "next/link";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/home">Accueil</Link>
        </li>
        <li>
          <Link href="/composition">Equipe</Link>
        </li>
        <li>
          <Link href="/players">Joueurs</Link>
        </li>
        <li>
          <Link href="ranking">Classement</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
