export default (editor, opt = {}) => {
  const c = opt;
  const dc = editor.DomComponents;
  const defaultType = dc.getType("default");
  const textType = dc.getType("text");
  console.log(textType);
  const defaultModel = defaultType.model;
  const textTypeModel = textType.model;

  dc.addType("if-condition", {
    model: defaultModel.extend(
      {
        defaults: {
          ...defaultModel.prototype.defaults,
          "custom-name": "If Condition",
          draggable: true,
          droppable: true,
          copyable: true,
          removable: true,
          traits: ["condition"]
        }
      },
      {
        isComponent(el) {
          if (
            el.getAttribute &&
            el.getAttribute("data-gjs-type") === "if-condition"
          ) {
            return { type: "if-condition" };
          }
        }
      }
    ),
    view: defaultType.view
  });

  dc.addType("if-start-type", {
    model: textTypeModel.extend(
      {
        defaults: {
          ...textTypeModel.prototype.defaults,
          "custom-name": "If Start Type",
          draggable: false,
          droppable: false,
          copyable: false,
          removable: false
        }
      },
      {
        isComponent(el) {
          if (
            el.getAttribute &&
            el.getAttribute("data-gjs-type") === "if-start-type"
          ) {
            return { type: "if-start-type" };
          }
        }
      }
    ),
    view: textType.view
  });

  dc.addType("if-end-type", {
    model: defaultModel.extend(
      {
        defaults: {
          ...defaultModel.prototype.defaults,
          "custom-name": "If End Type",
          draggable: false,
          droppable: false,
          copyable: false,
          removable: false
        }
      },
      {
        isComponent(el) {
          if (
            el.getAttribute &&
            el.getAttribute("data-gjs-type") === "if-end-type"
          ) {
            return { type: "if-end-type" };
          }
        }
      }
    ),
    view: defaultType.view
  });
};
