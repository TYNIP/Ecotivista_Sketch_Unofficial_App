import * as React from 'react';

interface EmailTemplateProps {
  forgetPwd: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  forgetPwd
}) => (
  <div>
    <h1>Welcome!</h1>
    <a href={forgetPwd}> Change Password </a>
  </div>
);
