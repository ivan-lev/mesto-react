import React from 'react';

function Footer(props) {
  return (
    <footer className="footer">
      <p className="footer__info">
        &copy; <span className="footer__current-year">{props.children}</span> Mesto Russia
      </p>
    </footer>
  );
}

export default Footer;
