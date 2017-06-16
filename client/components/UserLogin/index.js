import React from 'react';
import {
  Card,
  CardText,
  TextField,
} from 'material-ui';

const UserLogin = () => (
  <Card className="login">
    <CardText>
      <TextField floatingLabelText="Email" />
      <br />
      <TextField floatingLabelText="Password" type="password" />
    </CardText>
  </Card>
);

export default UserLogin;
