import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.css";
import "../../styles/index.css";

import { store } from "../../states";

function Wrapper({ children, actions }) {
  actions.forEach((action) => {
    store.dispatch(action);
  });

  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
}

Wrapper.propTypes = {
  children: PropTypes.element.isRequired,
  actions: PropTypes.arrayOf(Object).isRequired,
};

export default Wrapper;
