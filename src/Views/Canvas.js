import PropTypes from "prop-types";
import React, { Component } from "react";

import "./Canvas.css";
import { initializeGrapeJs } from "../services/GrapeJs";

class Canvas extends Component {
  _containerRef = React.createRef();

  static propTypes = {
    initializeEditorFunc: PropTypes.func.isRequired
  };

  static defaultProps = {
    initializeEditorFunc: initializeGrapeJs
  };

  componentDidMount() {
    //initialize editor
    const { initializeEditorFunc } = this.props;

    initializeEditorFunc(this._containerRef);
  }

  render() {
    return (
      <div className="">
        <div className="editor-canvas">
          <div ref={this._containerRef} className="canvas" />
        </div>
      </div>
    );
  }
}

export default Canvas;
