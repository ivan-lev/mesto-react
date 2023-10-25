import React from 'react';

function CurrentYear() {
  const currentYear = new Date().getFullYear();
  return <span className="footer__current-year"> {currentYear}</span>;
}

export default CurrentYear;
