# AUN Fiber Lanka

Static HTML/CSS/JavaScript company website.

## Local preview

Run `python -m http.server 8000` from this folder, then open http://localhost:8000.

## Contact form

The contact form uses Web3Forms and delivers enquiries to info@aunfiberlanka.com. Its public form access key is in contact.html; it is intended for browser use and is not a mailbox password. Manage the form at https://app.web3forms.com using that email address.

JavaScript shows confirmation only after the service accepts the submission, prevents duplicate clicks while sending, and preserves entered details on failure. The visitor email sets Reply-To. A hidden botcheck field provides basic spam protection. Without JavaScript, the form submits to the provider's confirmation page.

Changes here are local until deployed to the public website.
