import React from "react";


export const BasePageContext = React.createContext();
const BasePageProvider = props => {

  return (
    <BasePageContext.Provider value={{  }}>
      {props.children}
    </BasePageContext.Provider>
  );
}

export default BasePageProvider;
