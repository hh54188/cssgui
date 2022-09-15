
import React from 'react';
import ClipboardJS from 'clipboard'
import 'highlight.js/styles/atom-one-dark.css'
import { Button, Dialog, Classes } from "@blueprintjs/core";
import { AppToaster } from '../utils/toaster'

export function StyleCodeDialog({
  codeMarkup,
  codeText,
  isOpen,
  onClose
}) {
  new ClipboardJS('.clipboard-btn');
  function showCopySuccessfullyMessage() {
    AppToaster.show({
      icon: 'tick',
      message: 'Copy Successfully',
      timeout: 1500,
      intent: 'success',
      isCloseButtonShown: false,
    })
  }
  return (
    <Dialog className='copy-code-style-dialog' isOpen={isOpen}>
      <div>
        <pre>
          <code className="hljs language-css" dangerouslySetInnerHTML={{
            __html: codeMarkup
          }}>
          </code>
        </pre>
      </div>
      <div className={`${Classes.DIALOG_FOOTER} copy-code-style-dialog-footer`}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button data-clipboard-text={codeText} className='clipboard-btn' icon="clipboard" intent='primary' onClick={showCopySuccessfullyMessage} >Copy</Button>
          <Button icon="cross" onClick={onClose} >Close</Button>
        </div>
      </div>
    </Dialog>
  )
}