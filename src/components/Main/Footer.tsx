function Footer() {
  return (
    <footer className="font-sans text-center bg-dark border-t-2">
      <ul className="flex justify-around py-4">
        <li>
          <a target="_blank" rel="noreferrer" href="https://github.com/dbdteam">
            Github
          </a>
        </li>
        <li>
          <a target="_blank" rel="noreferrer" href="mailto:ozgdastan@gmail.com">
            E-mail
          </a>
        </li>
      </ul>
      <div className="py-4">&copy; DBD Team 2022. All rights reserved.</div>
    </footer>
  );
}

export default Footer;
