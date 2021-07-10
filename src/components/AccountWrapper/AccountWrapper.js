import React, { useState } from "react";
import { AccountContext } from "contexts/AccountContext";

export default function AccountContextWrapper(props) {
  const [account, setAccount] = useState(undefined);

  function changeAccount(act) {
    setAccount(act);
  }

  return (
    <AccountContext.Provider value={{ account: account, changeAccount: changeAccount }}>
      {props.children}
    </AccountContext.Provider>
  );
}
