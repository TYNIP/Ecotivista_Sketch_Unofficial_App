import * as React from 'react';

interface EmailTemplateProps {
  forgetPwd: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  forgetPwd
}) => (
  <div
  style={{
    padding: '20px',
    backgroundColor: 'white',
    display: 'grid',
    justifyItems: 'center',
  }}
  >
    <h1 style={{textAlign: 'center'}}>Click to the link to change your password</h1>
    <a href={forgetPwd} style={{margin: '10px auto'}}> Change Password </a>
  </div>
);
