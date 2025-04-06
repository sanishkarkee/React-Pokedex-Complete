/*
- Its just a popup overlay on the screen, just like bootstrap modal
Modal use garna paila ma index.html ma  id="root" ko tala
"<div id="portal"></div>" create garnu parxa

- Modal ma data show garna chai API  bta fetch garnu parxa so PokdeCard.jsx bhitra "fetchMoveData" bhanne function banaunu parxa

*/

/*
How this
  "return ReactDom.createPortal(
    <div className='modal-container'></div>,
    document.getElementById('portal')
  ); " works is:

  First find the <div> with ID of "portal" and inject
  "<div className='modal-container'></div>" inside it.
 */

import React from 'react';
import ReactDom from 'react-dom';

const Modal = (props) => {
  const { children, handleCloseModal } = props;

  return ReactDom.createPortal(
    <div className='modal-container'>
      {/* underUnderlay chai modal bahira ko empty space jaha chai click garda modal close hunxa */}
      <button onClick={handleCloseModal} className='modal-underlay' />
      <div className='modal-content'>{children}</div>
    </div>,
    document.getElementById('portal')
  );
};

export default Modal;
