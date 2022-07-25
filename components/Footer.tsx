function Footer() {
  return (
    <footer className="font-sans text-center bg-gray-100 dark:bg-darker">
      <ul className="flex justify-around py-4 border-b-2">
        <li>
          <a href="https://github.com/jolshylar">Github</a>
        </li>
        <li>
          <a href="https://discord.com/invite/6dSpCGtJuB">Discord</a>
        </li>
        <li>
          <a href="https://instagram.com/jolshylar">Instagram</a>
        </li>
        <li>
          <a href="mailto:jolshylar@gmail.com">E-mail</a>
        </li>
      </ul>
      <div className="py-4">&copy; Jolshylar 2022. All rights reserved.</div>
    </footer>
  );
}

export default Footer;
